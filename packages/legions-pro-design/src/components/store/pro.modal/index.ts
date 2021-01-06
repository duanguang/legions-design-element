import StoreBase, { IStoreBaseMeta } from '../StoreBase';
import { observable, action } from 'legions/store';
import { observableViewModel } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils';
import { ModalView } from './modalView';
import { Proxify } from './interface';




export default class ProModalStore extends StoreBase {
  static meta: IStoreBaseMeta = {
    ...StoreBase.meta,
    className: 'ProModalStore',
  };
  constructor(context) {
    super(context);
  }
  @observable ModalContainer = observable.map<
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
