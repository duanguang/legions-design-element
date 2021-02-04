/*
 * @Author: duanguang
 * @Date: 2020-12-29 16:44:16
 * @LastEditTime: 2021-02-04 16:17:22
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.query.conditions/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/** @format */

import {StoreBase} from '../index';
import {IStoreBaseMeta} from '../interface';
import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils';
import { computed,ObservableMap } from 'mobx';
import { ConditionView } from './conditionView';
import { IProConditions } from '../../LegionsProConditions/ProConditionsUtils';
type Proxify<T> = { [P in keyof T]: T[P] };

@StoreModules
export  class ProQueryConditionStore<Query = {}> extends StoreBase {
    static meta: IStoreBaseMeta = {
        ...StoreBase.meta,
    };
    @observable private viewModelQuery=observableViewModel<ConditionView<Query>>(new ConditionView())
    constructor(context) {
        super(context);
    }
    @observable ConditionContainer = observable.map<string,ViewModel<ConditionView<Query>> & Proxify<ConditionView<Query>>>();

    @action add(uid: string) {
        this.viewModelQuery = observableViewModel<ConditionView<Query>>(new ConditionView())
        this.ConditionContainer.set(uid, this.viewModelQuery);
    }
    @action delete(uid: string) {
        this.ConditionContainer.delete(uid);
    }
    @action get(uid: string) {
        return this.ConditionContainer.get(uid);
    }
}
