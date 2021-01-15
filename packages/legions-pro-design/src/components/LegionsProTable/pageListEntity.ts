import { BaseEntity } from '../models';
/** 列表页数据模型类*/
export class PageListEntity<ResponseEntity> extends BaseEntity<
  ResponseEntity[]
> {
  total: number = 0;
  current: number = 1;
  pageSize: number = 10;
  constructor(options: {
    model?: ResponseEntity;
    /** 服务端数据 */
    responseData: any;
    /** 映射数据至===>result */
    mappingEntity: (
      that: PageListEntity<ResponseEntity>,
      responseData: any
    ) => void;
  }) {
    super();
    this.result = [];
    if (options && typeof options.responseData === 'object') {
      this.message = options.responseData.msg || '查询成功';
      this.success = options.responseData.ok ? true : false;
      this.code = options.responseData.status || '';
      this.total = options.responseData.total || 0;
      this.current = options.responseData.current || 1;
      this.pageSize = options.responseData.pageSize || 10;
      if (
        options.mappingEntity &&
        typeof options.mappingEntity === 'function'
      ) {
        options.mappingEntity(this, options.responseData);
      }
    }
  }
}
