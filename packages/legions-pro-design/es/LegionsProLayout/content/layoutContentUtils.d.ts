import { IPanes } from '../../store/pro.layout/interface';
import ContentPart from '.';
import React from 'react';
import { ProxySanbox } from '../../store/pro.layout';
import { MasterGlobalStateStore } from '../../core/cross-module';
export declare class LayoutContentUtils {
    static masterGlobalStateStore: MasterGlobalStateStore;
    /** 将对象转换为字符串拼接至url */
    static transHttpUrlByObj(url: string, object: object): string;
    /** 在传入的url 信息加生成的时间戳，主要用于清除iframe 加载页面缓存，无法拉取到更新后的JS，CSS资源 */
    static transHttpUrl(url: string, timeid: Number): string;
    /** 获取菜单页签path  */
    static getTabPanePath(pane: IPanes, that: ContentPart): string;
    static renderTabPaneContent(pane: IPanes, that: ContentPart): any;
    static renderTabPaneIframe(pane: IPanes, that: ContentPart, src: string): JSX.Element;
    static renderTabPaneRouterComponent(pane: IPanes, that: ContentPart, src: string): React.CElement<unknown, React.Component<unknown, React.ComponentState>>;
    static renderProxySanboxDom(pane: IPanes, that: ContentPart, src: string, proxySanbox: ProxySanbox): any;
    static loadMicroApp(pane: IPanes, that: ContentPart, proxySanbox: ProxySanbox): void;
    /** 沙箱单实例加载方式 */
    static loadMicroApp2(pane: IPanes, that: ContentPart, proxySanbox: ProxySanbox): void;
}
