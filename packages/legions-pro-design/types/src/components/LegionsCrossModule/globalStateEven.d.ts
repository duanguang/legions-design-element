import { MicroAppStateActions } from 'legions-micro-service/types/interfaces';
import { legionsCrossModuleInterface } from './interface';
declare function sendMessageToParentWin(options: {
    data: {
        /** 数据操作口令，用于区分 */
        cmd: string;
        value: any;
    };
    origin?: any;
}): void;
declare function sendMessageToChildrenWin(options: {
    data: {
        /** 数据操作口令，用于区分 */
        cmd: string;
        value: any;
    };
    origin?: any;
    /** 子窗口id */
    childrenId: string;
}): void;
declare const IframePostMessage: {
    sendMessageToParentWin: typeof sendMessageToParentWin;
    sendMessageToChildrenWin: typeof sendMessageToChildrenWin;
    receiveMessage: (receive: any) => void;
};
/** 订阅子应用iframe挂载在全局的变量 */
declare function subscribeLegionsProGlobal(callback: (value: {
    onGlobalStateChange: (callback: (value: any, prev: any, event: legionsCrossModuleInterface['GlobalStateEvent']) => void, options: Parameters<MicroAppStateActions['onGlobalStateChange']>[1]) => void;
    setGlobalState: (state: any, event: legionsCrossModuleInterface['GlobalStateEvent']) => void;
    appId: string;
}) => void): void;
export declare const masterEventScopes: {
    userEvent: import("brain-store/types/api/resourceEvent").IResource;
};
export { IframePostMessage, subscribeLegionsProGlobal };
