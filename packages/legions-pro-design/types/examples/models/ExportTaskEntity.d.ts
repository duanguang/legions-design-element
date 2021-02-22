export declare class ExportTaskEntity {
    /**
     * 企业UID
     *
     * @memberof UserEntity
     */
    companyUid: string;
    id: number;
    /**
     *创建人ID,
     *
     * @memberof MenuEntity
     */
    createrId: string;
    /**
     * 创建时间,
     *
     * @memberof MenuEntity
     */
    createTime: string;
    /**
     *导出名字
     *
     * @memberof MenuEntity
     */
    moduleName?: string;
    /**
     *导出开始时间,
     *
     * @memberof MenuEntity
     */
    startTime: string;
    /**
     * 导出完成时间
     *
     * @memberof ExportTaskEntity
     */
    finishTime: string;
    createrName: string;
    /**
     *
     * 导出状态: 0:未导出;1:导出中;2:已导出;3:导出结果已删除;4:导出错误,
     * @memberof ExportTaskEntity
     */
    state: string;
    get stateDesc(): string;
    get stateUI(): 'success' | 'processing' | 'default' | 'error' | 'warning';
    /**
     *
     * 导出结果地址,
     * @memberof ExportTaskEntity
     */
    filePath: string;
    /**
     *
     * 任务名称
     * @memberof ExportTaskEntity
     */
    taskName: string;
    version: string;
}
