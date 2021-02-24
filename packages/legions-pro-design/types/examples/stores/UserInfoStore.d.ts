import StoreBase, { IStoreBaseMeta } from '../../common/stores/StoreBase';
import { observablePromise } from 'legions/store-utils';
import { MockPageListEntity } from '../models/mockListEntity';
import { UserInfoContainerEntity } from '../models/userInfoEntity';
import { ExportTaskEntity } from 'examples/models/ExportTaskEntity';
import { SearchEntity } from 'examples/containers/proQuery/searchEntity';
export declare const User: import("brain-store").IResource;
export default class UserInfoStore extends StoreBase {
    static meta: IStoreBaseMeta;
    obMockList: observablePromise.PramsResult<MockPageListEntity>;
    /**
     * 用户信息
     *
     * @memberof UserInfoStore
     */
    obUserInfo: observablePromise.PramsResult<UserInfoContainerEntity>;
    authEntity: observablePromise.PramsResult<UserInfoContainerEntity>;
    exportTaskList: ExportTaskEntity[];
    system: string;
    todos: UserInfoContainerEntity;
    obUserPageList: {
        keyWords: string;
        data: import("mobx").ObservableMap<observablePromise.PramsResult<SearchEntity>, any>;
    };
    get uid(): string;
    /** 原产国Format */
    get UserPageList(): {
        data: Map<any, any>;
        total: number;
    };
    constructor(props: any);
    getMockList(): void;
    setSystem(system: string): void;
    /**
     *
     * 获取用户信息
     * @memberof UserInfoStore
     */
    getUserInfo(): void;
    checkAuth(): void;
    getNatcdName: (params?: {
        keyword: string;
        current: number;
        size: number;
    }) => void;
}
