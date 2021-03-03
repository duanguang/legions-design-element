import StoreBase from "./StoreBase";
import { Lifecycle } from "legions/store";
import {IStoreBaseMeta} from './interface'
export default class UiStoreBase extends StoreBase {
    static meta :IStoreBaseMeta= {
        ...StoreBase.meta,
        namespace: `${StoreBase.meta.namespace}.ui`,
        lifecycle: Lifecycle.History
    }
}
