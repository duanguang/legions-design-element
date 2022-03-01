/*
 * @Author: duanguang
 * @Date: 2021-03-31 10:18:41
 * @LastEditTime: 2022-02-28 18:08:23
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsModels/pro.table.model/index.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { JsonProperty, MapperEntity } from 'json-mapper-object';
export class TableListColumns {
  @JsonProperty('dataIndex')
  dataIndex: string = '';
  @JsonProperty('title')
  title: string = '';
}
export class TableColumnsEntity {
  /**
   * 模块UID
   *
   * @memberof UserEntity
   */
  @JsonProperty('modulesUid')
  modulesUid = '';

  /**
   * 自定义列信息
   *
   * @memberof MenuEntity
   */
  @JsonProperty({ clazz: TableListColumns,name: 'customColumns' })
  customColumns = [];
}

export interface ITableColumnsEntity {
  message: string;
  success: boolean;
  status: string;
  data: TableColumnsEntity;
  code?: string;
}
export class TableColumnsContainerEntity {
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
    result: TableColumnsEntity = null;

  constructor(fromJson?: ITableColumnsEntity) {
    if (fromJson) {
      this.message = fromJson.message || '操作成功';
      this.success = fromJson.success || true;
      this.code = fromJson.status || '';
      const data = fromJson.data;
      if (fromJson && data) {
        //@ts-ignore
        this.result = this.transformRow(data,TableColumnsEntity);
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
