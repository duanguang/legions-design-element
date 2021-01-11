import { BaseEntity } from './common/baseEntity';
declare class UserEntity {
    /**
     * 姓名
     *
     * @memberof UserEntity
     */
    name: any;
    /**
     * 年龄
     *
     * @memberof UserEntity
     */
    age: any;
}
export declare class MockEntity {
    id: any;
    companyId: any;
    loginId: number;
    /**
     * 用户信息
     *
     * @memberof MockEntity
     */
    user: UserEntity;
}
interface IMockEntity {
    msg: string;
    ok: boolean;
    status: string;
    data: MockEntity;
}
export declare class MockContainerEntity extends BaseEntity<MockEntity> {
    constructor(fromJson: IMockEntity);
}
export {};
