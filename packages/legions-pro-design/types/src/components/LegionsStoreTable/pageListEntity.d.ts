import { BaseModel } from './model/base';
/** 列表页数据模型类*/
export declare class PageListEntity<ResponseEntity> extends BaseModel<ResponseEntity[]> {
    total: number;
    current: number;
    pageSize: number;
    constructor(options: {
        model?: ResponseEntity;
        /** 服务端数据 */
        responseData: any;
        /** 映射数据至===>result */
        mappingEntity: (that: PageListEntity<ResponseEntity>, responseData: any) => void;
    });
}
