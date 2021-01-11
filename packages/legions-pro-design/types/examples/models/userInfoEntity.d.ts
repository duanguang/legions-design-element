import { BaseEntity } from './common/baseEntity';
declare class RolesEntity {
    id: number;
    name: string;
    description: string;
    validated: boolean;
    companyCode: string;
}
declare class UserInfoEntity {
    id: number;
    loginId: string;
    validated: boolean;
    lastRole: number;
    companyId: number;
    companyInfo: any;
    roles: RolesEntity;
    userName: string;
    qpHelperLoginId: string;
    companyCode: string;
    companyName: string;
    uId: string;
    citUserId: string;
    companyUid: string;
    lastRoleName: string;
}
interface IUerInfoEntity {
    msg: string;
    ok: boolean;
    status: string;
    data: UserInfoEntity;
}
export declare class UserInfoContainerEntity extends BaseEntity<UserInfoEntity> {
    constructor(fromJson: IUerInfoEntity);
}
export {};
