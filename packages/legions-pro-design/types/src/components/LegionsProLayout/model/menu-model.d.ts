import { BaseModel } from './base';
import { legionsProLayoutInterface } from '../interface';
declare abstract class InterfaceMenuModel {
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
        props?: any;
    };
}
export declare type TypeMenuModel = InstanceType<typeof MenuModel>;
export declare type TypeMenuBaseModel = InstanceType<typeof MenuBaseModel>;
export declare class MenuBaseModel extends InterfaceMenuModel {
    constructor();
    readonly key = "";
    readonly title = "";
    content: string;
    path?: string;
    readonly closable? = false;
    readonly children: Array<MenuBaseModel> | [];
    readonly deep: Array<string>;
    readonly icon: string;
    loadingMode: 'iframe' | 'sandbox' | 'routerCompeont';
    router: 'history' | 'hash';
    sandbox: {
        appName: string;
        appEntiy: string;
        appRootId: string;
        experimentalStyleIsolation: boolean;
        isMerge: boolean;
    };
    beforeLoad?: (pane: legionsProLayoutInterface['panes']) => legionsProLayoutInterface['panes'];
    afterLoad?: (value: {
        pane: legionsProLayoutInterface['panes'];
        iframe?: HTMLIFrameElement;
    }) => void;
}
export declare class MenuModel extends BaseModel<Array<MenuBaseModel>> {
    constructor();
}
export {};
