/*
 * @Author: duanguang
 * @Date: 2021-01-04 16:30:32
 * @LastEditTime: 2022-02-28 17:15:19
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreModal/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import LegionsStore from '../LegionsStore';
import {legionsStoreInterface} from '../LegionsStore/interface';
import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel } from 'legions/store-utils';
import { ModalView } from './modalView';
import { Proxify } from './interface';
import { ViewModel } from 'brain-store-utils/types/create-view-model';



@StoreModules
export default class LegionsStoreModal extends LegionsStore.StoreBase {
  static meta: legionsStoreInterface['storeBaseMeta'] = {
    ...LegionsStore.StoreBase.meta,
  };
  constructor(context) {
    super(context);
  }
  @observable ModalContainer = observable.map<string,
    ViewModel<ModalView> & Proxify<ModalView>
  >();
  /**
   *
   * 打开 Modal 模态对话框。
   * @param {*} title
   * @param {number} [width=520]
   * @memberof ModalStore
   */
  @action open(title, width = 520) {}

  /**
   * 关闭模态对话框
   *
   * @memberof ModalStore
   */
  @action close(uid: string) {
    //@ts-ignore
    this.ModalContainer.get(uid).visible = false;
  }
  @action showModal(uid: string) {
    //@ts-ignore
    this.ModalContainer.get(uid).visible = true;
  }
  @action add(uid: string) {
    this.ModalContainer.set(
      uid,
      observableViewModel<ModalView>(new ModalView())
    );
  }
  @action delete(uid: string) {
    this.ModalContainer.delete(uid);
  }
}
