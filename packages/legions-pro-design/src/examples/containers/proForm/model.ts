/*
 * @Author: duanguang
 * @Date: 2021-01-15 15:42:07
 * @LastEditTime: 2021-11-11 00:00:22
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/proForm/model.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { FormRuleProperty } from 'legions-decorator/async.validator';
import { IBaseFormFields,LegionsLabeledValue } from 'legions-lunar/model';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { LegionsProForm } from '../../../components';
interface IFormFieldUserRenderInput1 {
    currency: string,
    /** 只读 */
    number: number
}
export function create(): IFormFieldUserRenderInput1 {
    return {
        currency: 'string',
        number: 1
    }
}

export class FormFields extends LegionsProForm.ProFormFields {
    @FormRuleProperty({
        required: true,
        name: 'text',
        error: '文本框',
        desc: '文本框',
        type: 'string',
        requestParamKey:'ss'
    })
    text: string=void 0
    @FormRuleProperty({
        required: true,
        name: 'textarea',
        error: '多行文本',
        desc: '多行文本',
        type: 'string',
    })
    textarea: string=void 0
    @FormRuleProperty({
        required: true,
        name: 'password',
        error: '密码文本',
        desc: '密码文本',
        type: 'string',
    })
    password: string=void 0
    @FormRuleProperty({
        required: true,
        name: 'numberText',
        error: '数字文本',
        desc: '数字文本',
        type: 'string',
    })
    numberText: string
    @FormRuleProperty({
        required: true,
        name: 'numbers',
        error: '数字',
        desc: '数字',
        type: 'number',
    })
    numbers: number=void 0
    @FormRuleProperty({
        required: true,
        name: 'selectedItem',
        error: '普通下拉',
        desc: '普通下拉',
        type: 'object',
    })
    selectedItem: LegionsLabeledValue = void 0
    @FormRuleProperty({
        required: true,
        name: 'selectedItemRemote',
        error: '远程下拉',
        desc: '远程下拉',
        type: 'object',
    })
    selectedItemRemote: LegionsLabeledValue = void 0
    @FormRuleProperty({
        required: true,
        name: 'selectedItemMultiple',
        error: '下拉多选',
        desc: '下拉多选',
        type: 'array',
    })
    selectedItemMultiple: Array<LegionsLabeledValue> = void 0
    @FormRuleProperty({
        required: true,
        name: 'upload',
        error: '上传文件错误',
        desc: '上传文件',
        type: 'object',
    })
    upload: UploadChangeParam=void 0
    @FormRuleProperty({
        required: true,
        name: 'customRenderInput1',
        error: '自定义组件信息错误',
        desc: '自定义组件',
        type: 'string',
        regex: /^[1-9]\d*$/, // 自定义验证规则

    })
    customRenderInput1: string=void 0
    /**
     * 提交到表单数据接口需要数据
     * 不存在UI表单数据实体上面
     * 依赖表单其他UI数据计算而来
     * @type {IBaseFormFields<IFormFieldUserRenderInput1,{},FormFields>}
     * @memberof FormFields
     */
    customRender: IFormFieldUserRenderInput1 = {
        currency: 'rmb',
        number: 0,
    }
    /**
     * 单价类型
     *
     * @type {(IBaseFormFields<IFormFieldUserRenderInput1>)}
     * @memberof FormFields
     */
    @FormRuleProperty({
        required: true,
        name: 'priceType',
        error: '价格类型错误',
        desc: '价格类型',
        type: 'string',
    })
    priceType: string=void 0
    @FormRuleProperty({
        required: true,
        name: 'price',
        error: '价格只能是数字',
        desc: '价格',
        type: 'string',
        validator: (value: string,error,callback,props) => { // 自定义验证规则
            console.log(props,'props');
            const regex = /^[1-9]\d*$/; // 自定义验证规则
            if (!(regex.test(value.toString()))) {
                callback(new Error('价格请输入数字'));
            }
            else {
                callback();
            }
        },
    })
    price: string=void 0
    @FormRuleProperty({
        required: true,
        name: 'cascader',
        error: '级联',
        desc: '级联',
        type: 'array',
    })
    cascader: string[]=void 0
}
