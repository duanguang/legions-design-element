import { JsonProperty } from 'json-mapper-object';
import { BaseEntity } from '../../../../es/models';

/** 类名称无特殊要求,请勿改变*/
class ResponseVModelNameDataEntity {
  @JsonProperty('id')
  id = void 0;

  /** 可填写接口其他返回值属性*/
}

/** 类名称无特殊要求,请勿改变*/
class ResponseEntity {
  @JsonProperty({
    clazz: ResponseVModelNameDataEntity,
    name: 'data.result',
  })
  data = [];

  @JsonProperty('size')
  size = 0;

  @JsonProperty('current')
  current = 0;

  @JsonProperty('total')
  total = 0;
}

interface IBaseEntity<T> {
  msg: string;
  ok: boolean;
  status: string;
  data: T;
}

/** 类名称请勿修改,系统会直接根据页面模块名称进行创建*/
export class DemoPageListContainerEntity extends BaseEntity<ResponseEntity> {
  constructor(fromJson: IBaseEntity<ResponseEntity>) {
    // @ts-ignore
    super(fromJson);

    this.message = fromJson.msg || '查询成功';
    this.success = fromJson.ok ? true : false;
    this.code = fromJson.status || '';
    let data = fromJson;

    if (data) {
      this.result = super.transformRow(fromJson, ResponseEntity);
    } else {
      this.result = new ResponseEntity();
    }
  }
}