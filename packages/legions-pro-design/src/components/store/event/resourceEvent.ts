import { resource } from 'legions/store';
import {  MenuEntity } from '../../models/pro.menu.model';
import { IRouter } from '../../interface/pro.store';
export interface IResourceEvent<T>{
    
  /**
   * 事件名称
   *
   * @type {string}
   * @memberof IResourceEvent
   */
  name:string;

  /**
   * 事件作用域
   *
   * @type {string}
   * @memberof IResourceEvent
   */
  scope:string;


  /**
   * 派发数据对象
   * 
   * @type {T}
   * @memberof IResourceEvent
   */
  payload:T
}
export interface ITriggerEventPrams {
  collapsed?: boolean;
  menuList?: Array<MenuEntity>;
  router?:Array<IRouter>
}
/**  菜单折叠事件分发*/

export const CollapsedResource = resource('Menu/resource/collapsed');// index.d.ts

/** 管理菜单及页签缓存事件 */
export const MenuPanesStorageResource =  resource('storage/resource/menu/tabPanes');
/**  面包屑事件分发器*/
export const BreadCrumbsResourceEven =  resource('Menu/resource/BreadCrumbs');