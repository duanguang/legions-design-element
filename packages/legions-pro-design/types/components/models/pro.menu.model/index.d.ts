import { IPanes } from '../../store/pro.layout/interface';
import { BaseEntity } from '../pro.base.model';
export declare abstract class InterfaceMenuEntity {
    abstract key: string;
    abstract title: string;
    abstract content: string;
    abstract path?: string;
    abstract closable?: boolean;
    abstract children: Array<InterfaceMenuEntity>;
    abstract deep: Array<string>;
    abstract icon: string;
    /** 页签或资源加载方式 */
    loadingMode: 'iframe' | 'sandbox' | 'routerCompeont';
    /** 沙箱加载配置数据 */
    sandbox: {
        appName: string;
        appEntiy: string;
        appRootId: string;
        experimentalStyleIsolation: boolean;
    };
}
export declare class MenuEntity extends InterfaceMenuEntity {
    constructor();
    /**
     *键名
     *
     * @memberof UserEntity
     */
    readonly key = "";
    /**
     *菜单标题
     *
     * @memberof MenuEntity
     */
    readonly title = "";
    /**
     *内容区数据
     *
     * @memberof MenuEntity
     */
    content: string;
    /**
     *
     * 菜单路径
     * @memberof MenuEntity
     */
    path?: string;
    /**
     *是否允许关闭
     *
     * @memberof MenuEntity
     */
    readonly closable? = false;
    /**
     * 子菜单
     *
     * @type {Array<MenuEntity>}
     * @memberof MenuEntity
     */
    readonly children: Array<MenuEntity> | [];
    readonly deep: Array<string>;
    readonly icon: string;
    loadingMode: 'iframe' | 'sandbox' | 'routerCompeont';
    sandbox: {
        appName: string;
        appEntiy: string;
        appRootId: string;
        experimentalStyleIsolation: boolean;
        isMerge: boolean;
    };
    beforeLoad?: (pane: IPanes) => IPanes;
    afterLoad?: (value: {
        pane: IPanes;
        iframe?: HTMLIFrameElement;
    }) => void;
}
export interface IMenuEntity {
    msg: string;
    ok: boolean;
    status: string;
    data: Array<MenuEntity>;
}
export declare class MenuContainerEntity<InterfaceMenuEntity> extends BaseEntity<Array<InterfaceMenuEntity>> {
    /**
     *Creates an instance of MenuContainerEntity.
     * @param {IMenuEntity} fromJson 服务端接口数据
     * @memberof MenuContainerEntity  VMdel?:ClassOf<InterfaceMenuEntity>
     */
    constructor(fromJson: IMenuEntity);
}
