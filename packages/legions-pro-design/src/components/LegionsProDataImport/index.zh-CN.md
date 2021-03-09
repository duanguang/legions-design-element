---
category: Components
order: 0
cols: 1
type: 数据展示
title: ProDataImport
subtitle: 数据导入
---

ProDataImport的诞生是为了统一用户导入行为

## 何时使用

当用户需要对导入的数据做预处理的时候使用，如：展示错误信息，删除错误信息，导出错误信息，覆盖导入等

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableProps | 表格配置项, 配置项参考是HLTable 不要配置data，表格data已被托管 | `Partial<IProTableProps<TableRow,Model>> & { uniqueKey: string }` | `{ uniqueKey: '' }` |
| templateUrl | 模板地址，不传递该参数，模板下载按钮将置灰 | `string` | - |
| uploadProps | 上传按钮配置项, 配置项参考是HLUpload，本地开发注意配置代理 | `IProUploadProps` | `{}` |
| uploadDataTransform | 上传成功后的数据处理 | `(reponse?: any,localData?: any[]) => TableRow[] | Promise<TableRow[]>` | - |
| deleteModalProps | 覆盖删除按钮弹窗配置 | `Parameters<typeof OpenConfirm>[0]` | `{}` |
| style | 容器样式 | `React.CSSProperties` | |
| className | 容器类名 | `string` | `''` |
| hideBtnList | 可配置需要隐藏的按钮列表 | `ProDataImportBtnEnum[]` | `[]` |
| customBtn | 自定义添加其他按钮，会追加在所有操作按钮的最后面 | `React.ReactNode` | |
| errorFileName | 导出错误数据的文件名称，默认'错误数据' | `string` | `错误数据` |
| errorFileColumns | 自定义导出错误数据的列配置，默认会使用表格的columns，在表格配置不满足导入需求时可用该属性代替 | `ColumnProps<TableRow>[]` | `[]` |
| submitBtnLoading | 提交按钮loading状态 | `boolean` | `false` |
| onSubmit | 提交 | (data?: `TableRow[]) => void` | - |
| onBack | 返回，默认window.history.back() | `() => void` | `() => window.history.back()` |
| onReady | 获取组件数据实体 | `(instance: InstanceProDataImport<TableRow>) => void` | - |
