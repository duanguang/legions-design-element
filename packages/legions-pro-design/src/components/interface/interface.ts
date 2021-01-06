/*
 * @Author: duanguang
 * @Date: 2020-12-10 15:31:01
 * @LastEditTime: 2021-01-06 13:47:25
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/interface/interface.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { MenuEntity } from '../models/pro.menu.model';
import { IPanes } from './pro.store';
/**
 *  使用 typescript 有时候需要重写一个库提供的 interface 的某个属性，但是重写 interface 有可能会导致冲突：
 *  原理是，将 类型 T 的所有 K 属性置为 any，
 然后自定义 K 属性的类型，
 由于任何类型都可以赋予 any，所以不会产生冲突
*/
export type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};
/**
 * 移除 T 中的 U 属性

type A = Exclude<'a'|'b'|'c'|'d' ,'b'|'c'|'e' >  // 'a' | 'd'
*/
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IUserInfo<U = {}> {
  userEntity?: {
    userName: string;
    userUid: string;
    companyName?: string;
    companyUid?: string;
    /** 接口返回的原始用户信息 */
    rowData?: U;
  };
}

export interface IWindow<U = {}> {
  /** 打开菜单页签，可只传递菜单key */
  readonly openTabPane?: (pane: {
    key: string;
    keyPath?: string[];
    title?: string;
    path?: string;
    params?: { [x: string]: string };
    forceRefresh?: boolean;
  }) => void;
  /** 关闭菜单页签 */
  readonly removeTablePane?: (targetKey: string | string[]) => void;
  /** 获取用户信息 */
  readonly userInfo?: IUserInfo<U>['userEntity'];

  readonly menuList?: MenuEntity[];
}

export type loggerType =
  | 'hlTable-constructor'
  | 'hlTable-watchData'
  | 'hlTable-componentWillMount'
  | 'hlTable-componentWillUnmount'
  | 'hlTable-componentDidMount'
  | 'hlTable-componentDidUpdate'
  | 'hlTable-componentWillReceiveProps'
  | 'hlTable-render'
  | 'hlFormContainer-constructor'
  | 'hlFormContainer-watchData'
  | 'hlFormContainer-componentWillMount'
  | 'hlFormContainer-componentWillUnmount'
  | 'hlFormContainer-componentDidMount'
  | 'hlFormContainer-componentDidUpdate'
  | 'hlFormContainer-componentWillReceiveProps'
  | 'hlFormContainer-render'
  | 'hlFormContainer-validateFields'
  | 'uiStore';

export interface ILegionsPluginDataOrigin {
  /** 表格组件关键点函数埋点函数，如果需要调试各个节点输出信息，就请注入。 系统级别私有方法 */
  onHLTableCycle?: (value: Object, type: loggerType) => void;
  /** 表单组件关键点函数埋点函数，如果需要调试各个节点输出信息，就请注入。 系统级别私有方法 */
  onHLFormCycle?: (value: Object, type: loggerType) => void;
  /** 系统级别私有方法, 其他成员调用前先咨询 */
  openBrowserUpdateMessage?: () => void;
  /** 操作记录上报函数， 系统级别私有方法, 其他成员调用前先咨询 */
  loggerReport?: (value: Object, type: loggerType) => void;
  /** 打开系统菜单页签 */
  onSysOpenTabPane?: IWindow['openTabPane'];
  /** 移除系统菜单页签 */
  onSysRemoveTablePane?: IWindow['removeTablePane'];
  /** 获取用户信息, 请勿直接修改 */
  readonly sysUserInfos?: IUserInfo['userEntity'];
}
export interface IGlobalStateEvent{
  name: string;
  scope: string;
}
export interface IGlobalUserInfo<U>{
  userName:string
  userUid: string;
  companyName?: string,
  companyUid?: string,
  /** 接口返回的原始用户信息 */
  rowData?: U;
}
export interface IGlobalStates{
  methods?: {
      /** 打开菜单页签，可只传递菜单key */
      openTabPane?: (pane: { key: string; keyPath?: string[]; title?: string; path?: string, params?: {[x:string]: string}, forceRefresh?: boolean }) => void;
      /** 关闭菜单页签 */
      removeTablePane?: (targetKey: string | string[]) => void;
  },
  menuList?: MenuEntity[];
  user?: IGlobalUserInfo<any>
}
interface IOperation {
  name: string;
  scope: string;
}
export interface IResource {
  created: IOperation;
  events: string[];
  name: string;
  removed: IOperation;
  updated: IOperation;
}
export type typeOpenPaneParames=Pick<IPanes,'key' | 'title' | 'path' | 'params' | 'forceRefresh'> & { keyPath?: Array<string> }