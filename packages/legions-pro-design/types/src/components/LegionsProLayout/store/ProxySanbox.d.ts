import { legionsProLayoutInterface } from '../interface';
import { History } from '../../interface/history';
/** 沙箱页签活动类型 */
export declare enum SanboxTabActionMode {
    /** 新增 */
    add = 0,
    /** 删除 */
    delete = 1,
    /** 切换 */
    switch = 2
}
export declare class ProxySanbox {
    static SanboxTabActionMode: typeof SanboxTabActionMode;
    microSanboxApp: Map<string, import("../interface").microSanboxAppInterface>;
    /** 记录各个页签最后一次访问路径 */
    microSanboxRoute: Map<string, string>;
    history: History;
    isEnabledTabs: boolean;
    constructor(history: History);
    registerMicroApps(mountPane: legionsProLayoutInterface['panes']): void;
    mountSanboxMicroApp(mountPane: legionsProLayoutInterface['panes']): void;
    unmountSanboxMicroApp(unmoutPane: legionsProLayoutInterface['panes'], mountPane: legionsProLayoutInterface['panes']): void;
    switchTabPaneSanboxMicroApp(unmoutPane: legionsProLayoutInterface['panes'], mountPane: legionsProLayoutInterface['panes'], type?: SanboxTabActionMode): void;
    getRouterPath(pane: legionsProLayoutInterface['panes']): string;
    createMicroAppId(pane: legionsProLayoutInterface['panes']): string;
}
