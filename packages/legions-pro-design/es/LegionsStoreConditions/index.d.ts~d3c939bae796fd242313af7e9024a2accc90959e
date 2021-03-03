/** @format */
import LegionsStore from '../LegionsStore';
import { IStoreBaseMeta } from '../LegionsStore/interface';
import { ViewModel } from 'brain-store-utils';
import { ObservableMap } from 'mobx';
import { ConditionView } from './conditionView';
declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
export default class LegionsStoreConditions<Query = {}> extends LegionsStore.StoreBase {
    static meta: IStoreBaseMeta;
    private viewModelQuery;
    constructor(context: any);
    ConditionContainer: ObservableMap<string, ViewModel<ConditionView<Query>> & Proxify<ConditionView<Query>>>;
    add(uid: string): void;
    delete(uid: string): void;
    get(uid: string): ViewModel<ConditionView<Query>> & Proxify<ConditionView<Query>>;
}
export {};
