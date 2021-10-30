/*
 * @Author: duanguang
 * @Date: 2020-12-14 16:26:10
 * @LastEditTime: 2021-09-06 23:56:46
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCore/legionsFetch.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { get,post,legionFetch } from 'legions/fetch';
type HeadersPrams = {
    'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded'
}
let legionFetchInstance = legionFetch.create();
legionFetchInstance.register({ 
    request: (configs) => { 
        /* const credential:'same-origin'|'include'|'omit'='include' */
        const { credentials,...props } = configs;
        return { ...props, /* ...{ mode: 'no-cors' } */};
    }
})
interface options<Parameter, Model> {
    url: string;
    parameter: Parameter;
    headers?: HeadersPrams;

    /**
     *
     * 接口返回数据模型
     * @type {Model}
     * @memberof options
     */
    model:  Model;
    catch?: (err: any) => void;
    onBeforTranform?:(response:any)=>{
        model?: any,
        /** 服务端数据 */
        responseData: any;
        /** 映射数据至===>result */
        mappingEntity: (that: any,responseData: any) => void;
    }
}
export class LegionsFetch{
    private setHeaders(url: string, option?: HeadersPrams) {
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
    get<Model, Parameter>(options: options<Parameter, ClassOf<Model>>): Promise<Model> {
        const headerOptions = this.setHeaders(options.url,options.headers);
        // @ts-ignore
        return legionFetchInstance.get(options.url,options.parameter || null,headerOptions)
            .then(result => {
                let newResult = result;
                if (typeof options.onBeforTranform === 'function') {
                    newResult=options.onBeforTranform(result)
                }
                // @ts-ignore
                return new options.model(newResult);
            })
            .catch(err => {
                options.catch && options.catch(err);
            });
    }
    post<Model, Parameter>(options: options<Parameter, ClassOf<Model>>): Promise<Model> {
        const headerOptions = this.setHeaders(options.url,options.headers);
        // @ts-ignore
        return legionFetchInstance.post(options.url, options.parameter || null, headerOptions)
            .then(result => {
                let newResult = result;
                if (typeof options.onBeforTranform === 'function') {
                    newResult=options.onBeforTranform(result)
                }
                // @ts-ignore
                return new options.model(newResult);
            })
            .catch(err => {
                options.catch && options.catch(err);
            });
    }
}