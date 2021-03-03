import { LegionsFetch } from './legionsFetch';
import * as StorageKeysDataSet from './constant.storageKeys';
import { MasterGlobalStateStore, WorkerGlobalStateStore, subscribeLegionsProGlobal } from './cross-module';
declare const LegionsCore: {
    LegionsFetch: typeof LegionsFetch;
    project: {
        name: string;
    };
    StorageKeysDataSet: typeof StorageKeysDataSet;
    MasterGlobalStateStore: typeof MasterGlobalStateStore;
    WorkerGlobalStateStore: typeof WorkerGlobalStateStore;
    IframePostMessage: {
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
    subscribeLegionsProGlobal: typeof subscribeLegionsProGlobal;
};
export default LegionsCore;
