/*
 * @Author: duanguang
 * @Date: 2022-02-28 15:45:54
 * @LastEditTime: 2022-03-01 15:40:34
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProLayout/store/MenuViewStore.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { observable } from 'legions/store';
import { legionsProLayoutInterface } from '../interface'
export class MenuViewStore {
  /**
   * logo 宽度
   */
  @observable logoWidth = 125;

  /** *
   *皮肤方案
   */
  @observable skin = '0';

  /**
   * 皮肤列表数据
   */
  @observable SkinList: legionsProLayoutInterface['skinModel'] = {
    '0': {
      color: '#484C72',
      skin: 'legions-pro-menu-them-dark-green',
      logoSkin: 'legions-pro-menu-them-dark-green-logo',
      theme: 'dark',
      width: 170,
      collapsedWidth: 65,
    },
    '1': {
      skin: 'legions-pro-menu-them-light-blue',
      color: '#212D32',
      logoSkin: 'legions-pro-menu-them-light-blue-logo',
      theme: 'dark',
      width: 170,
      collapsedWidth: 65,
    },
    '2': {
      skin: 'legions-pro-menu-them-2',
      color: '#fff',
      logoSkin: 'legions-pro-menu-them-2-logo',
      theme: 'light',
      width: 160,
      collapsedWidth: 65,
    },
    '3': {
      skin: 'legions-pro-menu-them-blue',
      color: '#015EA3',
      logoSkin: 'legions-pro-menu-them-blue-logo',
      theme: 'dark',
      width: 160,
      collapsedWidth: 40,
    },
  };

  /** 
   *菜单左右方向展开收起
   *
   *true 折叠,false 展开
   */
  @observable collapsed = false; //


  /** 是否固定侧边菜单 */
  @observable fixedSiderMenu = true;

  /** 是否固定头部区域 */
  @observable fixedHeader = true;

  getSkinInfos() {
    return this.SkinList[this.skin]
  }
}