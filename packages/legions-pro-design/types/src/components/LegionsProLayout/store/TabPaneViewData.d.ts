export declare class TabPaneViewData {
    /**
     * 页签生成时间戳信息
     *
     */
    tabPanesTimestamp: import("mobx").ObservableMap<string, any>;
    /**
     *
     * 更新相关页签时间戳信息
     */
    updateTimestamp(panesKey: string, timeStamp?: number): void;
}
