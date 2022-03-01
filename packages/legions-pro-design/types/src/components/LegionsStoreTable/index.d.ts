/** @format */
import LegionsStore from '../LegionsStore';
import { ProTableView } from './ProTableView';
import { ProTableLocalView } from './ProTableLocalView';
import { legionsStoreInterface } from '../LegionsStore/interface';
import { ObservableMap } from 'mobx';
import { PageListEntity } from './pageListEntity';
import { ViewModel } from 'brain-store-utils/types/create-view-model';
declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
export default class LegionsStoreTable extends LegionsStore.StoreBase {
    static meta: legionsStoreInterface['storeBaseMeta'];
    static pageListEntity: typeof PageListEntity;
    constructor(context: any);
    userInfo: {
        userName: string;
        userUid: string;
        companyName?: string;
        companyUid?: string;
    };
    /**
     * 数据生命周期，表格组件卸载之前
     *
     * @memberof HLTableStore
     */
    TableContainer: ObservableMap<string, ViewModel<ProTableView> & Proxify<ProTableView>>;
    TableContainerModules: ObservableMap<string, any>;
    /**
     *
     *  数据生命周期，应用重新数据前有效
     * @memberof HLTableStore
     */
    HlTableLocalStateContainer: ObservableMap<string, ViewModel<ProTableLocalView> & Proxify<ProTableLocalView>>;
    add(uid: string, modulesName: string, timeuid: string): void;
    init(uid: string, options: ProTableView): void;
    delete(uid: string): void;
    deleteTableModules(modulesName: string): void;
    get(uid: string): ViewModel<ProTableView> & Proxify<ProTableView>;
    addContainerModules(modulesName: string): void;
    /**
     * 添加本地数据
     *
     *  内部方法，外部请勿使用
     * @param {string} uid
     * @memberof HLTableStore
     */
    _addLocalState(uid: string): void;
    _deleteLocalState(uid: string): void;
    getLocalState(uid: string): ViewModel<ProTableLocalView> & Proxify<ProTableLocalView>;
}
export {};
