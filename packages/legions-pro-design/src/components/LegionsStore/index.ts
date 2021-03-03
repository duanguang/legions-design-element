/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:20:33
 * @LastEditTime: 2021-03-02 18:14:24
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStore/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { default as StoreBase } from './StoreBase';
import { default as UiStoreBase } from './UiStoreBase';
import {
    CollapsedResource,
    MenuPanesStorageResource,
    BreadCrumbsResourceEven,project
} from './resourceEvent';
const LegionsStore = {
  StoreBase,
  UiStoreBase,
  CollapsedResource,
  MenuPanesStorageResource,
  BreadCrumbsResourceEven,
  project
}  
export default LegionsStore;