/*
 * @Author: duanguang
 * @Date: 2021-03-02 14:19:18
 * @LastEditTime: 2021-07-12 22:48:04
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/stores/TodoStore.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import StoreBase, { IStoreBaseMeta } from '../../common/stores/StoreBase';
import {observable,autorun,action, computed} from 'mobx';
import { observablePromise,ObservableTempState } from 'legions/store-utils';
import { MockContainerEntity } from '../models/mockEntity';
import { getMockData } from '../services/message';
interface IContext{
}
console.log(observablePromise,'observablePromise');
export interface ITriggerEventPrams{
    payload:{
        payloadModel:string;
        b:number;
    }
}
export default class TodoStore extends StoreBase<IContext>{
    static meta :IStoreBaseMeta={
        ...StoreBase.meta,
        className:'TodoStore',
        eventScopes: [],
        contextTypes:{
        },
    }

    @observable obMockData=observablePromise<MockContainerEntity>(null);

    @observable test={name:'sss'}
    constructor(context){
        super(context);
        this.watch()
    }

    watch=()=>{
        autorun(()=> {
            console.log('数据状态',this.obMockData.state)
         });
    }

    @action getMockData(){
        this.obMockData=observablePromise(getMockData());
    }
    triggerEvent(payload:ITriggerEventPrams) {
    }
}
