/*
 * @Author: duanguang
 * @Date: 2020-12-29 16:44:16
 * @LastEditTime: 2021-01-13 10:27:29
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
import { HlQueryConditionView } from './HlQueryConditionView';
type Proxify<T> = { [P in keyof T]: T[P] };

@StoreModules
export  class ProQueryConditionStore<Query = {}> extends StoreBase {
    static meta: IStoreBaseMeta = {
        ...StoreBase.meta,
    };
    constructor(context) {
        super(context);
    }
    @observable HlQueryConditionContainer = observable.map<string,ViewModel<HlQueryConditionView<Query>> & Proxify<HlQueryConditionView<Query>>>();

    @action add(uid: string) {
        this.HlQueryConditionContainer.set(uid, observableViewModel<HlQueryConditionView<Query>>(new HlQueryConditionView()));
    }
    @action delete(uid: string) {
        this.HlQueryConditionContainer.delete(uid);
    }
    @action get(uid: string) {
        return this.HlQueryConditionContainer.get(uid);
    }
}
