---
category: Components
cols: 1
type: 数据展示
title: ProTableForm
subtitle: 表格表单
---

ProTableForm的诞生是为了解决项目中表格嵌套表单等业务场景的逻辑问题。

## 何时使用

当遇到表格嵌套表单等业务交互时，ProTableForm是不二之选。

## API

ProTableForm是在ProTable和ProForm的基础上进行二次封装，具备了ProTable及ProForm的行为并增加了自身特有的行为。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| proFormConfig | proForm配置，只需要传入controls，组件会根据表单字段名称自动匹配并生成可编辑表格，无需配置mapPropsToFields和onFieldsChange，本组件已托管，暂不支持select下拉请求托管 | [IProTableFormConfig](#IProTableFormConfig) | - |
| proTableConfig | proTable配置 | [IProTableProps](http://192.168.200.132:8026/components/legionsprotable-cn/#API) | - |
| style | 容器样式 | React.CSSProperties | - |
| className | 容器类名 | string | - |
| onChange | 数据变化监听 | (dataList: []) => void = () => void 0 | - |
### IProTableFormConfig
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onReady | 获取表单数据模型，form  即将废弃，请使用formRef.viewModel.form 获取，其中formRef挂载updateRecordEditData方法供给表格表单更新数据  | (form: WrappedFormUtils,formRef?: InstanceProForm) => void; | - |
| controls | 表单元素配置项 | Array | [] |

## Model
```js
import { FormRuleProperty } from 'legions-decorator/async.validator';
import { LegionsProForm } from 'legions-pro-design';
import { IAntdRule } from 'legions-lunar/types/antd/form';
export class TableFormDemoField extends LegionsProForm.ProFormFields<TableFormDemoField> {
  /** input */
  @FormRuleProperty({
    required: true,
    name: 'input',
    error: '',
    desc: '文本框',
  })
  input:IAntdRule[] = void 0;

  /** select */
  @FormRuleProperty({
    required: true,
    name: 'select',
    error: '',
    desc: '下拉框',
  })
  select: IAntdRule[]=void 0

  @FormRuleProperty({
    required: true,
    name: 'data',
    error: '',
    desc: '日期',
    type: 'object'
  })
  date: IAntdRule[] = void 0;
  constructor() {
    super();
  }
}
```
