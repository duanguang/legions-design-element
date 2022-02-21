/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:59:54
 * @LastEditTime: 2022-02-21 11:03:37
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreLayout/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
export interface IPanes {
  key: string;
  keyPath?: string | string[];
  path: string;
  title: string;
  activeRouter?: string;
  content?: string;
  closable?: boolean;
  /** 页签内容加载方式:1：sandbox沙箱加载 2：iframe 3: React路由组件加载方式; 默认统一iframe */
  loadingMode: 'sandbox' | 'iframe' | 'routerCompeont';
  /** 单应用路由模式,可选参数,不传默认为history */
  router?:'history'|'hash'
  sandbox: {
    /** 应用名称 */
    appName: string;
    /** 应用入口链接 */
    appEntiy: string;
    /** 应用根节点标签Id信息  */
    appRootId: string;
    experimentalStyleIsolation: boolean;
    isMerge: boolean;
    props?: any;
  };
  params?: {
    [x: string]: string;
  };
  forceRefresh?: boolean;
  /** 在渲染页面(iframe,sanbox,routerComponent)之前调用，可对页签对象进行自定义操作 */
  beforeLoad?: (pane: IPanes) => IPanes;
  /** 打开页面后，执行该函数 */
  afterLoad?: (value: { pane: IPanes; iframe?: HTMLIFrameElement }) => void;
}
export interface ISkinModel {
  [propName: string]: {
    color: string;
    skin: string;
    logoSkin: string;
    theme: 'light' | 'dark';
    width: number;
    /** 菜单收起时宽度 */
    collapsedWidth: number;
  };
}