import { JsonProperty } from 'json-mapper-object';
import { BaseEntity } from './pro.base.model';
export class KeyValue {
  @JsonProperty('key')
  key = void 0

  @JsonProperty('value')
  value = void 0

  @JsonProperty('label')
  label ?= void 0

  @JsonProperty('title')
  title? = void 0

  @JsonProperty('keyValue')
  keyValue?= void 0
  
  @JsonProperty('extendedField')
  extendedField?=void 0
} 
/** 下拉列表数据模型*/
export class SelectKeyValue extends BaseEntity<
KeyValue[]
> {
  total: number = 0;
  current: number = 1;
  pageSize: number = 10;
  constructor(options: {
    /** 服务端数据 */
    responseData: any;
    /** 映射数据至===>KeyValue 数组 */
    mappingEntity: (
      that: SelectKeyValue,
      responseData: any
    ) => KeyValue[];
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
        const result = options.mappingEntity(this,options.responseData);
        this.result = this.transformRows(result,KeyValue)
      }
    }
  }
}
