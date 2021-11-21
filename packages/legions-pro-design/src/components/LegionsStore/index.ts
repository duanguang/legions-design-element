/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:20:33
 * @LastEditTime: 2021-11-20 00:25:49
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStore/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { default as StoreBase } from './StoreBase';
import { default as UiStoreBase } from './UiStoreBase';
import { getInjector } from 'legions/store';
import {
    CollapsedResource,
    MenuPanesStorageResource,
    BreadCrumbsResourceEven,project
} from './resourceEvent';
import { ClassOf } from 'legions-lunar/api/typescript';
function getStore<T extends InstanceType<typeof StoreBase>>(store: ClassOf<T>): T{
  if (typeof store === 'function' && store['meta']) {
    const stores = getInjector()
    return stores.getState(store,true);
  }
  return null
}
const LegionsStore = {
  StoreBase,
  UiStoreBase,
  CollapsedResource,
  MenuPanesStorageResource,
  BreadCrumbsResourceEven,
  project,
  /** 获取指定store 实例 */
  get:getStore
}  
export default LegionsStore;