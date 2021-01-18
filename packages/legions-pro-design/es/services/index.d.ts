import { TableColumnsContainerEntity, TableListColumns } from '../models';
/**
 *
 * 编辑自定义table列信息
 * @export
 * @returns
 */
export declare function editTableColumns(modulesUid: string, customColumns: TableListColumns[], url: string): Promise<TableColumnsContainerEntity>;
export declare function queryTableColumns(modulesUid: string, url: string): Promise<TableColumnsContainerEntity>;
