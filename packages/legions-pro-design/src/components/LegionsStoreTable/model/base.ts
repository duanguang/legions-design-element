/*
 * @Author: duanguang
 * @Date: 2022-02-28 18:10:01
 * @LastEditTime: 2022-02-28 18:10:02
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreTable/model/base.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { MapperEntity } from 'json-mapper-object';
export class BaseModel<T={}> {
    /** *操作结果 
     * @type {boolean}
     */
    success: boolean = true;

    /**
     * 描述信息
     *
     * @type {string}
     * @memberof BaseEntity
     */
    message: string = '';

    /**  提示信息编码
     * @type {(string|number)}
     */
    code: string | number = '';

    /**  返回数据信息
     * @type {T}
     * @memberof BaseEntity
     */
    result: T = null;
    transformArray(rows,mapEntity) {
        return (rows || []).map(row => {
            return this.transformRow(row,mapEntity);
        });
    }
    transformRows(rows,mapEntity) {
        return (rows || []).map(row => {
            return this.transformRow(row,mapEntity);
        });
    }
    transformRow(row,mapEntity): T {
        return MapperEntity(mapEntity,row);
    }
}