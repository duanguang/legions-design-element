import LegionsStore from '../LegionsStore';
import { IStoreBaseMeta } from '../LegionsStore/interface';
export default class LegionsStoreModal extends LegionsStore.StoreBase {
    static meta: IStoreBaseMeta;
    constructor(context: any);
    ModalContainer: import("mobx").ObservableMap<string, import("./interface").IViewModelModalStore>;
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
