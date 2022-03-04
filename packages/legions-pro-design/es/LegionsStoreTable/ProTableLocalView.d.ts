export declare class ProTableLocalView {
    /** 查询数据状态
     *
     * 在loading动画展示时使用
     */
    private _loading;
    /** 数据请求状态 */
    get computedLoading(): boolean;
    /** 更新动画状态,组件内部私有方法 */
    _setLoadingState(_loading: boolean): void;
}
