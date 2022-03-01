import { legionsProLayoutInterface } from '../interface';
export declare class MenuViewStore {
    /**
     * logo 宽度
     */
    logoWidth: number;
    /** *
     *皮肤方案
     */
    skin: string;
    /**
     * 皮肤列表数据
     */
    SkinList: legionsProLayoutInterface['skinModel'];
    /**
     *菜单左右方向展开收起
     *
     *true 折叠,false 展开
     */
    collapsed: boolean;
    /** 是否固定侧边菜单 */
    fixedSiderMenu: boolean;
    /** 是否固定头部区域 */
    fixedHeader: boolean;
    getSkinInfos(): {
        color: string;
        skin: string;
        logoSkin: string;
        theme: "dark" | "light";
        width: number;
        collapsedWidth: number;
    };
}
