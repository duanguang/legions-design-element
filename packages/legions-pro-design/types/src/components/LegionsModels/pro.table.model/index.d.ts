export declare class TableListColumns {
    dataIndex: string;
    title: string;
}
export declare class TableColumnsEntity {
    /**
     * 模块UID
     *
     * @memberof UserEntity
     */
    modulesUid: string;
    /**
     * 自定义列信息
     *
     * @memberof MenuEntity
     */
    customColumns: any[];
}
export interface ITableColumnsEntity {
    message: string;
    success: boolean;
    status: string;
    data: TableColumnsEntity;
    code?: string;
}
export declare class TableColumnsContainerEntity {
    /** *操作结果
       * @type {boolean}
       */
    success: boolean;
    /**
     * 描述信息
     *
     * @type {string}
     * @memberof BaseEntity
     */
    message: string;
    /**  提示信息编码
     * @type {(string|number)}
     */
    code: string | number;
    /**  返回数据信息
     * @type {T}
     * @memberof BaseEntity
     */
    result: TableColumnsEntity;
    constructor(fromJson?: ITableColumnsEntity);
    transformArray(rows: any, mapEntity: any): any;
    transformRows(rows: any, mapEntity: any): any;
    transformRow(row: any, mapEntity: any): import("json-mapper-object").IGenericObject;
}
