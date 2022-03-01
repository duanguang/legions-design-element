/*
 * @Author: duanguang
 * @Date: 2022-03-01 14:20:34
 * @LastEditTime: 2022-03-01 14:23:22
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProLayout/constant.storageKeys.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

/**  当前展开的 SubMenu 菜单项 key 数组 缓存*/
const OPENKEYS_STORAGE_KEY = 'openKeys_storage_key';
/**  当前选中的菜单项 key 数组 缓存*/
const SELECTED_STORAGE_KEY = 'selected_storage_key';

const panesStorageKeys = 'panes_storage_key';
/** 活动tabs 编码 缓存 */
const activeKeyStorageKeys = 'panes_activeKey_key';
/**  menu 菜单选中缓存数据*/
const selectedStorageKeys = 'selected_storage_key';
/**  菜单面包屑缓存数据*/
const breadcrumbStorageKeys = 'breadcrumb_storage_key';

/** 菜单缓存数据keys */
export const storageKeysData = {
    /**  当前展开的 SubMenu 菜单项 key 数组 缓存*/
    OPENKEYS_STORAGE_KEY,
    /**  当前选中的菜单项 key 数组 缓存*/
    SELECTED_STORAGE_KEY,
    panesStorageKeys,
    /** 活动tabs 编码 缓存 */
    activeKeyStorageKeys,
    /**  menu 菜单选中缓存数据*/
    selectedStorageKeys,
    /**  菜单面包屑缓存数据*/
    breadcrumbStorageKeys,
}