import LegionsStore from '../LegionsStore';
import { IStoreBaseMeta } from '../LegionsStore/interface';
import { MicroAppStateActions } from 'legions-micro-service/types/interfaces';
import { IGlobalStates, IResource } from '../interface';
import { subscribeLegionsProGlobal } from './globalStateEven';
interface IContext {
}
interface IIGlobalStateEvent {
    name: string;
    scope: string;
}
interface InterfaceUer<U> {
    userName: string;
    userUid: string;
    companyName?: string;
    companyUid?: string;
    /** 接口返回的原始用户信息 */
    rowData?: U;
}
/** 子应用全局数据基类 */
export default class WorkerGlobalStateStore<IGlobalState, User = {}> extends LegionsStore.StoreBase<IContext> {
    static meta: IStoreBaseMeta;
    /** 创建微应用事件 */
    static createEventScopes(event_key: string): import("brain-store/types/api/resourceEvent").IResource;
    private proTableStore;
    private userInfo;
    private menuList;
    /** 监听全局数据，发生改变时触发,最基础监听函数 */
    protected onGlobalStateChange: (callback: (value: IGlobalStates & IGlobalState, prev: IGlobalStates & IGlobalState, event: IIGlobalStateEvent) => void, options: Parameters<MicroAppStateActions['onGlobalStateChange']>[1]) => void;
    /**订阅子应用iframe挂载在全局的变量 */
    protected subscribeLegionsProGlobal: typeof subscribeLegionsProGlobal;
    masterEventScopes: {
        userEvent: import("brain-store/types/api/resourceEvent").IResource;
    };
    /** 打开菜单页签方法 */
    openTabPane: IGlobalStates['methods']['openTabPane'];
    /** 移除菜单页签方法 */
    removeTablePane: IGlobalStates['methods']['removeTablePane'];
    /** 更新全局数据方法
     * 此函数在执行时，微应用全局监听事件都会接收到数据变化通知。 譬如listeningSanboxGlobalStateChange
     */
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
    /** 微应用id */
    appId: string;
    constructor(context: IContext);
    get user(): InterfaceUer<User>;
    get menu_data(): import("../LegionsModels/pro.menu.model").MenuEntity[];
    /** 全局数据变化监听函数，主要用于沙箱微应用环境 */
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
    listeningIframeGlobalStateChange(options: {
        /** 监听事件队列数据 */
        eventScopes: IResource[];
        /** 监听回调执行函数 */
        callback: (value: IGlobalStates & IGlobalState, prev: IGlobalStates & IGlobalState, event: IIGlobalStateEvent) => void;
    }): void;
    private _syncUpdateGlobalState;
    /** 写入用户数据 */
    private _setUserInfo;
    /** 写入基座系统相关方法及对象变量 */
    private _setLayoutData;
}
export {};
