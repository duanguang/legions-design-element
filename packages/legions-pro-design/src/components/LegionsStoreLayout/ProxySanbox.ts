/*
 * @Author: duanguang
 * @Date: 2020-12-31 15:04:38
 * @LastEditTime: 2021-03-02 18:43:38
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
  mount(): Promise<null>;
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
  routerSanboxOpenMode: 'inSideActiveTab' | 'newOpenactiveTab' =
    'inSideActiveTab';
  microSanboxApp = new Map<string, IMicroSanboxAppValue>();
  /** 记录各个页签最后一次访问路径 */
  microSanboxRoute = new Map<string, string>();
  //@ts-ignore
  history: History = null;
  constructor(history: History) {
    this.history = history;
  }
  registerMicroApps(mountPane: IPanes) {
    /*  if (this.routerSanboxOpenMode !== 'newOpenactiveTab') {
      return;
    } */
    if (this.microSanboxApp.has(mountPane.sandbox.appName)) {
      return;
    }
    const routerPath = this.getRouterPath(mountPane);

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
    const mount = () => {
      return app.mount().catch(err => {
        console.log('----------status----------', app.getStatus());
        console.error('----------mount error----------', err);
        return err;
      });
    };
    const unmount = () => {
      return app.unmount().catch(err => {
        console.log('----------status----------', app.getStatus());
        console.error('----------unmount error----------', err);
        return err;
      });
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
      mount,
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
  }
  mountSanboxMicroApp(mountPane: IPanes) {
    if (mountPane.loadingMode === 'sandbox') {
      const path =
        this.microSanboxRoute.get(mountPane.key) ||
        this.getRouterPath(mountPane);
      this.history.replace(path);
    }
  }
  unmountSanboxMicroApp(unmoutPane: IPanes, mountPane: IPanes) {
    if (unmoutPane.loadingMode === 'sandbox') {
      this.history.replace('/');
    }
  }
  switchTabPaneSanboxMicroApp(
    unmoutPane: IPanes,
    mountPane: IPanes,
    type?: SanboxTabActionMode
  ) {
    /** 新增页签时，初始化页面路径 */
    if (
      type === SanboxTabActionMode.add &&
      mountPane &&
      mountPane.loadingMode === 'sandbox'
    ) {
      this.microSanboxRoute.set(mountPane.key, this.getRouterPath(mountPane));
    }
    /** 切换页签时，记录页签的最后一次访问路径 */
    if (unmoutPane && unmoutPane.loadingMode === 'sandbox') {
      this.microSanboxRoute.set(
        unmoutPane.key,
        window.location.hash.replace('#', '')
      );
    }
    /** 只要是沙箱的页面，在离开时都执行卸载 */
    if (
      unmoutPane &&
      unmoutPane.loadingMode === 'sandbox' &&
      mountPane &&
      mountPane.loadingMode !== 'sandbox'
    ) {
      this.unmountSanboxMicroApp(unmoutPane, mountPane);
    }
    /** 只要是沙箱的页面，在进入时都执行装载 */
    if (mountPane && mountPane.loadingMode === 'sandbox') {
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
