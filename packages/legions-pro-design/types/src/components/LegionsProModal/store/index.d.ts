import LegionsStore from '../../LegionsStore';
import { legionsStoreInterface } from '../../LegionsStore/interface';
import { ModalView } from './modalView';
import { ViewModel } from 'brain-store-utils/types/create-view-model';
import { Proxify } from '../interface';
export default class ModalStore extends LegionsStore.StoreBase {
    static meta: legionsStoreInterface['storeBaseMeta'];
    constructor(context: any);
    ModalContainer: import("mobx").ObservableMap<string, ViewModel<ModalView> & Proxify<ModalView>>;
    /**
     *
     * 打开 Modal 模态对话框。
     * @param {*} title
     * @param {number} [width=520]
     * @memberof ModalStore
     */
    open(title: any, width?: number): void;
    /**
     * 关闭模态对话框
     *
     * @memberof ModalStore
     */
    close(uid: string): void;
    showModal(uid: string): void;
    add(uid: string): void;
    delete(uid: string): void;
}
