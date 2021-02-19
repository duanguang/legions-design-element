---
category: Components
cols: 1
type: 数据展示
title: ProConditions
subtitle: 筛选条件
---

ProConditions 主要用于列表页数据绑定时，需要根据筛选条件来过滤数据，这时就可以用此组件生成筛选条件布局。


- 尺寸大小设置
- 自动双向绑定
- 高性能
- 自动生成查询条件
- 支持自动管理远程下拉数据
- 响应式布局
- 更轻松管理筛选条件元素组件之间联动效果
- 可拖拽筛选条件元素项显示位置


## 何时使用

当你的列表页需要添加筛选条件时以及筛选条件量越大，交互效果复杂时，收益会更大，相信我，你会用的很爽。

## API

ProConditions 在 antd 的基础组件 上进行了一层封装，支持原基础组件所有属性设置，支持了一些预设，并且封装了一些行为。这里只列出与 antd 基础组件 不同的 api。

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| query | 	筛选条件配置数据| Array | [] |
| defaultCollapsed | 默认是否展开 折叠区域内容 | boolean | `true` |
| isDragSort | 拖拽排序 | boolean | `false` |
| uniqueKeys | 主要用于当父组件中存在多个筛选组件时，标记key 来保证父级组件中表单组件唯一,可选 | string | - |
| onDidMount | 组件完成渲染时执行，有DOM结构，执行的钩子函数 | Function(value:{height: number,uid: string}) | - |
| onReady | 获取筛选条件数据模型 | Function((value: IQueryConditionsInstance) | - |
| onCollapse | 收起按钮的事件 | Function(collapsed: boolean,viewStore?: IViewQueryConditionStore) | - |


