export declare class KeyValue {
    key: any;
    value: any;
    label?: any;
    title?: any;
    keyValue?: any;
    extendedField?: any;
}
/** 下拉列表数据模型*/
export declare class SelectKeyValue {
    total: number;
    current: number;
    pageSize: number;
    /** *操作结果
      * @type {boolean}
      */
    success: boolean;
    /**
     * 描述信息
     *
     * @type {string}
     * @memberof BaseEntity
     */
    message: string;
    /**  提示信息编码
     * @type {(string|number)}
     */
    code: string | number;
    /**  返回数据信息
     * @type {T}
     * @memberof BaseEntity
     */
    result: KeyValue[];
    constructor(options: {
        /** 服务端数据 */
        responseData: any;
        /** 映射数据至===>KeyValue 数组 */
        mappingEntity: (that: SelectKeyValue, responseData: any) => KeyValue[];
    });
    transformArray(rows: any, mapEntity: any): any;
    transformRows(rows: any, mapEntity: any): any;
    transformRow(row: any, mapEntity: any): import("json-mapper-object").IGenericObject;
}
