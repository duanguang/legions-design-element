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
export declare class StockModeTableEntity {
    /** 申报单位名称 */
    bizopEtpsNm: string;
    /** 申报单位编码 */
    bizopEtpsNo: string;
    /** 申报单位社会信用代码 */
    bizopEtpsSccd: string;
    /** 创建时间 */
    createTime: string;
    /** 出货模式名称 */
    exportsGoodsModel: string;
    /** id */
    id: number;
    /** 进出境关别code */
    ieCustomCode: string;
    /** 进出境关别名称 */
    ieCustomName: string;
    /** 入离境口岸code */
    iePort: string;
    /** 入离境口岸名称 */
    iePortName: string;
    /** 申报地海关code */
    masterCuscd: string;
    /** 申报地海关名称 */
    masterCuscdName: string;
    /** 运输方式code */
    trafMode: string;
    /** 运输方式名称 */
    trafModeName: string;
    /** 对应报关单申报单位code */
    corrEntryDclEtpsNo: string;
    /** 对应报关单申报单位名称 */
    corrEntryDclEtpsNm: string;
}
export declare class StockModeResultEntity {
    records: Array<StockModeTableEntity>;
    total: number;
}
interface IBaseEntity<T> {
    msg: string;
    status: number;
    ok: boolean;
    data: T;
}
export declare class StockModeContainerEntity extends BaseEntity<StockModeResultEntity> {
    constructor(fromJson: IBaseEntity<StockModeResultEntity>);
}
export {};
