import { BaseEntity } from './pro.base.model';
export declare class KeyValue {
    key: any;
    value: any;
    label?: any;
    title?: any;
    keyValue?: any;
    extendedField?: any;
}
/** 下拉列表数据模型*/
export declare class SelectKeyValue extends BaseEntity<KeyValue[]> {
    total: number;
    current: number;
    pageSize: number;
    constructor(options: {
        /** 服务端数据 */
        responseData: any;
        /** 映射数据至===>KeyValue 数组 */
        mappingEntity: (that: SelectKeyValue, responseData: any) => KeyValue[];
    });
}
