import StoreBase, { IStoreBaseMeta } from '../../common/stores/StoreBase';
import { observable, autorun, action, computed, when } from 'mobx';
import { observablePromise,ObservablePromiseModel, ObservableTempState } from 'legions/store-utils';
import { MockPageListEntity } from '../models/mockListEntity';
import { getMockListData } from '../services/message';
import { resource } from 'legions/store';
import { ITriggerEventPrams } from './TodoStore';
import { getCusinfoSearch, getUserInfoService } from '../services/userService';
import { UserInfoContainerEntity } from '../models/userInfoEntity';
import { getCookie } from '../../common/utils/cookie';
import { ExportTaskEntity } from 'examples/models/ExportTaskEntity';
import { pagingQueryProcessing } from 'legions-lunar';
import { SearchEntity } from 'examples/containers/proQuery/searchEntity';
export const User = resource('PMS/User');

export default class UserInfoStore extends StoreBase {
  static meta: IStoreBaseMeta = {
    ...StoreBase.meta,
    className: 'UserInfoStore',
    eventScopes: [User],
  };

  @observable obMockList = observablePromise<MockPageListEntity>(null);

  /**
   * 用户信息
   *
   * @memberof UserInfoStore
   */
  @observable obUserInfo = observablePromise<UserInfoContainerEntity>(null);

  @observable authEntity = observablePromise<UserInfoContainerEntity>(null);
  @observable exportTaskList: ExportTaskEntity[] = [];

  @observable system = 'scm';

  @observable todos: UserInfoContainerEntity = null;

  @observable obUserPageList = {
    keyWords: '',
    data: observable.map<ObservablePromiseModel>(),
  };
  @computed get uid() {
    if (this.obUserInfo.isResolved && this.obUserInfo.value.success) {
      return this.obUserInfo.value.result.uId;
    }
  }
  /** 原产国Format */
  @computed get UserPageList() {
    let oldList = new Map();
    let total = 0;
    for (let i = 1; i <= this.obUserPageList.data.size; i++) {
      //@ts-ignore
      const data = this.obUserPageList.data.get(i.toString());
      if (data && data.isResolved) {
        let arr = data.value.result.data;
        oldList.set(
          i.toString(),
          arr.map(item => {
            return {
              key: item.code,
              value: '(' + item.code + ')' + item.name,
            };
            // tslint:disable-next-line: trailing-comma
          })
        );
        //@ts-ignore
        total = this.obUserPageList.data.get(i.toString()).value.result.total;
      }
    }
    return {
      data: oldList,
      total,
    };
  }
  // tslint:disable-next-line: typedef
  constructor(props) {
    super(props);
    const system = getCookie('SYSSOURCE');
    if (process.env.environment !== 'dev') {
      if (system === 'SCM' || system === 'JABIL') {
        this.getUserInfo();
      }
    } else {
      this.getUserInfo();
    }
  }

  @action getMockList() {
    this.obMockList = observablePromise(getMockListData());
  }

  @action setSystem(system: string) {
    this.system = system;
  }
  /**
   *
   * 获取用户信息
   * @memberof UserInfoStore
   */
  @action getUserInfo() {
    this.obUserInfo = observablePromise(getUserInfoService());
  }
  @action checkAuth() {
    this.authEntity = observablePromise(getUserInfoService());
  }
  @action getNatcdName = (params?: {
    keyword: string;
    current: number;
    size: number;
  }) => {
    this.obUserPageList = pagingQueryProcessing<SearchEntity>(
      {
        state: 'obUserPageList',
        store: UserInfoStore,
        servicePromise: getCusinfoSearch,
        queryPrams: {
          ...params,
          templateCode: 'Country',
        },
        keyWords: params.keyword,
        mapItemKeys: params.current.toString(),
      },
      // tslint:disable-next-line: trailing-comma
      ['1', 1, params['size']]
    );
  };
}
