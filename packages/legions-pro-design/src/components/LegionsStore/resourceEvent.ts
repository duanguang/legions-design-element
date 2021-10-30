import { resource } from 'legions/store';
import {IResource} from 'brain-store/types/api/resourceEvent'
/**  菜单折叠事件分发*/
//@ts-ignore
export const CollapsedResource:IResource = resource('Menu/resource/collapsed');// index.d.ts

/** 管理菜单及页签缓存事件 */
export const MenuPanesStorageResource:IResource =  resource('storage/resource/menu/tabPanes');
/**  面包屑事件分发器*/
export const BreadCrumbsResourceEven:IResource = resource('Menu/resource/BreadCrumbs');

export const project = {
    name: 'portal'
};