(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1253:function(t,e){t.exports={content:["section",["p","ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。"],["h2","何时使用"],["p","当你的表格需要与服务端进行交互或者需要多种单元格样式时，ProTable 是不二选择。"]],meta:{category:"Components",cols:1,type:"数据展示",title:"ProTable",subtitle:"高级表格",filename:"src/components/LegionsProTable/index.zh-CN.md"},toc:["ul",["li",["a",{className:"bisheng-toc-h2",href:"#何时使用",title:"何时使用"},"何时使用"]],["li",["a",{className:"bisheng-toc-h2",href:"#API",title:"API"},"API"]]],api:["section",["h2","API"],["p","ProTable 在 antd 的 Table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Table 不同的 api。"],["p","按钮的属性说明如下："],["table",["thead",["tr",["th","属性"],["th","说明"],["th","类型"],["th","默认值"]]],["tbody",["tr",["td","uniqueKey"],["td","表格行 key 的取值，可以是字符串"],["td","string"],["td",'"id"']],["tr",["td","rowSelectionClickType"],["td","行单击选中方式(多选和单选)"],["td","'radio' ","|"," 'check'"],["td",["code","radio"]]],["tr",["td","type"],["td","行选中方式"],["td","'radio' ","|"," 'check'"],["td",["code","check"]]],["tr",["td",["a",{title:null,href:"#tableModulesName"},"tableModulesName"]],["td","table 模块名称，如果设置此值，请保持绝对唯一"],["td","string"],["td","-"]],["tr",["td","displayType"],["td","大数据量表格还是小量数据"],["td","'smallData' ","|"," 'bigData'"],["td",["code","smallData"]]],["tr",["td","size"],["td","设置按钮大小，可选值为 ",["code","small"]," ",["code","large"]," 或者不设"],["td","string"],["td",["code","default"]]],["tr",["td","isOpenCustomColumns"],["td","是否开启自定义列设置"],["td","boolean"],["td","false"]],["tr",["td","isOpenRowChange"],["td","是否开启行单击选中"],["td","boolean"],["td","false"]],["tr",["td","visibleExportLoacl"],["td","是否显示导出当前页"],["td","boolean"],["td","true"]],["tr",["td","selectedRowKeys"],["td","指定选中项的 key 数组"],["td","string[] ","|"," number[]"],["td","-"]],["tr",["td","isOpenRowSelection"],["td","是否开启行选中,只在初始化执行一次"],["td","boolean"],["td","false"]],["tr",["td","customColumnsConfig"],["td","开启自定义列数据同步接口信息-局部配置(当全局和局部存在冲突时，优先局部配置数据)"],["td","{editApi:string,queryApi:string}"],["td","-"]],["tr",["td","autoQuery"],["td","传入此配置信息将自动托管请求接口"],["td",["a",{title:null,href:"#ITableAutoQuery"},"ITableAutoQuery"]],["td","-"]],["tr",["td","onPagingQuery"],["td","分页事件(触发情况1：切换页码；情况2：切换每页条数)"],["td","(page: number,pageSize: number,isChangePageSize?: boolean)=>void"],["td","-"]],["tr",["td","onRowChange"],["td","选中项发生变化的时的回调"],["td","(selectedRows: TableRow[]) => void"],["td","-"]],["tr",["td","onReady"],["td","组件constructor 执行 并抛回部分数据及方法"],["td","(instance: ",["a",{title:null,href:"#InstanceProTable"},"InstanceProTable"],") => void"],["td","-"]]]],["h3","ITableAutoQuery"],["p","如果传入此函数，搜索方法会自动挂载到 onReady 函数变量上接收",["br"],"将不需要onPagingQuery 函数",["br"],"维护好搜索条件即可",["br"],"默认会在HLTable组件构造函数触发搜索方法，可以通过设置isDefaultLoad = false 来手动控制触发时机  "],["table",["thead",["tr",["th","属性"],["th","说明"],["th","类型"],["th","默认值"]]],["tbody",["tr",["td","params"],["td","查询参数"],["td","(pageIndex: number, pageSize: number) => Object"],["td","-"]],["tr",["td","ApiUrl"],["td","请求接口"],["td","string"],["td","-"]],["tr",["td","method"],["td","请求类型"],["td","'get' ","|"," 'post'"],["td","-"]],["tr",["td","options"],["td","headers 参数"],["td","HeadersPrams & { ",["span","key: string"],": string }&request.HeadersPrams"],["td","-"]],["tr",["td","mappingEntity"],["td","远程数据列表映射至that.result"],["td","(that:",["code","PageListEntity<Model>"],",responseData: any) => void"],["td","-"]],["tr",["td","token"],["td","授权令牌，一般泛指接口权限"],["td","string"],["td","-"]],["tr",["td","transform"],["td","表格绑定数据前转换符合表格数据结构的数据"],["td","(value: ",["code","observablePromise.PramsResult<PageListEntity<Model>>"],") => { total: number; data: ",["code","Array<any>"],";}"],["td","-"]],["tr",["td","isDefaultLoad"],["td","在表格组件装载时是否默认自动发送请求(",["code","不传入或者等于true时发送请求"],")"],["td","boolean"],["td","-"]]]],["h3","InstanceProTable"],["p","抛回梳理对象结构"],["table",["thead",["tr",["th","属性"],["th","说明"],["th","类型"],["th","默认值"]]],["tbody",["tr",["td","store"],["td","组件store数据"],["td",["a",{title:null,href:"https://github.com/duanguang/legions-design-element/blob/feature/pro-echarts/packages/legions-pro-design/types/components/store/pro.table/index.d.ts"},"ProTableStore"]],["td","-"]],["tr",["td","uid"],["td","组件唯一uid,只读"],["td","string"],["td","-"]],["tr",["td","viewModel"],["td","数据模型"],["td",["a",{title:null,href:"https://github.com/duanguang/legions-design-element/blob/feature/pro-echarts/packages/legions-pro-design/types/components/store/pro.table/interface/index.d.ts"},"IViewModelProTableStore"]],["td","-"]],["tr",["td","methods"],["td","暴露一些组件操作方法,如搜索，导出等"],["td",["a",{title:null,href:"https://github.com/duanguang/legions-design-element/blob/feature/pro-echarts/packages/legions-pro-design/types/components/LegionsProTable/interface.d.ts"},"IMethods"]],["td","-"]]]],["h3","tableModulesName"],["blockquote",["p","如果不设置，则系统自动生成，系统生成缺陷，当列配置顺序，值发生变化，之前缓存的信息就会自动失效.要求唯一原因，会根据此名称生成hash用作自定义列缓存信息键名"]],["style",'\n[id^="components-legionsproecharts-demo-"] .ant-btn {\n  margin-right: 8px;\n  margin-bottom: 12px;\n}\n[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {\n  margin-right: 0;\n}\n']]}}}]);