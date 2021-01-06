/*
 * @Author: duanguang
 * @Date: 2020-12-31 10:50:12
 * @LastEditTime: 2020-12-31 10:50:26
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/models/pro.task.model/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { JsonProperty } from 'json-mapper-object';
export class ExportTaskEntity {
  /**
   * 企业UID
   *
   * @memberof UserEntity
   */
  @JsonProperty('companyUid')
  companyUid = '';

  @JsonProperty('id')
  id = 0;
  /**
   *创建人ID,
   *
   * @memberof MenuEntity
   */
  @JsonProperty('createrId')
  createrId = '';

  /**
   * 创建时间,
   *
   * @memberof MenuEntity
   */
  @JsonProperty('createTime')
  createTime = '';

  /**
   *导出名字
   *
   * @memberof MenuEntity
   */
  @JsonProperty('moduleName')
  moduleName? = '';

  /**
   *导出开始时间,
   *
   * @memberof MenuEntity
   */
  @JsonProperty('startTime')
  startTime = '';

  /**
   * 导出完成时间
   *
   * @memberof ExportTaskEntity
   */
  @JsonProperty('finishTime')
  finishTime = '';

  @JsonProperty('createrName')
  createrName = '';

  /**
   *
   * 导出状态: 0:未导出;1:导出中;2:已导出;3:导出结果已删除;4:导出错误,
   * @memberof ExportTaskEntity
   */
  @JsonProperty('state')
  state = '';

  get stateDesc(): string {
    const enumObj = {
      0: '未导出',
      1: '导出中',
      2: '已导出',
      3: '导出结果已删除',
      4: '导出错误',
    };
    return enumObj[this.state];
  }

  get stateUI(): 'success' | 'processing' | 'default' | 'error' | 'warning' {
    const enumObj = {
      0: 'default',
      1: 'processing',
      2: 'success',
      3: 'warning',
      4: 'error',
    };
    return enumObj[this.state];
  }
  /**
   *
   * 导出结果地址,
   * @memberof ExportTaskEntity
   */
  @JsonProperty('filePath')
  filePath = '';

  /**
   *
   * 任务名称
   * @memberof ExportTaskEntity
   */
  @JsonProperty('taskName')
  taskName = '';

  @JsonProperty('version')
  version = '';
}
