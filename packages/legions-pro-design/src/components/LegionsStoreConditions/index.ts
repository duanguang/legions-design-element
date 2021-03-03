/*
 * @Author: duanguang
 * @Date: 2020-12-29 16:44:16
 * @LastEditTime: 2021-03-02 18:53:01
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreConditions/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/** @format */

import LegionsStore from '../LegionsStore';
import {IStoreBaseMeta} from '../LegionsStore/interface';
import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils';
import { computed,ObservableMap } from 'mobx';
import { ConditionView } from './conditionView';
type Proxify<T> = { [P in keyof T]: T[P] };

@StoreModules
export default class LegionsStoreConditions<Query = {}> extends LegionsStore.StoreBase {
    static meta: IStoreBaseMeta = {
        ...LegionsStore.StoreBase.meta,
    };
    @observable private viewModelQuery=observableViewModel<ConditionView<Query>>(new ConditionView())
    constructor(context) {
        super(context);
    }
    @observable ConditionContainer = observable.map<string,ViewModel<ConditionView<Query>> & Proxify<ConditionView<Query>>>();

    @action add(uid: string) {
        this.viewModelQuery = observableViewModel<ConditionView<Query>>(new ConditionView(uid))
        this.ConditionContainer.set(uid, this.viewModelQuery);
    }
    @action delete(uid: string) {
        this.ConditionContainer.delete(uid);
    }
    @action get(uid: string) {
        return this.ConditionContainer.get(uid);
    }
}
