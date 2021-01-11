import { BaseEntity } from '../pro.base.model';
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
export declare class TableColumnsContainerEntity extends BaseEntity<TableColumnsEntity> {
    constructor(fromJson?: ITableColumnsEntity);
}
