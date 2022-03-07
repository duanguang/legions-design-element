/** @format */
import LegionsStore from '../../LegionsStore';
import { legionsStoreInterface } from '../../LegionsStore/interface';
import { ConditionView } from './conditionView';
import { ViewModel } from 'brain-store-utils/types/create-view-model';
declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
export declare class StoreConditions<Query = {}> extends LegionsStore.StoreBase {
    static meta: legionsStoreInterface['storeBaseMeta'];
    private viewModelQuery;
    constructor(context: any);
    ConditionContainer: import("mobx").ObservableMap<string, ViewModel<ConditionView<Query>> & Proxify<ConditionView<Query>>>;
    add(uid: string): void;
    delete(uid: string): void;
    get(uid: string): ViewModel<ConditionView<Query>> & Proxify<ConditionView<Query>>;
}
export {};
