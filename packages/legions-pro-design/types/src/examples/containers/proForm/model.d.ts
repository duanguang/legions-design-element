import { UploadChangeParam } from 'antd/lib/upload/interface';
import { LegionsLabeledValue } from 'legions-lunar/model';
import { LegionsProForm } from '../../../components';
interface IFormFieldUserRenderInput1 {
    currency: string;
    /** 只读 */
    number: number;
}
export declare class FormFields extends LegionsProForm.ProFormFields {
    text: string;
    textarea: string;
    password: string;
    numberText: string;
    numbers: number;
    selectedItem: LegionsLabeledValue;
    selectedItemRemote: LegionsLabeledValue;
    selectedItemMultiple: Array<LegionsLabeledValue>;
    upload: UploadChangeParam;
    customRenderInput1: string;
    /**
     * 提交到表单数据接口需要数据
     * 不存在UI表单数据实体上面
     * 依赖表单其他UI数据计算而来
     * @type {IBaseFormFields<IFormFieldUserRenderInput1,{},FormFields>}
     * @memberof FormFields
     */
    customRender: IFormFieldUserRenderInput1;
    /**
     * 单价类型
     *
     * @type {(IBaseFormFields<IFormFieldUserRenderInput1>)}
     * @memberof FormFields
     */
    priceType: string;
    price: string;
    cascader: string[];
}
export {};
