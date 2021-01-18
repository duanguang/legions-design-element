/*
 * @Author: duanguang
 * @Date: 2020-12-31 10:38:25
 * @LastEditTime: 2021-01-07 17:51:59
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/models/pro.menu.model/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { JsonProperty } from 'json-mapper-object';
import { IPanes } from '../../store/pro.layout/interface';
import { BaseEntity } from '../pro.base.model';
interface ClassOf<T> {
  new (...args: any[]): T;
}
export abstract class InterfaceMenuEntity {
  abstract key: string;
  abstract title: string;
  abstract content: string;
  abstract path?: string;
  abstract closable?: boolean;
  abstract children: Array<InterfaceMenuEntity>;
  abstract deep: Array<string>;
  abstract icon: string;
  /* get loadingMode(): "iframe" | "sandbox" | "routerCompeont" { return 'iframe' }; */
  /** 页签或资源加载方式 */
  loadingMode: 'iframe' | 'sandbox' | 'routerCompeont';
  /** 沙箱加载配置数据 */
  sandbox: {
    appName: string;
    appEntiy: string;
    appRootId: string;
    experimentalStyleIsolation: boolean;
  };
  /* get sandbox () {
    return {
      appName: '',
      appEntiy: '',
      appRootId: '',
    }  
  } */
}
export class MenuEntity extends InterfaceMenuEntity {
  constructor() {
    super(); // 在派生类的构造函数中必须调用 super()
  }
  /**
   *键名
   *
   * @memberof UserEntity
   */
  @JsonProperty('key')
  readonly key = '';

  /**
   *菜单标题
   *
   * @memberof MenuEntity
   */
  @JsonProperty('title')
  readonly title = '';

  /**
   *内容区数据
   *
   * @memberof MenuEntity
   */
  @JsonProperty('content')
  content = '';

  /**
   *
   * 菜单路径
   * @memberof MenuEntity
   */
  @JsonProperty('path')
  path? = '';

  /**
   *是否允许关闭
   *
   * @memberof MenuEntity
   */
  @JsonProperty('closable')
  readonly closable? = false;

  /**
   * 子菜单
   *
   * @type {Array<MenuEntity>}
   * @memberof MenuEntity
   */
  @JsonProperty({ clazz: MenuEntity, name: 'child' })
  readonly children: Array<MenuEntity> | [] = [];

  @JsonProperty('deep')
  readonly deep: Array<string> = [];

  @JsonProperty('iconurl')
  readonly icon: string = '';

  loadingMode: 'iframe' | 'sandbox' | 'routerCompeont' = 'iframe';
  sandbox = {
    appName: '',
    appEntiy: '',
    appRootId: '',
    experimentalStyleIsolation: true,
    isMerge: false,
  };
  beforeLoad?: (pane: IPanes) => IPanes;
  afterLoad?: (value: { pane: IPanes; iframe?: HTMLIFrameElement }) => void;
}

export interface IMenuEntity {
  msg: string;
  ok: boolean;
  status: string;
  data: Array<MenuEntity>;
}
export class MenuContainerEntity<InterfaceMenuEntity> extends BaseEntity<
  Array<InterfaceMenuEntity>
> {
  /* transformRows(rows, mapEntity) {
    super.transformRows(rows, mapEntity)
  } */
  /**
   *Creates an instance of MenuContainerEntity.
   * @param {IMenuEntity} fromJson 服务端接口数据
   * @memberof MenuContainerEntity  VMdel?:ClassOf<InterfaceMenuEntity>
   */
  constructor(fromJson: IMenuEntity) {
    super(fromJson);
    this.message = fromJson.msg || '查询成功';
    this.success = fromJson.ok || true;
    this.code = fromJson.status || '';
    let data = fromJson.data;
    if (fromJson && data) {
      this.result = super.transformRows(data, MenuEntity);
    } else {
      this.result = [];
    }
  }
}
