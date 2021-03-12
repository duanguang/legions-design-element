import { LegionsFetch } from './legionsFetch';
import * as StorageKeysDataSet from './constant.storageKeys';
declare const LegionsCore: {
    LegionsFetch: typeof LegionsFetch;
    project: {
        name: string;
    };
    StorageKeysDataSet: typeof StorageKeysDataSet;
};
export default LegionsCore;
