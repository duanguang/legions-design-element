---
category: Components
cols: 1
type: 数据展示
title: ProTable
subtitle: 高级表格
---

ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。


## 何时使用

当你的表格需要与服务端进行交互或者需要多种单元格样式时，ProTable 是不二选择。

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

### tableModulesName
> 如果不设置，则系统自动生成，系统生成缺陷，当列配置顺序，值发生变化，之前缓存的信息就会自动失效.要求唯一原因，会根据此名称生成hash用作自定义列缓存信息键名

<style>
[id^="components-legionsproecharts-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
