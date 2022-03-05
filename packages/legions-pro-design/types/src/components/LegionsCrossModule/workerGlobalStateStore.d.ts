import LegionsStore from '../LegionsStore';
import { legionsStoreInterface } from '../LegionsStore/interface';
import { MicroAppStateActions } from 'qiankun';
import { subscribeLegionsProGlobal } from './globalStateEven';
import { legionsProLayoutInterface } from '../LegionsProLayout/interface';
import { legionsCrossModuleInterface } from './interface';
interface IContext {
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
    static meta: legionsStoreInterface['storeBaseMeta'];
    /** 创建微应用事件 */
    static createEventScopes(event_key: string): import("brain-store/types/api/resourceEvent").IResource;
    private proTableStore;
    private userInfo;
    private menuList;
    /** 监听全局数据，发生改变时触发,最基础监听函数 */
    protected onGlobalStateChange: (callback: (value: legionsProLayoutInterface['GlobalStates'] & IGlobalState, prev: legionsProLayoutInterface['GlobalStates'] & IGlobalState) => void, options: Parameters<MicroAppStateActions['onGlobalStateChange']>[1]) => void;
    /**订阅子应用iframe挂载在全局的变量 */
    protected subscribeLegionsProGlobal: typeof subscribeLegionsProGlobal;
    masterEventScopes: {
        userEvent: import("brain-store/types/api/resourceEvent").IResource;
    };
    /** 打开菜单页签方法 */
    openTabPane: legionsProLayoutInterface['GlobalStates']['methods']['openTabPane'];
    /** 移除菜单页签方法 */
    removeTablePane: legionsProLayoutInterface['GlobalStates']['methods']['removeTablePane'];
    /** 更新全局数据方法
     * 此函数在执行时，微应用全局监听事件都会接收到数据变化通知。 譬如listeningSanboxGlobalStateChange
     */
    setGlobalState: (state: legionsProLayoutInterface['GlobalStates'] & IGlobalState) => void;
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
            childrenId: string; /** 监听全局数据，发生改变时触发,最基础监听函数 */
        }) => void;
        receiveMessage: (receive: any) => void;
    };
    /** 微应用id */
    appId: string;
    constructor(context: IContext);
    get user(): InterfaceUer<User>;
    get menu_data(): import("../LegionsProLayout/model").MenuBaseModel[];
    /** 全局数据变化监听函数，主要用于沙箱微应用环境 */
    listeningSanboxGlobalStateChange(options: {
        props: {
            onGlobalStateChange: (callback: (value: any, prev: any, event: legionsCrossModuleInterface['GlobalStateEvent']) => void, options: Parameters<MicroAppStateActions['onGlobalStateChange']>[1]) => void;
            setGlobalState: (state: any, event: legionsCrossModuleInterface['GlobalStateEvent']) => void;
            name?: string;
        };
        /** 监听回调执行函数 */
        callback: (value: legionsProLayoutInterface['GlobalStates'] & IGlobalState, prev: legionsProLayoutInterface['GlobalStates'] & IGlobalState) => void;
    }): void;
    /** 监听广播数据(主要用于基座跟子应用不在同一个容器，比如iframe) */
    listeningIframeGlobalStateChange(options: {
        /** 监听事件队列数据 */
        eventScopes: legionsStoreInterface['resource'][];
        /** 监听回调执行函数 */
        callback: (value: legionsProLayoutInterface['GlobalStates'] & IGlobalState, prev: legionsProLayoutInterface['GlobalStates'] & IGlobalState) => void;
    }): void;
    private _syncUpdateGlobalState;
    /** 写入用户数据 */
    private _setUserInfo;
    /** 写入基座系统相关方法及对象变量 */
    private _setLayoutData;
}
export {};
