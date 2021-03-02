import { StoreBase } from '../../store';
import { IStoreBaseMeta } from '../../store/interface';
import { MicroAppStateActions } from 'legions-micro-service/types/interfaces';
import { IGlobalStates, IResource, IUserInfo } from '../../interface';
import { MenuEntity } from '../../models/pro.menu.model';
interface IContext {
}
interface IIGlobalStateEvent {
    name: string;
    scope: string;
}
/** 子应用全局数据基类 */
export default class WorkerGlobalStateStore<IGlobalState, User = {}> extends StoreBase<IContext> {
    static meta: IStoreBaseMeta;
    private proTableStore;
    private onGlobalStateChange;
    private subscribeLegionsProGlobal;
    userInfo: IUserInfo<User>;
    menuList: MenuEntity[];
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
        receiveMessage: (receive: any) => void;
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
