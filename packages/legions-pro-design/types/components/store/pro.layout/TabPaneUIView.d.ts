export declare class TabPaneUIView {
    /**
     * 页签生成时间戳信息
     *
     * @memberof TabPaneUIView
     */
    tabPanesTimestamp: import("mobx").ObservableMap<number>;
    /**
     *
     * 更新相关页签时间戳信息
     * @memberof TabPaneUIView
     */
    updateTimestamp(panesKey: string, timeStamp?: number): void;
}
