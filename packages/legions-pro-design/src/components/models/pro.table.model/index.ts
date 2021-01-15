import { JsonProperty } from 'json-mapper-object';
import { BaseEntity } from '../pro.base.model';
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
  @JsonProperty({ clazz: TableListColumns, name: 'customColumns' })
  customColumns = [];
}

export interface ITableColumnsEntity {
  message: string;
  success: boolean;
  status: string;
  data: TableColumnsEntity;
  code?: string;
}
export class TableColumnsContainerEntity extends BaseEntity<
  TableColumnsEntity
> {
  constructor(fromJson?: ITableColumnsEntity) {
    super();
    if (fromJson) {
      this.message = fromJson.message || '操作成功';
      this.success = fromJson.success || true;
      this.code = fromJson.status || '';
      const data = fromJson.data;
      if (fromJson && data) {
        this.result = super.transformRow(data, TableColumnsEntity);
      }
    }
  }
}
