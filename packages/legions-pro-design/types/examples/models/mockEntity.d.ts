import { BaseEntity } from './common/baseEntity';
declare class UserEntity {
    /**
     * 姓名
     *
     * @memberof UserEntity
     */
    name: undefined;
    /**
     * 年龄
     *
     * @memberof UserEntity
     */
    age: undefined;
}
export declare class MockEntity {
    id: undefined;
    companyId: undefined;
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
