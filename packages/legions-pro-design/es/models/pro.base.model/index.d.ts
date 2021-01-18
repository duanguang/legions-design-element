export declare class BaseEntity<T> {
    constructor(fromJson: any);
    /**
     *操作结果
     *
     * @type {boolean}
     * @memberof BaseEntity
     */
    success: boolean;
    /**
     * 描述信息
     *
     * @type {string}
     * @memberof BaseEntity
     */
    message: string;
    /**
     * 提示信息编码
     *
     * @type {(string|number)}
     * @memberof BaseEntity
     */
    code: string | number;
    /**
     *返回数据信息
     *
     * @type {T}
     * @memberof BaseEntity
     */
    result: T;
    transformArray(rows: any, mapEntity: any): any;
    transformRows(rows: any, mapEntity: any): any;
    transformRow(row: any, mapEntity: any): T;
}
export declare class ContainerEntity<T> extends BaseEntity<T> {
    constructor(fromService?: any);
}
