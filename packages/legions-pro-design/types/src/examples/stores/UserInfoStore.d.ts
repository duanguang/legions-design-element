import StoreBase, { IStoreBaseMeta } from '../../common/stores/StoreBase';
import { ObservablePromiseModel } from 'legions/store-utils';
import { MockPageListEntity } from '../models/mockListEntity';
import { UserInfoContainerEntity } from '../models/userInfoEntity';
import { ExportTaskEntity } from 'examples/models/ExportTaskEntity';
export declare const User: import("brain-store/types/api/resourceEvent").IResource;
export default class UserInfoStore extends StoreBase {
    static meta: IStoreBaseMeta;
    obMockList: ObservablePromiseModel<MockPageListEntity>;
    /**
     * 用户信息
     *
     * @memberof UserInfoStore
     */
    obUserInfo: ObservablePromiseModel<UserInfoContainerEntity>;
    authEntity: ObservablePromiseModel<UserInfoContainerEntity>;
    exportTaskList: ExportTaskEntity[];
    system: string;
    todos: UserInfoContainerEntity;
    obUserPageList: {
        keyWords: string;
        data: import("mobx").ObservableMap<ObservablePromiseModel<{}>, any>;
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
