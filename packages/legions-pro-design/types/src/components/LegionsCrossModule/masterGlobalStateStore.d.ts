import LegionsStore from '../LegionsStore';
import { legionsStoreInterface } from '../LegionsStore/interface';
import { legionsProLayoutInterface } from '../LegionsProLayout/interface';
interface IContext {
}
/** 主应用全局数据基类
 * 只在主应用调用
 */
export declare class MasterGlobalStateStore extends LegionsStore.StoreBase<IContext> {
    static meta: legionsStoreInterface['storeBaseMeta'];
    /** 创建主应用事件 */
    static createEventScopes(event_key: string): import("brain-store/types/api/resourceEvent").IResource;
    private onGlobalStateChange;
    setGlobalState: <state = {}>(state: legionsProLayoutInterface['GlobalStates'] & state) => void;
    openTabPane: (pane: legionsProLayoutInterface['openPaneParames']) => void;
    removeTablePane: (targetKey: string | string[]) => void;
    menuList: legionsProLayoutInterface['menuList'];
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
        userEvent: import("brain-store/types/api/resourceEvent").IResource;
    };
    constructor(context: IContext);
    listeningGlobalStateChange(options: {
        /** 监听回调执行函数 */
        callback: (value: legionsProLayoutInterface['GlobalStates'], prev: legionsProLayoutInterface['GlobalStates']) => void;
    }): void;
    setUserGlobalState(state: any): void;
}
export {};
