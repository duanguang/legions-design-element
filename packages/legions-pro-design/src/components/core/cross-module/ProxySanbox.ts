/*
 * @Author: duanguang
 * @Date: 2020-12-31 15:04:38
 * @LastEditTime: 2021-01-04 11:22:14
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/core/cross-module/ProxySanbox.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { loadMicroApp } from 'legions-micro-service';
import { IPanes } from '../../interface/pro.store';
import { History } from '../../interface/history';
import { isPromise } from 'legions-utils-tool/type.validation';
import { shortHash } from 'legions-lunar/object-hash';
import {} from 'lodash/fp';
interface IMount {
  mount: () => void;
  unmount: () => void;
  loadPromise: Promise<null>;
  bootstrapPromise: Promise<null>;
  mountPromise: Promise<null>;
  unmountPromise: Promise<null>;
}
interface IMicroSanboxAppValue {
  getStatus: () =>
    | 'NOT_LOADED'
    | 'LOADING_SOURCE_CODE'
    | 'NOT_BOOTSTRAPPED'
    | 'BOOTSTRAPPING'
    | 'NOT_MOUNTED'
    | 'MOUNTING'
    | 'MOUNTED'
    | 'UPDATING'
    | 'UNMOUNTING'
    | 'UNLOADING'
    | 'SKIP_BECAUSE_BROKEN'
    | 'LOAD_ERROR';
  /** 沙箱应用名称 */
  appName: string;
  routers: Map<
    string,
    {
      /** 路由访问方式，在活动页签内部切换路由，即不新开页签; 打开一个新的活动页签并切换路由 */
      openMode: 'inSideActiveTab' | 'newOpenactiveTab';
      router: string;
    }
  >;
  /** 资源入口 */
  entry: string;
  app: IMount;
  loadMicroApp: () => IMount;
  unmount(): Promise<null>;
  container: Map<
    string,
    {
      /* status: 'mount' | 'unmount'; */
      /** 根节点ID */
      rootid: string;
      /** 渲染dom树包装节点 */
      wrapid: string;
      /** 非活动根节点Id */
      inactiveRootId?: string;

      inactiveWrapid?: string;

      lastActiveRouter: string;
      /** 页面根节点子dom元素 */
      rootChildNode?: NodeListOf<ChildNode>;
      routers?: string[];
    }
  >;
  activityRouter: string;
}
export class ProxySanbox {
  routerSanboxOpenMode: 'inSideActiveTab' | 'newOpenactiveTab' =
    'inSideActiveTab';
  microSanboxApp = new Map<string, IMicroSanboxAppValue>();
  history: History = null;
  constructor(history: History) {
    this.history = history;
  }
  openTabPaneSanbox(unmoutPane: IPanes, mountPane: IPanes) {
    const app = this.microSanboxApp.get(mountPane.sandbox.appName);
    if (app) {
      // 如果为空则非首次打开页签沙箱
      if (
        unmoutPane.loadingMode !== 'sandbox' &&
        mountPane.loadingMode === 'sandbox'
      ) {
        if (app.getStatus() === 'MOUNTED') {
          this.mountSanboxMicroApp(mountPane);
        }
      } else if (
        unmoutPane.loadingMode === 'sandbox' &&
        mountPane.loadingMode === 'sandbox'
      ) {
        // 判定是否在沙箱页签之间进行切换
        if (unmoutPane.sandbox.appName === mountPane.sandbox.appName) {
          // 如果是同一个应用不同页签之间切换
          this.unmountSanboxMicroApp(unmoutPane, mountPane); // 则先变更失去焦点页签rootid 值
          this.mountSanboxMicroApp(mountPane); // 然后把活动页签rootid挂载容器 值变更回来
          /** 上述代码主要是为了同一个应用不同页签，如果不把非活动页签容器ID变更为其他值，则会导致一个body 页面存在多份相同ID，在挂载dom元素会产生错误
           *  所以在失去焦点，暂时改变节点值，在获得焦点时，则把值变更回来，且继续把失去焦点的值改变其他值
           */
        } else {
          this.unmountSanboxMicroApp(unmoutPane, mountPane); // 则先变更失去焦点页签rootid 值
          this.mountSanboxMicroApp(mountPane); // 然后把活动页签rootid挂载容器 值变更回来
        }
      }
    } else {
      // 如果应用沙箱还未加载过，则直接跳转路由，在页签content 遍历时会自动注册应用服务
      this.mountSanboxMicroApp(mountPane);
    }
  }
  registerMicroApps(mountPane: IPanes) {
    if (this.routerSanboxOpenMode !== 'newOpenactiveTab') {
      return;
    }
    if (this.microSanboxApp.has(mountPane.sandbox.appName)) {
      return;
    }
    const routerPath = this.getRouterPath(mountPane);

    const mount = () => {
      let app = loadMicroApp(
        {
          name: mountPane.sandbox.appName,
          entry: mountPane.sandbox.appEntiy,
          container: `#${mountPane.sandbox.appName}`,
        },
        {
          sandbox: {
            experimentalStyleIsolation:
              mountPane.sandbox.experimentalStyleIsolation,
          },
          isMerge: mountPane.sandbox.isMerge,
        }
      );
      return app;
    };
    console.log(mountPane.sandbox);
    let app = mount();
    const unmount = () => {
      return app.unmount();
    };
    this.routerSanboxOpenMode = 'inSideActiveTab';
    const appid = this.createMicroAppId(mountPane);
    this.microSanboxApp.set(mountPane.sandbox.appName, {
      getStatus: app.getStatus,
      appName: mountPane.sandbox.appName,
      routers: new Map().set(routerPath, {
        openMode: this.routerSanboxOpenMode,
        router: routerPath,
      }),
      entry: mountPane.sandbox.appEntiy,
      app,
      loadMicroApp: mount,
      unmount,
      container: new Map().set(`${appid}`, {
        /* status: 'mount', */
        rootid: mountPane.sandbox.appName,
        wrapid: mountPane.sandbox.appRootId,
        inactiveRootId: '',
        inactiveWrapid: '',
        lastActiveRouter: routerPath,
        routers: [routerPath],
      }),
      activityRouter: routerPath,
    });
    if (app['mountPromise']) {
      app['mountPromise']['then'](() => {});
    }
  }
  mountSanboxMicroApp(pane: IPanes) {
    if (pane.loadingMode === 'sandbox') {
      const appid = this.createMicroAppId(pane);
      const name = `${pane.sandbox.appName}-${appid}`;
      const app = this.microSanboxApp.get(pane.sandbox.appName);
      if (app) {
        const onload = () => {
          let target = document.querySelector(`div[data-service=${name}]`);
          const container = app.container.get(appid);
          if (
            container &&
            container.lastActiveRouter &&
            container.routers &&
            container.routers.findIndex(
              item => item === container.lastActiveRouter
            ) > -1
          ) {
            this.history.push(container.lastActiveRouter);
          } else {
            this.history.push(this.getRouterPath(pane));
          }
        };
        onload();
      } else {
        // 如果应用沙箱还未加载过，则直接跳转路由，在页签content 遍历时会自动注册应用服务
        this.history.push(this.getRouterPath(pane));
      }
    }
  }
  unmountSanboxMicroApp(unmoutPane: IPanes, mountPane: IPanes) {
    const appid = this.createMicroAppId(unmoutPane);
    /* const unmountName = `${unmoutPane.sandbox.appName}-${this.getRouterPath(
      unmoutPane
    ).replace('/', '').replace('/','-')}`; */
    const unmountName = `${unmoutPane.sandbox.appName}-${appid}`;
    const app = this.microSanboxApp.get(unmoutPane.sandbox.appName);
    if (app) {
      let target = document.querySelector(`div[data-service=${unmountName}]`);
      const removeTarget = () => {
        if (target) {
          const nodes = target.childNodes;
          for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            target.removeChild(node);
          }
        }
      };
      removeTarget();
    }
  }
  switchTabPaneSanboxMicroApp(unmoutPane: IPanes, mountPane: IPanes) {
    const app = this.microSanboxApp.get(mountPane.sandbox.appName);
    if (
      unmoutPane.loadingMode !== 'sandbox' &&
      mountPane.loadingMode === 'sandbox'
    ) {
      // 如果即将离开的页签是非沙箱容器页签且将进入页签是沙箱页签
      if (app) {
        this.mountSanboxMicroApp(mountPane);
      } else {
        this.mountSanboxMicroApp(mountPane);
      }
    } else if (
      unmoutPane.loadingMode === 'sandbox' &&
      mountPane.loadingMode !== 'sandbox'
    ) {
      // 如果页签切换由沙箱容器页签切换到非沙箱容器页签
      const unmountapp = this.microSanboxApp.get(unmoutPane.sandbox.appName);
      if (unmountapp) {
        this.unmountSanboxMicroApp(unmoutPane, mountPane);
      }
    } else if (
      unmoutPane.loadingMode === 'sandbox' &&
      mountPane.loadingMode === 'sandbox'
    ) {
      // 两个沙箱页签互切
      this.unmountSanboxMicroApp(unmoutPane, mountPane);
      this.mountSanboxMicroApp(mountPane);
    }
  }
  getRouterPath(pane: IPanes) {
    const path = pane.path || '';
    const routerPaths = path.split('#');
    let routerPath = '';
    if (routerPaths.length > 1) {
      routerPath = routerPaths[1];
    }
    return routerPath;
  }
  createMicroAppId(pane: IPanes) {
    let routerPath = this.getRouterPath(pane);
    return shortHash(routerPath);
  }
}
