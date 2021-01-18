import { resource } from 'legions/store';
/**  菜单折叠事件分发*/

export const CollapsedResource = resource('Menu/resource/collapsed');// index.d.ts

/** 管理菜单及页签缓存事件 */
export const MenuPanesStorageResource =  resource('storage/resource/menu/tabPanes');
/**  面包屑事件分发器*/
export const BreadCrumbsResourceEven = resource('Menu/resource/BreadCrumbs');

export const project = {
    name: 'portal'
};