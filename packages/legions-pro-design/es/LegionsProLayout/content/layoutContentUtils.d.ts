import ContentPart from '.';
import React from 'react';
import LegionsCrossModule from '../../LegionsCrossModule';
import LegionsStoreLayout from '../store';
import { legionsProLayoutInterface } from '../interface';
export declare class LayoutContentUtils {
    static masterGlobalStateStore: InstanceType<typeof LegionsCrossModule.MasterGlobalStateStore>;
    /** 将对象转换为字符串拼接至url */
    static transHttpUrlByObj(url: string, object: object): string;
    /** 在传入的url 信息加生成的时间戳，主要用于清除iframe 加载页面缓存，无法拉取到更新后的JS，CSS资源 */
    static transHttpUrl(url: string, timeid: Number): string;
    /** 获取菜单页签path  */
    static getTabPanePath(pane: legionsProLayoutInterface['panes'], that: ContentPart): string;
    static renderTabPaneContent(pane: legionsProLayoutInterface['panes'], that: ContentPart): any;
    static renderTabPaneIframe(pane: legionsProLayoutInterface['panes'], that: ContentPart, src: string): JSX.Element;
    static renderTabPaneRouterComponent(pane: legionsProLayoutInterface['panes'], that: ContentPart, src: string): React.CElement<{}, React.Component<{}, any, any>>;
    static renderProxySanboxDom(pane: legionsProLayoutInterface['panes'], that: ContentPart, src: string, proxySanbox: InstanceType<typeof LegionsStoreLayout.ProxySanbox>): any;
    /** 沙箱单实例加载方式 */
    static loadMicroApp(pane: legionsProLayoutInterface['panes'], that: ContentPart, proxySanbox: InstanceType<typeof LegionsStoreLayout.ProxySanbox>): void;
}
