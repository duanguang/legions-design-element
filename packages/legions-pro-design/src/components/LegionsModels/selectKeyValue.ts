/*
 * @Author: duanguang
 * @Date: 2021-12-04 21:45:55
 * @LastEditTime: 2022-03-01 14:11:57
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsModels/selectKeyValue.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { JsonProperty, MapperEntity } from 'json-mapper-object';
export class KeyValue {
  @JsonProperty('key')
  key = void 0

  @JsonProperty('value')
  value = void 0

  @JsonProperty('label')
  label?= void 0

  @JsonProperty('title')
  title?= void 0

  @JsonProperty('keyValue')
  keyValue?= void 0

  @JsonProperty('extendedField')
  extendedField?= void 0
}
/** 下拉列表数据模型*/
export class SelectKeyValue {
  total: number = 0;
  current: number = 1;
  pageSize: number = 10;

  /** *操作结果 
    * @type {boolean}
    */
  success: boolean = true;

  /**
   * 描述信息
   *
   * @type {string}
   * @memberof BaseEntity
   */
  message: string = '';

  /**  提示信息编码
   * @type {(string|number)}
   */
  code: string | number = '';

  /**  返回数据信息
   * @type {T}
   * @memberof BaseEntity
   */
  result: KeyValue[] = null;
  constructor(options: {
    /** 服务端数据 */
    responseData: any;
    /** 映射数据至===>KeyValue 数组 */
    mappingEntity: (
      that: SelectKeyValue,
      responseData: any
    ) => KeyValue[];
  }) {
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
  transformArray(rows,mapEntity) {
    return (rows || []).map(row => {
      return this.transformRow(row,mapEntity);
    });
  }
  transformRows(rows,mapEntity) {
    return (rows || []).map(row => {
      return this.transformRow(row,mapEntity);
    });
  }
  transformRow(row,mapEntity) {
    return MapperEntity(mapEntity,row);
  }
}
