import { LegionsProForm } from 'legions-pro-design';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { IBaseFormFields, HlLabeledValue } from 'legions-lunar/model';
export declare class FormFields extends LegionsProForm.ProFormFields<FormFields> {
    text: IBaseFormFields<string>;
    textarea: IBaseFormFields<string>;
    password: IBaseFormFields<string>;
    numberText: IBaseFormFields<string>;
    numbers: IBaseFormFields<number>;
    selectedItem: IBaseFormFields<HlLabeledValue>;
    selectedItemRemote: IBaseFormFields<HlLabeledValue>;
    selectedItemMultiple: IBaseFormFields<Array<HlLabeledValue>>;
    upload: IBaseFormFields<UploadChangeParam>;
    customRenderInput1: IBaseFormFields<string>;
    /**
     * 提交到表单数据接口需要数据
     * 不存在UI表单数据实体上面
     * 依赖表单其他UI数据计算而来
     * @type {IBaseFormFields<IFormFieldUserRenderInput1,{},FormFields>}
     * @memberof FormFields
     */
    customRender: IBaseFormFields<any, {}, FormFields>;
    /**
     * 单价类型
     *
     * @type {(IBaseFormFields<IFormFieldUserRenderInput1>)}
     * @memberof FormFields
     */
    priceType: IBaseFormFields<string>;
    price: IBaseFormFields<string>;
    constructor(form?: FormFields);
}
