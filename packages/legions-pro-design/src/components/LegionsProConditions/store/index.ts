/*
 * @Author: duanguang
 * @Date: 2020-12-29 16:44:16
 * @LastEditTime: 2022-03-05 21:48:49
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/store/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/** @format */

import LegionsStore from '../../LegionsStore';
import {legionsStoreInterface} from '../../LegionsStore/interface';
import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ConditionView } from './conditionView';
import { ViewModel } from 'brain-store-utils/types/create-view-model';
type Proxify<T> = { [P in keyof T]: T[P] };

@StoreModules
export class StoreConditions<Query = {}> extends LegionsStore.StoreBase {
    static meta: legionsStoreInterface['storeBaseMeta'] = {
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
