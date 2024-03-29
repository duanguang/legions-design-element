/*
 * @Author: duanguang
 * @Date: 2021-01-19 17:47:07
 * @LastEditTime: 2021-08-11 23:49:03
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/demoTest/model.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import LegionsProForm from '../';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { FormRuleProperty } from 'legions-decorator/async.validator';
import { IBaseFormFields,HlLabeledValue } from 'legions-lunar/model';
interface IFormFieldUserRenderInput1{
    currency: string,
    /** 只读 */
    number:number
}
export class FormFields extends LegionsProForm.ProFormFields<FormFields>{
    @FormRuleProperty({
		required: true,
		name: 'text',
		error: '文本框',
		desc: '文本框',
		type:'string',
	})
	text: IBaseFormFields<string> = {
		value:'',
    }
    @FormRuleProperty({
		required: true,
		name: 'textarea',
		error: '多行文本',
		desc: '多行文本',
		type:'string',
	})
	textarea: IBaseFormFields<string> = {
		value:'',
    }
    @FormRuleProperty({
		required: true,
		name: 'password',
		error: '密码文本',
		desc: '密码文本',
		type:'string',
	})
	password: IBaseFormFields<string> = {
		value:'',
    }
    @FormRuleProperty({
        required: true,
        name: 'numberText',
        error: '数字文本',
        desc: '数字文本',
        type:'string',
    })
    numberText: IBaseFormFields<string> = {
        value:'',
    }
    @FormRuleProperty({
        required: true,
        name: 'numbers',
        error: '数字',
        desc: '数字',
        type:'number',
    })
    numbers: IBaseFormFields<number> = {
        value:void 0,
    }
    @FormRuleProperty({
        required: true,
        name: 'selectedItem',
        error: '普通下拉',
        desc: '普通下拉',
        type:'object',
    })
    selectedItem: IBaseFormFields<HlLabeledValue> = {
        value:void 0,
    }
    @FormRuleProperty({
        required: true,
        name: 'selectedItemRemote',
        error: '远程下拉',
        desc: '远程下拉',
        type:'object',
    })
    selectedItemRemote: IBaseFormFields<HlLabeledValue> = {
        value:void 0,
    }
    @FormRuleProperty({
        required: true,
        name: 'selectedItemMultiple',
        error: '下拉多选',
        desc: '下拉多选',
        type:'array',
    })
    selectedItemMultiple: IBaseFormFields<Array<HlLabeledValue>> = {
        value:void 0,
    }
    @FormRuleProperty({
        required: true,
        name: 'upload',
        error: '上传文件错误',
        desc: '上传文件',
        type:'object',
    })
    upload:IBaseFormFields<UploadChangeParam>= {
        value: null,
        submitBeforeTransform: (value) => {
            if (value) {
                return value.file.uid;  // 随便选取的数据，在真实业务中，取附件服务端存储网络地址
            }
            return ''
        },
    }
    @FormRuleProperty({
        required: true,
        name: 'customRenderInput1',
        error: '自定义组件信息错误',
        desc: '自定义组件',
        type:'string',
        regex:/^[1-9]\d*$/, // 自定义验证规则

    })
    customRenderInput1:IBaseFormFields<string>= {
        value:'',
    }
    /**
     * 提交到表单数据接口需要数据
     * 不存在UI表单数据实体上面
     * 依赖表单其他UI数据计算而来
     * @type {IBaseFormFields<IFormFieldUserRenderInput1,{},FormFields>}
     * @memberof FormFields
     */
    customRender: IBaseFormFields<IFormFieldUserRenderInput1,{},FormFields>= {
        value:{
            currency:'rmb',
            number:0,
        },
        submitBeforeTransform: (value,formValue) => {
            let newValue = value;
            newValue.currency = formValue.priceType.value;
            newValue.number = parseInt(formValue.price.value,0);
            return newValue
        },
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
        type:'string',
    })
    priceType:IBaseFormFields<string>= {
        value: '',
        ignore: true,
    }
    @FormRuleProperty({
        required: true,
        name: 'price',
        error: '价格只能是数字',
        desc: '价格',
        type:'string',
        validator: (value: string,error,callback,props) => { // 自定义验证规则
            console.log(props,'props');
            const regex=/^[1-9]\d*$/; // 自定义验证规则
            if(!(regex.test(value.toString()))){
                callback(new Error('价格请输入数字'));
            }
            else{
                callback();
            }
        },
    })
    price:IBaseFormFields<string>= {
        value: '',
        ignore: true,
        }
    @FormRuleProperty({
        required: true,
        name: 'cascader',
        error: '级联',
        desc: '级联',
        type:'array',
    })
    cascader:IBaseFormFields<string[]>= {
        value: void 0,
        ignore: true,
    }
    constructor(form?: FormFields) {
        super()
        FormFields.initMapPropsToFields.call(this, form)
    }
}
