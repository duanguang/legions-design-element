/** @format */
import { StoreBase } from '../index';
import { IStoreBaseMeta } from '../interface';
import { ViewModel } from 'brain-store-utils';
import { ObservableMap } from 'mobx';
import { HlQueryConditionView } from './HlQueryConditionView';
declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
export declare class ProQueryConditionStore<Query = {}> extends StoreBase {
    static meta: IStoreBaseMeta;
    constructor(context: any);
    HlQueryConditionContainer: ObservableMap<ViewModel<HlQueryConditionView<Query>> & Proxify<HlQueryConditionView<Query>>>;
    add(uid: string): void;
    delete(uid: string): void;
    get(uid: string): ViewModel<HlQueryConditionView<Query>> & Proxify<HlQueryConditionView<Query>>;
}
export {};
