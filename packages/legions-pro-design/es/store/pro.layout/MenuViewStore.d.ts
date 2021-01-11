import { ExportTaskEntity } from '../../models';
import { ISkinModel } from './interface';
export declare class MenuViewStore {
    /**
     * logo 宽度
     *
     * @memberof MenuViewStore
     */
    logoWidth: number;
    /**
     *
     *皮肤方案
     * @memberof MenuViewStore
     */
    skin: string;
    /**
     * 皮肤列表数据
     *
     * @type {ISkinModel}
     * @memberof MenuViewStore
     */
    SkinList: ISkinModel;
    /**
     * true 折叠
     *
     * false 展开
     *菜单左右方向展开收起
     * @memberof MenuViewStore
     */
    collapsed: boolean;
    exportTaskList: ExportTaskEntity[];
    /** 是否固定侧边菜单 */
    fixedSiderMenu: boolean;
    /** 是否固定头部区域 */
    fixedHeader: boolean;
    getSkinInfos(): {
        color: string;
        skin: string;
        logoSkin: string;
        theme: "light" | "dark";
        width: number;
        collapsedWidth: number;
    };
}
