export declare class BaseModel<T = {}> {
    /** *操作结果
     * @type {boolean}
     */
    success: boolean;
    /**
     * 描述信息
     *
     * @type {string}
     */
    message: string;
    /**  提示信息编码
     * @type {(string|number)}
     */
    code: string | number;
    /**  返回数据信息
     * @type {T}
     */
    data: T;
    transformArray(rows: any, mapEntity: any): any;
    transformRows(rows: any, mapEntity: any): any;
    transformRow(row: any, mapEntity: any): T;
}
