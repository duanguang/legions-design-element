---
category: Components
cols: 1
type: 数据展示
title: LegionsProForm
subtitle: 高级表单
---

ProForm 的诞生是为了解决项目中需要写很多 form 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。


## 何时使用

当你的表单需要与服务端进行交互，且比较表单相对大时，ProForm 是不二选择。

## API

ProTable 在 antd 的 Table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Table 不同的 api。

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| uniqueKey | 	表格行 key 的取值，可以是字符串| string | "id" |
| rowSelectionClickType | 行单击选中方式 | 'radio' \| 'check' | `radio` |
| type | 行选中方式 | 'radio' \| 'check' |`check` |
| tableModulesName | table 模块名称，如果设置此值，请保持绝对唯一 | string| - |
| displayType | 大数据量表格还是小量数据 | 'smallData' \| 'bigData' | `smallData` |
| size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `default` |
| isOpenCustomColumns | 是否开启自定义列设置 | boolean | false |
| isOpenRowChange | 是否开启行单击选中 | boolean | false |
| isOpenRowSelection | 是否开启行选中,只在初始化执行一次 | boolean | false |

### Model
```js
import { LegionsProForm } from 'legions-pro-design';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { FormRuleProperty } from 'legions-decorator/async.validator';
import { IBaseFormFields,HlLabeledValue } from 'legions-lunar/model';
import { ClassOf } from 'legions-lunar/types/api/typescript';
class FormFields extends LegionsProForm.ProFormFields<FormFields>{
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
        validator:(value:string,error,callback)=>{ // 自定义验证规则
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
    constructor(form?: FormFields) {
        super()
        FormFields.initMapPropsToFields.call(this, form)
    }
}
```

<style>
[id^="components-legionsproecharts-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
