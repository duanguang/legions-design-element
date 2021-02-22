import StoreBase, { IStoreBaseMeta } from '../../common/stores/StoreBase';
import {observable,autorun,action, computed, when} from 'mobx';
import { observablePromise,ObservableTempState } from 'legions/store-utils';
import { MockPageListEntity } from '../models/mockListEntity';
import { getMockListData } from '../services/message';
import {resource} from 'legions/store';
import { ITriggerEventPrams } from './TodoStore';
import { getUserInfoService } from '../services/userService';
import {UserInfoContainerEntity} from '../models/userInfoEntity'
import { getCookie } from '../../common/utils/cookie';
import { ExportTaskEntity } from 'examples/models/ExportTaskEntity';
export const User = resource('PMS/User');
interface IEvent{
    name:string,
    scope:string
}

export default class UserInfoStore extends StoreBase{
    static meta:IStoreBaseMeta={
        ...StoreBase.meta,
        className:'UserInfoStore',
        eventScopes: [User],
    }

    @observable obMockList=observablePromise<MockPageListEntity>();


    /**
     * 用户信息
     *
     * @memberof UserInfoStore
     */
    @observable obUserInfo = observablePromise<UserInfoContainerEntity>();

    @observable authEntity = observablePromise<UserInfoContainerEntity>();
    @observable exportTaskList: ExportTaskEntity[] = [];

    @observable system = 'scm'

    @observable todos:UserInfoContainerEntity = null
    @computed get uid() {
        if (this.obUserInfo.isResolved && this.obUserInfo.value.success) {
            return this.obUserInfo.value.result.uId
        }
    }
    
    // tslint:disable-next-line: typedef
    constructor(props) {
        super(props);
        const system = getCookie('SYSSOURCE');
        if (process.env.environment !== 'dev') {
            if (system === 'SCM' || system === 'JABIL'){
                this.getUserInfo();  
            } 
        }
        else {
            this.getUserInfo();
        }
    }

    @action getMockList(){
        this.obMockList=observablePromise(getMockListData());
    }

    @action setSystem(system:string){
        this.system = system
    }
    /**
     *
     * 获取用户信息
     * @memberof UserInfoStore
     */
    @action getUserInfo(){
       this.obUserInfo = observablePromise(getUserInfoService())
    }
    @action checkAuth(){
        this.authEntity = observablePromise(getUserInfoService())
    }
    
}
