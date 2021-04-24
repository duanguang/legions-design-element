import LegionsStore from '../LegionsStore';
import { IStoreBaseMeta } from '../LegionsStore/interface';
import { MicroAppStateActions } from 'legions-micro-service/types/interfaces';
import { IGlobalStates, IResource, IUserInfo } from '../interface';
import LegionsModels from '../LegionsModels';
interface IContext {
}
interface IIGlobalStateEvent {
    name: string;
    scope: string;
}
/** 子应用全局数据基类 */
export default class WorkerGlobalStateStore<IGlobalState, User = {}> extends LegionsStore.StoreBase<IContext> {
    static meta: IStoreBaseMeta;
    private proTableStore;
    private onGlobalStateChange;
    private subscribeLegionsProGlobal;
    userInfo: IUserInfo<User>;
    menuList: InstanceType<typeof LegionsModels['MenuEntity']>[];
    masterEventScopes: {
        userEvent: import("brain-store").IResource;
    };
    /** 打开菜单页签方法 */
    openTabPane: IGlobalStates['methods']['openTabPane'];
    /** 移除菜单页签方法 */
    removeTablePane: IGlobalStates['methods']['removeTablePane'];
    setGlobalState: (state: IGlobalStates & IGlobalState, event: IIGlobalStateEvent) => void;
    /** postmessage 通信 */
    iframePostMessage: {
        sendMessageToParentWin: (options: {
            data: {
                cmd: string;
                value: any;
            };
            origin?: any;
        }) => void;
        sendMessageToChildrenWin: (options: {
            data: {
                cmd: string;
                value: any;
            };
            origin?: any;
            childrenId: string;
        }) => void;
        receiveMessage: (receive: any) => void; /** 移除菜单页签方法 */
    };
    /** 订阅子应用iframe挂载在全局的变量 */
    appId: string;
    constructor(context: IContext);
    listeningSanboxGlobalStateChange(options: {
        props: {
            onGlobalStateChange: (callback: (value: any, prev: any, event: IIGlobalStateEvent) => void, options: Parameters<MicroAppStateActions['onGlobalStateChange']>[1]) => void;
            setGlobalState: (state: any, event: IIGlobalStateEvent) => void;
            name?: string;
        };
        /** 监听事件队列数据 */
        eventScopes: IResource[];
        /** 监听回调执行函数 */
        callback: (value: IGlobalStates & IGlobalState, prev: IGlobalStates & IGlobalState, event: IIGlobalStateEvent) => void;
    }): void;
    /** 监听广播数据(主要用于基座跟子应用不在同一个容器，比如iframe) */
    listeningGlobalStateChange(options: {
        /** 监听事件队列数据 */
        eventScopes: IResource[];
        /** 监听回调执行函数 */
        callback: (value: IGlobalStates & IGlobalState, prev: IGlobalStates & IGlobalState, event: IIGlobalStateEvent) => void;
    }): void;
    private syncUpdateGlobalState;
    /** 写入用户数据 */
    private setUserInfo;
    /** 写入基座系统相关方法及对象变量 */
    private setLayoutData;
}
export {};
