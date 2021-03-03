import LegionsModels from '../LegionsModels';
/**
 *
 * 编辑自定义table列信息
 * @export
 * @returns
 */
export declare function editTableColumns(modulesUid: string, customColumns: InstanceType<typeof LegionsModels.TableListColumns>[], url: string): Promise<import("../LegionsModels/pro.table.model").TableColumnsContainerEntity>;
export declare function queryTableColumns(modulesUid: string, url: string): Promise<import("../LegionsModels/pro.table.model").TableColumnsContainerEntity>;
