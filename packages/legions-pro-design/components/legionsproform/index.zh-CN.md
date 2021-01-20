---
category: Components
cols: 1
type: 数据展示
title: LegionsProForm
subtitle: 高级表单
---

ProForm 在原来的 Form 的基础上增加一些语法糖和更多的布局设置，帮助我们快速的开发一个表单。同时添加一些默认行为，让我们的表单默认好用。

分步表单，Modal 表单，Drawer 表单等多种 layout 可以覆盖大部分的使用场景，脱离复杂而且繁琐的表单布局工作，更少的代码完成更多的功能。


## 何时使用

当你的表单需要与服务端进行交互，且比较表单相对大时，ProForm 是不二选择。

## API

ProForm 在 antd 的 antd Form 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Form 不同的 api。

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| group | 	表单信息分组展示| [IGroup](#IGroup)[] | [] |
| controls | 表单元素配置项 | Array | [] |
| InputDataModel | 表单输入数据模型,通常是一个类 |Function|-|
| colCount | 等分栅格 默认2 | 1 \| 2 \| 3 \| 4| 2 |
| size | 表单大小舒适,迷你,紧凑 | 'default' \| 'small'\|'table' | `default` |
| uniqueKeys | 主要用于当父组件中存在多个表单组件时，标记key 来保证父级组件中表单组件唯一,可选 | string | - |
| onUpdateStyleSize | 改变表单大小时触发 | Function(size:'default' \| 'small'\|'table') | - |
| onReady | 获取表单数据模型 | Function((form: WrappedFormUtils,formRef: InstanceForm) | - |
| onValuesChange | 任一表单域的值发生改变时的回调 | Function((props,values) | - |
| onFieldsChange | 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 mobx store or redux store| Function(props: mapProps,fields) | - |
| mapPropsToFields | *把父组件的属性映射到表单项上（可用于把 Redux store 中的值读出）| Function(props: mapProps) => any | - |
| onIgnoreError | 忽略错误信息触发| Function((item: IErrorView) | - |

### IGroup
分组功能配置信息

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 	分组名称| string \| React.ReactNode | - |
| id | 分组唯一标识 | number | - |
| active | 活动分组 |boolean|-|
| isFolding | 是否折叠 | boolean| - |
| className | 分组样式名 | string | - |
| isShowSizeIcon | 是否显示设置主题风格图标 默认不显示, true 显示 | boolean| - |
## Model
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
