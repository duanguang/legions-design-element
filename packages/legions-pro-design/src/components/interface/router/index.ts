/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:25:05
 * @LastEditTime: 2021-01-07 16:25:06
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/interface/router/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
export interface IRouter {
    path: string;
    key?: string;
    component: any;
}