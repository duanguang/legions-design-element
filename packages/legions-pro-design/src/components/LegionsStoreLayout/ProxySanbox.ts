/*
 * @Author: duanguang
 * @Date: 2020-12-31 15:04:38
 * @LastEditTime: 2022-02-21 11:42:58
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreLayout/ProxySanbox.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { loadMicroApp } from 'legions-micro-service';
import { IPanes } from './interface';
import { History } from '../interface/history';
import { shortHash } from 'legions-lunar/object-hash';
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
  /** 资源入口 */
  entry: string;
  app: IMount;
  mount(): Promise<null>;
  unmount(): Promise<null>;
}
/** 沙箱页签活动类型 */
export enum SanboxTabActionMode {
  /** 新增 */
  add,
  /** 删除 */
  delete,
  /** 切换 */
  switch,
}
export class ProxySanbox {
  static SanboxTabActionMode = SanboxTabActionMode;
  microSanboxApp = new Map<string,IMicroSanboxAppValue>();
  /** 记录各个页签最后一次访问路径 */
  microSanboxRoute = new Map<string,string>();
  //@ts-ignore
  history: History = null;
  isEnabledTabs = false;
  constructor(history: History) {
    this.history = history;
  }
  registerMicroApps(mountPane: IPanes) {
    if (this.microSanboxApp.has(mountPane.sandbox.appName)) {
      return;
    }
    let app = loadMicroApp(
      {
        name: mountPane.sandbox.appName,
        entry: mountPane.sandbox.appEntiy,
        container: `#${mountPane.sandbox.appName}`,
        props:{history:this.history,...mountPane.sandbox.props||{}}
      },
      {
        sandbox: {
          experimentalStyleIsolation:
            mountPane.sandbox.experimentalStyleIsolation,
        },
        isMerge: mountPane.sandbox.isMerge,
      }
    );
    const mount = () => {
      return app.mount().catch(err => {
        console.log('----------status----------',app.getStatus());
        console.error('----------mount error----------',err);
        return err;
      });
    };
    const unmount = () => {
      return app.unmount().catch(err => {
        console.log('----------status----------',app.getStatus());
        console.error('----------unmount error----------',err);
        return err;
      });
    };
    this.microSanboxApp.set(mountPane.sandbox.appName,{
      getStatus: app.getStatus,
      appName: mountPane.sandbox.appName,
      entry: mountPane.sandbox.appEntiy,
      app,
      mount,
      unmount,
    });
  }
  mountSanboxMicroApp(mountPane: IPanes) {
    if (mountPane.loadingMode === 'sandbox') {
      const path =
        this.microSanboxRoute.get(mountPane.key) ||
        this.getRouterPath(mountPane);
      if (this.isEnabledTabs) {
        this.history.replace(path); // 如果启动了页签模式，则切换路由使用替换模式，防止回退导致路由错乱
      }
      else {
        this.history.push(path);
      }
    }
  }
  unmountSanboxMicroApp(unmoutPane: IPanes,mountPane: IPanes) {
    if (unmoutPane.loadingMode === 'sandbox') {
      if (this.isEnabledTabs) {
        this.history.replace('/');
      } else {
        this.history.push('/');
      }
    }
  }
  switchTabPaneSanboxMicroApp(
    unmoutPane: IPanes,
    mountPane: IPanes,
    type?: SanboxTabActionMode
  ) {
    const sanboxRenderList = document.querySelectorAll(`div[data-mode=sanbox-tabs-render]`)
    /** 新增页签时，初始化页面路径 */
    if (
      type === SanboxTabActionMode.add &&
      mountPane &&
      mountPane.loadingMode === 'sandbox'
    ) {
      this.microSanboxRoute.set(mountPane.key,this.getRouterPath(mountPane));
    }
    /** 切换页签时，记录页签的最后一次访问路径 */
    if (unmoutPane && unmoutPane.loadingMode === 'sandbox') {
      let path = window.location.pathname.replace('#','')
      if (unmoutPane.router === 'hash') {
        path = window.location.hash.replace('#','')
      }
      this.microSanboxRoute.set(
        unmoutPane.key,
        path
      );
      sanboxRenderList.forEach((item) => {
        if (unmoutPane.sandbox.appName === item.id) {
          item['style']['display'] = 'none'
        }
      })
      /** 沙箱页面离开时，并且下一个进入的页面是iframe，卸载沙箱页面回到根路径  */
      if (mountPane &&
        mountPane.loadingMode === 'iframe') {
        this.unmountSanboxMicroApp(unmoutPane,mountPane);
      }
    }
    /** 只要是沙箱的页面，在进入时都执行装载 */
    if (mountPane && mountPane.loadingMode === 'sandbox') {
      this.mountSanboxMicroApp(mountPane);
      sanboxRenderList.forEach((item) => {
        if (mountPane.sandbox.appName === item.id) {
          item['style']['display'] = 'block'
        }
      })
    }
  }
  getRouterPath(pane: IPanes) {
    const path = pane.path || '';
    if (pane.router === 'hash') {
      const routerPaths = path.split('#');
      let routerPath = '';
      if (routerPaths.length > 1) {
        routerPath = routerPaths[1];
      }
      return routerPath;
    }
    return path
  }
  createMicroAppId(pane: IPanes) {
    let routerPath = this.getRouterPath(pane);
    return shortHash(routerPath);
  }
}
