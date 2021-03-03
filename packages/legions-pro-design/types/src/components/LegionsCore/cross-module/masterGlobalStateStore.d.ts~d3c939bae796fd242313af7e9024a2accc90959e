import { IGlobalStates, IResource, typeOpenPaneParames } from '../../interface';
import LegionsStore from '../../LegionsStore';
import { IStoreBaseMeta } from '../../LegionsStore/interface';
import LegionsModels from '../../LegionsModels';
interface IContext {
}
interface IIGlobalStateEvent {
    name: string;
    scope: string;
}
/** 主应用全局数据基类
 * 只在主应用调用
 */
export declare class MasterGlobalStateStore extends LegionsStore.StoreBase<IContext> {
    static meta: IStoreBaseMeta;
    private onGlobalStateChange;
    setGlobalState: (state: IGlobalStates, event: IIGlobalStateEvent) => void;
    openTabPane: (pane: typeOpenPaneParames) => void;
    removeTablePane: (targetKey: string | string[]) => void;
    menuList: InstanceType<typeof LegionsModels.MenuEntity>[];
    /** 订阅子应用iframe挂载在全局的变量 */
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
    masterEventScopes: {
        userEvent: import("brain-store").IResource;
    };
    constructor(context: IContext);
    listeningGlobalStateChange(options: {
        /** 监听事件队列数据 */
        eventScopes: IResource[];
        /** 监听回调执行函数 */
        callback: (value: IGlobalStates, prev: IGlobalStates, event: IIGlobalStateEvent) => void;
    }): void;
    setUserGlobalState(state: any): void;
}
export {};
