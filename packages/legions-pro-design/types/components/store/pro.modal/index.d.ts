import { StoreBase } from '../index';
import { IStoreBaseMeta } from '../interface';
export declare class ProModalStore extends StoreBase {
    static meta: IStoreBaseMeta;
    constructor(context: any);
    ModalContainer: import("mobx").ObservableMap<import("./interface").IViewModelModalStore, any>;
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
