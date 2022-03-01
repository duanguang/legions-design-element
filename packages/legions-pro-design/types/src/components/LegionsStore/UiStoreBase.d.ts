import StoreBase from "./StoreBase";
import { legionsStoreInterface } from './interface';
export default class UiStoreBase extends StoreBase {
    static meta: legionsStoreInterface['storeBaseMeta'];
}
