---
category: Components
cols: 1
type: 数据展示
title: ProBaiduMap
subtitle: 百度地图
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
| rowSelectionClickType | 行单击选中方式(多选和单选) | 'radio' \| 'check' | `radio` |
| type | 行选中方式 | 'radio' \| 'check' |`check` |
| [tableModulesName](#tableModulesName)| table 模块名称，如果设置此值，请保持绝对唯一 | string| - |
| displayType | 大数据量表格还是小量数据 | 'smallData' \| 'bigData' | `smallData` |
| size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `default` |
| isOpenCustomColumns | 是否开启自定义列设置 | boolean | false |
| isOpenRowChange | 是否开启行单击选中 | boolean | false |
|visibleExportLoacl| 是否显示导出当前页|boolean|true|
|selectedRowKeys|指定选中项的 key 数组|string[] \| number[]|-|
| isOpenRowSelection | 是否开启行选中,只在初始化执行一次 | boolean | false |
|customColumnsConfig|开启自定义列数据同步接口信息-局部配置(当全局和局部存在冲突时，优先局部配置数据)|{editApi:string,queryApi:string}|-|
|autoQuery|传入此配置信息将自动托管请求接口|[ITableAutoQuery](#ITableAutoQuery)|-|
|onPagingQuery|分页事件(触发情况1：切换页码；情况2：切换每页条数)|(page: number,pageSize: number,isChangePageSize?: boolean)=>void|-|
|onRowChange|选中项发生变化的时的回调|(selectedRows: TableRow[]) => void|-|
|onReady|组件constructor 执行 并抛回部分数据及方法|(instance: [InstanceProTable](#InstanceProTable)) => void|-|

### ITableAutoQuery
如果传入此函数，搜索方法会自动挂载到 onReady 函数变量上接收  
将不需要onPagingQuery 函数  
维护好搜索条件即可  
默认会在HLTable组件构造函数触发搜索方法，可以通过设置isDefaultLoad = false 来手动控制触发时机  

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|params|查询参数|(pageIndex: number, pageSize: number) => Object|-|
|ApiUrl| 请求接口|string|-|
|method|请求类型|'get' \| 'post'|-|
|options|headers 参数|HeadersPrams & { [key: string]: string }&request.HeadersPrams|-|
|mappingEntity|远程数据列表映射至that.result|(that:` PageListEntity<Model>`,responseData: any) => void|-|
|token|授权令牌，一般泛指接口权限|string|-|
|transform|表格绑定数据前转换符合表格数据结构的数据|(value: `observablePromise.PramsResult<PageListEntity<Model>>`) => { total: number; data: `Array<any>`;}|-|
|isDefaultLoad|在表格组件装载时是否默认自动发送请求(`不传入或者等于true时发送请求`)|boolean|-|
### InstanceProTable
抛回梳理对象结构

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| store | 	组件store数据| [ProTableStore](https://github.com/duanguang/legions-design-element/blob/feature/pro-echarts/packages/legions-pro-design/types/components/store/pro.table/index.d.ts) | - |
| uid | 组件唯一uid,只读 | string | - |
| viewModel | 数据模型 |[IViewModelProTableStore](https://github.com/duanguang/legions-design-element/blob/feature/pro-echarts/packages/legions-pro-design/types/components/store/pro.table/interface/index.d.ts)|-|
| methods | 暴露一些组件操作方法,如搜索，导出等 | [IMethods](https://github.com/duanguang/legions-design-element/blob/feature/pro-echarts/packages/legions-pro-design/types/components/LegionsProTable/interface.d.ts)| - |
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
