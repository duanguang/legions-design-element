/*
 * @Author: duanguang
 * @Date: 2022-02-28 14:42:46
 * @LastEditTime: 2022-03-01 13:58:25
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProLayout/model/menu-model.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { JsonProperty } from 'json-mapper-object';
import { BaseModel } from './base';
import {legionsProLayoutInterface} from '../interface'
abstract class InterfaceMenuModel {
    /**  菜单唯一key */
    abstract key: string;
    /** 标题 */
    abstract title: string;
    /** 内容区数据 */
    abstract content: string;
    /** 路径 */
    abstract path?: string;
    /** 是否允许关闭 */
    abstract closable?: boolean;
    /*** 子菜单 */
    abstract children: Array<InterfaceMenuModel>;
    /** 菜单深度 */
    abstract deep: Array<string>;
    abstract icon: string;
    /** 页签或资源加载方式 */
    loadingMode: 'iframe' | 'sandbox' | 'routerCompeont';
    /** 沙箱路由加载模式 */
    router: 'history' | 'hash';
    /** 沙箱加载配置数据 */
    sandbox: {
        appName: string;
        appEntiy: string;
        appRootId: string;
        /** css 是否开启严格模式 */
        experimentalStyleIsolation: boolean;
        props?: any
    };
}
export type TypeMenuModel = InstanceType<typeof MenuModel>
export type TypeMenuBaseModel = InstanceType<typeof MenuBaseModel>
export class MenuBaseModel extends InterfaceMenuModel {
    constructor() {
        super(); // 在派生类的构造函数中必须调用 super()
    }
    @JsonProperty('key')
    readonly key = '';

    @JsonProperty('title')
    readonly title = '';

    @JsonProperty('content')
    content = '';

    @JsonProperty('path')
    path?= '';

    @JsonProperty('closable')
    readonly closable?= false;

    @JsonProperty({ clazz: MenuBaseModel,name: 'child' })
    readonly children: Array<MenuBaseModel> | [] = [];

    @JsonProperty('deep')
    readonly deep: Array<string> = [];

    @JsonProperty('iconurl')
    readonly icon: string = '';

    loadingMode: 'iframe' | 'sandbox' | 'routerCompeont' = 'iframe';
    router: 'history' | 'hash' = 'history';
    sandbox = {
        appName: '',
        appEntiy: '',
        appRootId: '',
        experimentalStyleIsolation: true,
        isMerge: false,
    };
    beforeLoad?: (pane: legionsProLayoutInterface['panes']) => legionsProLayoutInterface['panes'];
    afterLoad?: (value: { pane: legionsProLayoutInterface['panes']; iframe?: HTMLIFrameElement }) => void;
}

export class MenuModel extends BaseModel<Array<MenuBaseModel>> {
    constructor() {
        super();
    }
}