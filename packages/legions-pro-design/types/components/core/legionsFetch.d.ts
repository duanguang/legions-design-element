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
export declare class LegionsFetch {
    private setHeaders;
    get<Model, Parameter>(options: options<Parameter, Model>): Promise<Model>;
    post<Model, Parameter>(options: options<Parameter, Model>): Promise<Model>;
}
export {};
