import { ContainerEntity } from '../models/common/baseEntity';
/**
 *
 * 获取菜单信息
 * @export
 * @returns
 */
export declare function getMenuList(): Promise<any>;
/**
 * 删除异步任务
 * @param id 任务id
 */
export declare function exportTaskDeleteService(ids: string): Promise<void | ContainerEntity<object>>;
