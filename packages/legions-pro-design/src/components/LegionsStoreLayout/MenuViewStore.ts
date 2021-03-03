import { observable,action } from 'legions/store';
import { ISkinModel } from './interface';
export class MenuViewStore {
    /**
     * logo 宽度
     *
     * @memberof MenuViewStore
     */
    @observable logoWidth = 125;
  
    /**
     *
     *皮肤方案
     * @memberof MenuViewStore
     */
    @observable skin = '0';
  
    /**
     * 皮肤列表数据
     *
     * @type {ISkinModel}
     * @memberof MenuViewStore
     */
    @observable SkinList: ISkinModel = {
      '0': {
        color: '#484C72',
        skin: 'legions-pro-menu-them-dark-green',
        logoSkin: 'legions-pro-menu-them-dark-green-logo',
        theme: 'dark',
        width: 170,
        collapsedWidth:65,
      },
      '1': {
        skin: 'legions-pro-menu-them-light-blue',
        color: '#212D32',
        logoSkin: 'legions-pro-menu-them-light-blue-logo',
        theme: 'dark',
        width: 170,
        collapsedWidth:65,
      },
      '2': {
        skin: 'legions-pro-menu-them-2',
        color: '#fff',
        logoSkin: 'legions-pro-menu-them-2-logo',
        theme: 'light',
        width: 160,
        collapsedWidth:65,
      },
      '3': {
        skin: 'legions-pro-menu-them-blue',
        color: '#015EA3',
        logoSkin: 'legions-pro-menu-them-blue-logo',
        theme: 'dark',
        width: 160,
        collapsedWidth:40,
      },
    };
  
    /**
     * true 折叠
     * 
     * false 展开
     *菜单左右方向展开收起
     * @memberof MenuViewStore
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