/*
 * @Author: duanguang
 * @Date: 2021-08-09 23:30:23
 * @LastEditTime: 2022-02-28 17:18:49
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStore/UiStoreBase.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import StoreBase from "./StoreBase";
import { Lifecycle } from "legions/store";
import {legionsStoreInterface} from './interface'
export default class UiStoreBase extends StoreBase {
    static meta :legionsStoreInterface['storeBaseMeta']= {
        ...StoreBase.meta,
        namespace: `${StoreBase.meta.namespace}.ui`,
        lifecycle: Lifecycle.History
    }
}
