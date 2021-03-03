import { RegExChk,validatorType } from 'legions-utils-tool/regex';
import { IPanes } from '../../LegionsStoreLayout/interface';
import ContentPart from '.';
import LegionsProIframe from "../../LegionsProIframe";
import React from 'react';
import { NProgress } from "legions-nprogress";
import pathToRegexp from 'path-to-regexp'
import LegionsStoreLayout from '../../LegionsStoreLayout';
import cloneDeep from 'lodash/cloneDeep';
import { getMicroAppStateActions } from 'legions-micro-service'
import LegionsCore from '../../LegionsCore';
import { inject } from 'legions/store';

export class LayoutContentUtils {
  @inject(LegionsCore.MasterGlobalStateStore)
  static masterGlobalStateStore: InstanceType<typeof LegionsCore.MasterGlobalStateStore>
  /** 将对象转换为字符串拼接至url */
  static transHttpUrlByObj(url: string,object: object) {
    let arr = url.split('?');
    const paramsString = Object.keys(object).map(key => {
      return `${key}=${object[key]}`
    }).join('&')
    if (arr.length > 1) {
      let _query = `${arr[1]}&${paramsString}`;
      if (arr.length > 2) {
        let query = `?${arr[2]}&${paramsString}`;
        return `${arr[0]}?${arr[1]}${query}`;
      }
      return `${arr[0]}?${_query}`;
    } else {
      let src = paramsString ? `${url}?${paramsString}` : url
      return src;
    }
  }
  /** 在传入的url 信息加生成的时间戳，主要用于清除iframe 加载页面缓存，无法拉取到更新后的JS，CSS资源 */

  static transHttpUrl(url: string,timeid: Number) {
    let arr = url.split('?');
    let version = timeid ? `&version=${timeid}` : '';
    if (arr.length > 1) {
      let _query = `${arr[1]}${version}`;
      if (arr.length > 2) {
        let query = `?${arr[2]}${version}`;
        return `${arr[0]}?${arr[1]}${query}`;
      }
      return `${arr[0]}?${_query}`;
    } else {
      let version = timeid ? `?version=${timeid}` : '';
      let _query = `${url}${version}`;
      return _query;
    }
  }
  /** 获取菜单页签path  */

  static getTabPanePath(pane: IPanes,that: ContentPart) {
    let src = '';
    // @ts-ignore
    if (RegExChk(validatorType.url,pane.path)) {
      /** * 判定字符串是否URL*/
      src = pane.path;
    }
    // @ts-ignore
    else if (RegExChk(validatorType.path,pane.path)) {
      /** 判定字符串是否文件路径 */
      if (pane.path.indexOf('#') > -1) {
        // 如果路由是前端路由且能从路由列表找到相应组件信息则渲染前端组件
        const newItem = that.props.router.findIndex(
          item => item.path === pane.path.replace('#','')
        );
        if (newItem > -1) {
          src = pane.path;
        } else {
          src = `${that.props.domainUrl}${pane.path}`;
        }
      } else {
        src = `${that.props.domainUrl}${pane.path}`;
      }
    } else {
      /** 找不到路径或路径不对直接跳转到404  */
      src = `${that.props.notFoundUrl}`;
    }
    return src;
  }

  static renderTabPaneContent(pane: IPanes,that: ContentPart) {
    const menuList = that.props.menuStore.getAllMenuList()
    const currMenu = menuList.find(item => item.key === pane.key)
    const tempPane = { ...currMenu,...cloneDeep(pane) }
    let newPane = tempPane.beforeLoad && tempPane.beforeLoad(tempPane) || tempPane
    let src = LayoutContentUtils.getTabPanePath(newPane,that);
    src = newPane.params ? LayoutContentUtils.transHttpUrlByObj(src,newPane.params) : src
    /* const proxySanbox = that.props.store.proxySanbox; */
    //@ts-ignore'
    if (RegExChk(validatorType.url,src)) {
      if (newPane.loadingMode === 'iframe') {
        return LayoutContentUtils.renderTabPaneIframe(newPane,that,src)
      }
      else if (newPane.loadingMode === 'sandbox') {
        LayoutContentUtils.masterGlobalStateStore.setGlobalState({
          user: that.props.userEntity,
          methods: {
            openTabPane: LayoutContentUtils.masterGlobalStateStore.openTabPane,
            removeTablePane: LayoutContentUtils.masterGlobalStateStore.removeTablePane,
          },
          menuList: LayoutContentUtils.masterGlobalStateStore.menuList,
        },LayoutContentUtils.masterGlobalStateStore.masterEventScopes.userEvent.created)
        return LayoutContentUtils.renderProxySanboxDom(newPane,that,src,that.props.store.proxySanbox);
      }
    }
    else {
      return LayoutContentUtils.renderTabPaneRouterComponent(newPane,that,src)
    }
  }
  //@ts-ignore
  static renderTabPaneIframe(pane: IPanes,that: ContentPart,src: string) {
    /* let url =!this.props.isEnabledTabs?this.transHttpUrl(src, this.props.store.urlRangTimestamp):src; */
    const tabPanesTimestamp = that.props.store.viewUIModel.tabPanesTimestamp.get(pane.key) || new Date().getTime()
    that.props.store.viewUIModel.updateTimestamp(pane.key.toString(),tabPanesTimestamp)
    if (pane.loadingMode === 'iframe') {
      let url = LayoutContentUtils.transHttpUrl(src,tabPanesTimestamp)
      
      return (
        <LegionsProIframe
          url={url}
          ref={`iframeContainer${pane.key}`}
          height="100%"
          display="initial"
          position="relative"
          styles={{ border: "none",minHeight: `${that.viewModel.iframeHeight}` }}
          id="ReactIframe"
          name={pane.key}
          allowFullScreen
          onFirstLoaded={() => {
            const value = { pane,iframe: document.querySelector(`iframe[name="${pane.key}"]`) as HTMLIFrameElement }
            const dispath = (LegionsProGlobal?) => {
              if (!LegionsProGlobal) {
                const {
                  onGlobalStateChange,
                  setGlobalState,
                  offGlobalStateChange,
                }: Record<string,Function> = getMicroAppStateActions(pane.key);
                value.iframe.contentWindow.LegionsProGlobal = {
                  //@ts-ignore
                  onGlobalStateChange,
                  //@ts-ignore
                  setGlobalState,
                  appId: pane.key
                }
                LayoutContentUtils.masterGlobalStateStore.setGlobalState({
                  user: that.props.userEntity,
                  methods: {
                    openTabPane: LayoutContentUtils.masterGlobalStateStore.openTabPane,
                    removeTablePane: LayoutContentUtils.masterGlobalStateStore.removeTablePane,
                  },
                  menuList: LayoutContentUtils.masterGlobalStateStore.menuList,
                },LayoutContentUtils.masterGlobalStateStore.masterEventScopes.userEvent.created)
              }
            }
            let count = 0;
            const timeid = setInterval(() => {
              count++;
              if (count > 1000) {
                count = 0;
                console.warn('LegionsProGlobal注入失败');
                clearInterval(timeid)
              }
              try {
                const cWindow = value.iframe.contentWindow
                if (cWindow.document.body.innerHTML) {
                  dispath()
                  clearInterval(timeid)
                } else {
                  if (cWindow.document.body.innerHTML) {
                    count = 0;
                    dispath()
                    clearInterval(timeid)
                  }
                }
              } catch (e) { }
            },10);
          }}
          onLoad={() => {
            NProgress.done();
            pane.afterLoad && pane.afterLoad({ pane,iframe: document.querySelector(`iframe[name="${pane.key}"]`) })
          }}

        />
      );
    }

  }
  //@ts-ignore
  static renderTabPaneRouterComponent(pane: IPanes,that: ContentPart,src: string) {
    NProgress.done();
    const curPane = that.props.store.panes.find((i) => i.key === that.props.store.activeKey)
     /** 只渲染当前活跃的页签，其他页面不渲染，避免路由跳转时触发多份实例导致显示异常 */
     if (that.props.router.length && curPane.path === pane.path) {
      /** 路径统一取location.hash进行匹配 */
      const path = window.location.hash.replace('#','').split('?')[0]
      let item = that.props.router.find((e) => pathToRegexp(e.path).test(path))
      if (item && typeof item.component === 'function') {
        return React.createElement(item.component);
      }
    }
  }

  static renderProxySanboxDom(pane: IPanes,that: ContentPart,src: string,proxySanbox: InstanceType<typeof LegionsStoreLayout.ProxySanbox> ) {
    if (pane.loadingMode === 'sandbox') {
      return null;
    }
  }
  static loadMicroApp(pane: IPanes,that: ContentPart,proxySanbox: InstanceType<typeof LegionsStoreLayout.ProxySanbox>) {
    if (pane && pane.loadingMode === 'sandbox') {
      let routerPath = proxySanbox.getRouterPath(pane);
      const appid = proxySanbox.createMicroAppId(pane)
      const keys = `${pane.sandbox.appName}-${appid}`
      let target = document.querySelector(`div[data-id=${keys}-legions]`);
      if (!that.props.isEnabledTabs) {
        target = document.querySelector(`#micro-app-legions`);
      }

      if (!proxySanbox.microSanboxApp.has(pane.sandbox.appName)) {
        if (target) {
          let dataApp = target.getAttribute('data-app')
          if (!that.props.isEnabledTabs) {
            dataApp = pane.sandbox.appName;
          }
          const oldcontainer = document.querySelector(`#${dataApp}`)
          if (oldcontainer) {
            oldcontainer.remove();
          }
          const container = document.createElement('div');
          container.setAttribute('id',`${dataApp}`);
          target.appendChild(container)
          if (proxySanbox.routerSanboxOpenMode === 'inSideActiveTab') {
            proxySanbox.routerSanboxOpenMode = 'newOpenactiveTab';
          }
          proxySanbox.registerMicroApps(pane);
        }
      } else {
        if (target) {
          let dataApp = target.getAttribute('data-app')
          if (!that.props.isEnabledTabs) {
            dataApp = pane.sandbox.appName;
          }
          const microSanboxApp = proxySanbox.microSanboxApp.get(dataApp)
          if (microSanboxApp.getStatus() !== 'MOUNTING') {
            const oldcontainer = document.querySelector(`#${dataApp}`)
            if (oldcontainer) {
              oldcontainer.remove();
            }
            const container = document.createElement('div');
            container.setAttribute('id',`${dataApp}`);
            target.appendChild(container)
            microSanboxApp.mount()
            microSanboxApp.app.mountPromise.then(() => {
              if (proxySanbox.routerSanboxOpenMode === 'newOpenactiveTab') {
                proxySanbox.routerSanboxOpenMode = 'inSideActiveTab';
              }
            })
            const hash = window.location.hash.replace('#','')
            const containerId = appid
            if (hash !== routerPath && hash && microSanboxApp.container.has(containerId)) {
              microSanboxApp.container.get(containerId).lastActiveRouter = hash;
              if (Array.isArray(microSanboxApp.container.get(containerId)['routers'])) {
                const _index = microSanboxApp.container.get(containerId)['routers'].findIndex((item) => item === hash)
                if (_index < 0) {
                  microSanboxApp.container.get(containerId)['routers'].push(hash)
                }
              }
            }
            if (!microSanboxApp.container.has(containerId)) {
              microSanboxApp.container.set(containerId,{
                rootid: pane.sandbox.appName,
                wrapid: pane.sandbox.appRootId,
                lastActiveRouter: routerPath,
                routers: [routerPath]
              })
            }
            microSanboxApp.activityRouter = routerPath;
          }
        }
      }
    }
  }
  /** 沙箱单实例加载方式 */
  static loadMicroApp2(pane: IPanes,that: ContentPart,proxySanbox: InstanceType<typeof LegionsStoreLayout.ProxySanbox>) {
    /** 空判跳过 */
    if (!pane) {
      return
    }
    /** 非沙箱跳过 */
    if (pane && pane.loadingMode !== 'sandbox') {
      return
    }
    /** tab容器直接作为沙箱实例的容器 */
    const sandboxWrap = document.querySelector('.legions-pro-layout .ant-tabs-content');
    /** 容器空判 */
    if (!sandboxWrap) {
      return
    }
    /** 判断实例是否已注册 */
    if (!proxySanbox.microSanboxApp.has(pane.sandbox.appName)) {
      let dataApp = pane.sandbox.appName
      const container = document.createElement('div');
      container.setAttribute('id',`${dataApp}`);
      sandboxWrap.appendChild(container)
      proxySanbox.registerMicroApps(pane);
    }
  }
}
