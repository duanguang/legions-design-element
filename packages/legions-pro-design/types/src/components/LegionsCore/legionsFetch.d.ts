import { ClassOf } from 'legions-lunar/api/typescript';
declare type HeadersPrams = {
    'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded';
};
interface options<Parameter, Model> {
    url: string;
    parameter: Parameter;
    headers?: HeadersPrams & {
        [key: string]: string;
    };
    /**
     *
     * 接口返回数据模型
     * @type {Model}
     * @memberof options
     */
    model: Model;
    catch?: (err: any) => void;
    onBeforTranform?: (response: any) => {
        model?: any;
        /** 服务端数据 */
        responseData: any;
        /** 映射数据至===>result */
        mappingEntity: (that: any, responseData: any) => void;
    };
}
export declare class LegionsFetch {
    private setHeaders;
    get<Model, Parameter>(options: options<Parameter, ClassOf<Model>>): Promise<Model>;
    post<Model, Parameter>(options: options<Parameter, ClassOf<Model>>): Promise<Model>;
}
export {};
