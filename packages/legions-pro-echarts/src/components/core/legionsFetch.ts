/*
 * @Author: duanguang
 * @Date: 2020-12-14 16:26:10
 * @LastEditTime: 2020-12-14 16:37:23
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/core/legionsFetch.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { get,post } from 'legions/fetch';
import { request } from 'legions/request';

interface options<Parameter, Model> {
    url: string;
    parameter: Parameter;
    headers?: request.HeadersPrams;

    /**
     *
     * 接口返回数据模型
     * @type {Model}
     * @memberof options
     */
    model: Model;
    catch?: (err: any) => void;
}
export class LegionsFetch{
    private setHeaders(url: string, option?: request.HeadersPrams) {
        let options = {
            headers: {
                'api-target': url,
                'api-cookie': '',
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'Pragma':'no-cache',
            },
        };
        if (option) {
            options.headers = { ...options.headers, ...option }
        }
        return options;
    }
    get<Model, Parameter>(options: options<Parameter, Model>): Promise<Model> {
        const headerOptions = this.setHeaders(options.url, options.headers);
        // @ts-ignore
        return get(options.url,options.parameter || null,headerOptions)
            .then(result => {
                // @ts-ignore
                return new options.model(result);
            })
            .catch(err => {
                options.catch && options.catch(err);
            });
    }
    post<Model, Parameter>(options: options<Parameter, Model>): Promise<Model> {
        const headerOptions = this.setHeaders(options.url,options.headers);
        // @ts-ignore
        return post(options.url, options.parameter || null, headerOptions)
            .then(result => {
                // @ts-ignore
                return new options.model(result);
            })
            .catch(err => {
                options.catch && options.catch(err);
            });
    }
}