import { IPanes } from './interface';
import { History } from '../interface/history';
interface IMount {
    mount: () => void;
    unmount: () => void;
    loadPromise: Promise<null>;
    bootstrapPromise: Promise<null>;
    mountPromise: Promise<null>;
    unmountPromise: Promise<null>;
}
interface IMicroSanboxAppValue {
    getStatus: () => 'NOT_LOADED' | 'LOADING_SOURCE_CODE' | 'NOT_BOOTSTRAPPED' | 'BOOTSTRAPPING' | 'NOT_MOUNTED' | 'MOUNTING' | 'MOUNTED' | 'UPDATING' | 'UNMOUNTING' | 'UNLOADING' | 'SKIP_BECAUSE_BROKEN' | 'LOAD_ERROR';
    /** 沙箱应用名称 */
    appName: string;
    /** 资源入口 */
    entry: string;
    app: IMount;
    mount(): Promise<null>;
    unmount(): Promise<null>;
    /** 节点详细数据 */
    root: {
        /** 根节点ID */
        rootid: string;
        /** 渲染dom树包装节点 */
        wrapid: string;
    };
}
/** 沙箱页签活动类型 */
export declare enum SanboxTabActionMode {
    /** 新增 */
    add = 0,
    /** 删除 */
    delete = 1,
    /** 切换 */
    switch = 2
}
export declare class ProxySanbox {
    static SanboxTabActionMode: typeof SanboxTabActionMode;
    microSanboxApp: Map<string, IMicroSanboxAppValue>;
    /** 记录各个页签最后一次访问路径 */
    microSanboxRoute: Map<string, string>;
    history: History;
    isEnabledTabs: boolean;
    constructor(history: History);
    registerMicroApps(mountPane: IPanes): void;
    mountSanboxMicroApp(mountPane: IPanes): void;
    unmountSanboxMicroApp(unmoutPane: IPanes, mountPane: IPanes): void;
    switchTabPaneSanboxMicroApp(unmoutPane: IPanes, mountPane: IPanes, type?: SanboxTabActionMode): void;
    getRouterPath(pane: IPanes): string;
    createMicroAppId(pane: IPanes): string;
}
export {};
