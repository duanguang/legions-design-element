(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{1241:function(n,s){n.exports={content:["section",["p","ProForm 在原来的 Form 的基础上增加一些语法糖和更多的布局设置，帮助我们快速的开发一个表单。同时添加一些默认行为，让我们的表单默认好用。"],["p","分步表单，Modal 表单，Drawer 表单等多种 layout 可以覆盖大部分的使用场景，脱离复杂而且繁琐的表单布局工作，更少的代码完成更多的功能。"],["ul",["li",["p","单尺寸大小设置"]],["li",["p","表单数据自动双向绑定"]],["li",["p","高性能"]],["li",["p","表单分组显示"]],["li",["p","表单回车或上下键切换聚焦元素"]],["li",["p","表单支持自动管理远程下拉数据并进行缓存"]],["li",["p","支持自定义表单元素项组件"]],["li",["p","更轻松管理表单元素组件之间联动效果"]],["li",["p","基于antd Form封装，支持antd  Form.item 所有属性"]],["li",["p","可拖拽表单元素项显示位置"]]],["h2","何时使用"],["p","当你的表单需要与服务端进行交互，且比较表单相对大时，ProForm 是不二选择。"]],meta:{category:"Components",cols:1,type:"数据展示",title:"ProForm",subtitle:"高级表单",filename:"src/components/LegionsProForm/index.zh-CN.md"},toc:["ul",["li",["a",{className:"bisheng-toc-h2",href:"#何时使用",title:"何时使用"},"何时使用"]],["li",["a",{className:"bisheng-toc-h2",href:"#API",title:"API"},"API"]],["li",["a",{className:"bisheng-toc-h2",href:"#Model",title:"Model"},"Model"]]],api:["section",["h2","API"],["p","ProForm 在 antd 的 antd Form 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Form 不同的 api。"],["p","按钮的属性说明如下："],["table",["thead",["tr",["th","属性"],["th","说明"],["th","类型"],["th","默认值"]]],["tbody",["tr",["td","group"],["td","表单信息分组展示"],["td",["a",{title:null,href:"#IGroup"},"IGroup"],"[]"],["td","[]"]],["tr",["td","controls"],["td","表单元素配置项"],["td","Array"],["td","[]"]],["tr",["td","InputDataModel"],["td","表单输入数据模型,通常是一个类"],["td","Function"],["td","-"]],["tr",["td","colCount"],["td","等分栅格 默认2"],["td","1 ","|"," 2 ","|"," 3 ","|"," 4"],["td","2"]],["tr",["td","size"],["td","表单大小舒适,迷你,紧凑"],["td","'default' ","|"," 'small'","|","'table'"],["td",["code","default"]]],["tr",["td","isDragSort"],["td","拖拽排序"],["td","boolean"],["td",["code","false"]]],["tr",["td","uniqueKeys"],["td","主要用于当父组件中存在多个表单组件时，标记key 来保证父级组件中表单组件唯一,可选"],["td","string"],["td","-"]],["tr",["td","onUpdateFormSize"],["td","改变表单大小时触发"],["td","Function(size:'default' ","|"," 'small'","|","'table')"],["td","-"]],["tr",["td","onReady"],["td","获取表单数据模型"],["td","Function((form: WrappedFormUtils,formRef: InstanceForm)"],["td","-"]],["tr",["td","onValuesChange"],["td","任一表单域的值发生改变时的回调"],["td","Function((props,values)"],["td","-"]],["tr",["td","onFieldsChange"],["td","当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 mobx store or redux store"],["td","Function(props: mapProps,fields)"],["td","-"]],["tr",["td","mapPropsToFields"],["td","*把父组件的属性映射到表单项上（可用于把 Redux store 中的值读出）"],["td","Function(props: mapProps) => any"],["td","-"]],["tr",["td","onIgnoreError"],["td","忽略错误信息触发"],["td","Function((item: IErrorView)"],["td","-"]]]],["h3","IGroup"],["p","分组功能配置信息"],["table",["thead",["tr",["th","属性"],["th","说明"],["th","类型"],["th","默认值"]]],["tbody",["tr",["td","name"],["td","分组名称"],["td","string ","|"," React.ReactNode"],["td","-"]],["tr",["td","id"],["td","分组唯一标识"],["td","number"],["td","-"]],["tr",["td","active"],["td","活动分组"],["td","boolean"],["td","-"]],["tr",["td","isFolding"],["td","是否折叠"],["td","boolean"],["td","-"]],["tr",["td","className"],["td","分组样式名"],["td","string"],["td","-"]],["tr",["td","isShowSizeIcon"],["td","是否显示设置主题风格图标 默认不显示, true 显示"],["td","boolean"],["td","-"]]]],["h2","Model"],["pre",{lang:"js",highlighted:'<span class="token keyword">import</span> <span class="token punctuation">{</span> LegionsProForm <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'legions-pro-design\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> UploadChangeParam <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'antd/lib/upload/interface\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> FormRuleProperty <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'legions-decorator/async.validator\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> IBaseFormFields<span class="token punctuation">,</span>HlLabeledValue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'legions-lunar/model\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ClassOf <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'legions-lunar/types/api/typescript\'</span><span class="token punctuation">;</span>\n<span class="token keyword">class</span> <span class="token class-name">FormFields</span> <span class="token keyword">extends</span> <span class="token class-name">LegionsProForm<span class="token punctuation">.</span>ProFormFields</span><span class="token operator">&lt;</span>FormFields<span class="token operator">></span><span class="token punctuation">{</span>\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\t\trequired<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n\t\tname<span class="token punctuation">:</span> <span class="token string">\'text\'</span><span class="token punctuation">,</span>\n\t\terror<span class="token punctuation">:</span> <span class="token string">\'文本框\'</span><span class="token punctuation">,</span>\n\t\tdesc<span class="token punctuation">:</span> <span class="token string">\'文本框\'</span><span class="token punctuation">,</span>\n\t\ttype<span class="token punctuation">:</span><span class="token string">\'string\'</span><span class="token punctuation">,</span>\n\t<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\ttext<span class="token punctuation">:</span> IBaseFormFields<span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n\t\tvalue<span class="token punctuation">:</span><span class="token string">\'\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\t\trequired<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n\t\tname<span class="token punctuation">:</span> <span class="token string">\'textarea\'</span><span class="token punctuation">,</span>\n\t\terror<span class="token punctuation">:</span> <span class="token string">\'多行文本\'</span><span class="token punctuation">,</span>\n\t\tdesc<span class="token punctuation">:</span> <span class="token string">\'多行文本\'</span><span class="token punctuation">,</span>\n\t\ttype<span class="token punctuation">:</span><span class="token string">\'string\'</span><span class="token punctuation">,</span>\n\t<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\ttextarea<span class="token punctuation">:</span> IBaseFormFields<span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n\t\tvalue<span class="token punctuation">:</span><span class="token string">\'\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\t\trequired<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n\t\tname<span class="token punctuation">:</span> <span class="token string">\'password\'</span><span class="token punctuation">,</span>\n\t\terror<span class="token punctuation">:</span> <span class="token string">\'密码文本\'</span><span class="token punctuation">,</span>\n\t\tdesc<span class="token punctuation">:</span> <span class="token string">\'密码文本\'</span><span class="token punctuation">,</span>\n\t\ttype<span class="token punctuation">:</span><span class="token string">\'string\'</span><span class="token punctuation">,</span>\n\t<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\tpassword<span class="token punctuation">:</span> IBaseFormFields<span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n\t\tvalue<span class="token punctuation">:</span><span class="token string">\'\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'numberText\'</span><span class="token punctuation">,</span>\n        error<span class="token punctuation">:</span> <span class="token string">\'数字文本\'</span><span class="token punctuation">,</span>\n        desc<span class="token punctuation">:</span> <span class="token string">\'数字文本\'</span><span class="token punctuation">,</span>\n        type<span class="token punctuation">:</span><span class="token string">\'string\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    numberText<span class="token punctuation">:</span> IBaseFormFields<span class="token operator">&lt;</span>string<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span><span class="token string">\'\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'numbers\'</span><span class="token punctuation">,</span>\n        error<span class="token punctuation">:</span> <span class="token string">\'数字\'</span><span class="token punctuation">,</span>\n        desc<span class="token punctuation">:</span> <span class="token string">\'数字\'</span><span class="token punctuation">,</span>\n        type<span class="token punctuation">:</span><span class="token string">\'number\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    numbers<span class="token punctuation">:</span> IBaseFormFields<span class="token operator">&lt;</span>number<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span><span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    \n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'selectedItem\'</span><span class="token punctuation">,</span>\n        error<span class="token punctuation">:</span> <span class="token string">\'普通下拉\'</span><span class="token punctuation">,</span>\n        desc<span class="token punctuation">:</span> <span class="token string">\'普通下拉\'</span><span class="token punctuation">,</span>\n        type<span class="token punctuation">:</span><span class="token string">\'object\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    selectedItem<span class="token punctuation">:</span> IBaseFormFields<span class="token operator">&lt;</span>HlLabeledValue<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span><span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'selectedItemRemote\'</span><span class="token punctuation">,</span>\n        error<span class="token punctuation">:</span> <span class="token string">\'远程下拉\'</span><span class="token punctuation">,</span>\n        desc<span class="token punctuation">:</span> <span class="token string">\'远程下拉\'</span><span class="token punctuation">,</span>\n        type<span class="token punctuation">:</span><span class="token string">\'object\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    selectedItemRemote<span class="token punctuation">:</span> IBaseFormFields<span class="token operator">&lt;</span>HlLabeledValue<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span><span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'selectedItemMultiple\'</span><span class="token punctuation">,</span>\n        error<span class="token punctuation">:</span> <span class="token string">\'下拉多选\'</span><span class="token punctuation">,</span>\n        desc<span class="token punctuation">:</span> <span class="token string">\'下拉多选\'</span><span class="token punctuation">,</span>\n        type<span class="token punctuation">:</span><span class="token string">\'array\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    selectedItemMultiple<span class="token punctuation">:</span> IBaseFormFields<span class="token operator">&lt;</span>Array<span class="token operator">&lt;</span>HlLabeledValue<span class="token operator">></span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span><span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    \n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'upload\'</span><span class="token punctuation">,</span>\n        error<span class="token punctuation">:</span> <span class="token string">\'上传文件错误\'</span><span class="token punctuation">,</span>\n        desc<span class="token punctuation">:</span> <span class="token string">\'上传文件\'</span><span class="token punctuation">,</span>\n        type<span class="token punctuation">:</span><span class="token string">\'object\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    upload<span class="token punctuation">:</span>IBaseFormFields<span class="token operator">&lt;</span>UploadChangeParam<span class="token operator">>=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n        submitBeforeTransform<span class="token punctuation">:</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> value<span class="token punctuation">.</span>file<span class="token punctuation">.</span>uid<span class="token punctuation">;</span>  <span class="token comment" spellcheck="true">// 随便选取的数据，在真实业务中，取附件服务端存储网络地址</span>\n            <span class="token punctuation">}</span>\n            <span class="token keyword">return</span> <span class="token string">\'\'</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'customRenderInput1\'</span><span class="token punctuation">,</span>\n        error<span class="token punctuation">:</span> <span class="token string">\'自定义组件信息错误\'</span><span class="token punctuation">,</span>\n        desc<span class="token punctuation">:</span> <span class="token string">\'自定义组件\'</span><span class="token punctuation">,</span>\n        type<span class="token punctuation">:</span><span class="token string">\'string\'</span><span class="token punctuation">,</span>\n        regex<span class="token punctuation">:</span><span class="token regex">/^[1-9]\\d*$/</span><span class="token punctuation">,</span> <span class="token comment" spellcheck="true">// 自定义验证规则</span>\n\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    customRenderInput1<span class="token punctuation">:</span>IBaseFormFields<span class="token operator">&lt;</span>string<span class="token operator">>=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span><span class="token string">\'\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment" spellcheck="true">/**\n     * 提交到表单数据接口需要数据\n     * 不存在UI表单数据实体上面\n     * 依赖表单其他UI数据计算而来\n     * @type {IBaseFormFields&lt;IFormFieldUserRenderInput1,{},FormFields>}\n     * @memberof FormFields\n     */</span>\n    customRender<span class="token punctuation">:</span> IBaseFormFields<span class="token operator">&lt;</span>IFormFieldUserRenderInput1<span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>FormFields<span class="token operator">>=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span><span class="token punctuation">{</span>\n            currency<span class="token punctuation">:</span><span class="token string">\'rmb\'</span><span class="token punctuation">,</span>\n            number<span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        submitBeforeTransform<span class="token punctuation">:</span> <span class="token punctuation">(</span>value<span class="token punctuation">,</span>formValue<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n            <span class="token keyword">let</span> newValue <span class="token operator">=</span> value<span class="token punctuation">;</span>\n            newValue<span class="token punctuation">.</span>currency <span class="token operator">=</span> formValue<span class="token punctuation">.</span>priceType<span class="token punctuation">.</span>value<span class="token punctuation">;</span>\n            newValue<span class="token punctuation">.</span>number <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>formValue<span class="token punctuation">.</span>price<span class="token punctuation">.</span>value<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> newValue\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment" spellcheck="true">/**\n     * 单价类型\n     *\n     * @type {(IBaseFormFields&lt;IFormFieldUserRenderInput1>)}\n     * @memberof FormFields\n     */</span>\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'priceType\'</span><span class="token punctuation">,</span>\n        error<span class="token punctuation">:</span> <span class="token string">\'价格类型错误\'</span><span class="token punctuation">,</span>\n        desc<span class="token punctuation">:</span> <span class="token string">\'价格类型\'</span><span class="token punctuation">,</span>\n        type<span class="token punctuation">:</span><span class="token string">\'string\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    priceType<span class="token punctuation">:</span>IBaseFormFields<span class="token operator">&lt;</span>string<span class="token operator">>=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span> <span class="token string">\'\'</span><span class="token punctuation">,</span>\n        ignore<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    @<span class="token function">FormRuleProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'price\'</span><span class="token punctuation">,</span>\n        error<span class="token punctuation">:</span> <span class="token string">\'价格只能是数字\'</span><span class="token punctuation">,</span>\n        desc<span class="token punctuation">:</span> <span class="token string">\'价格\'</span><span class="token punctuation">,</span>\n        type<span class="token punctuation">:</span><span class="token string">\'string\'</span><span class="token punctuation">,</span>\n        validator<span class="token punctuation">:</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span>string<span class="token punctuation">,</span>error<span class="token punctuation">,</span>callback<span class="token punctuation">)</span><span class="token operator">=</span><span class="token operator">></span><span class="token punctuation">{</span> <span class="token comment" spellcheck="true">// 自定义验证规则</span>\n            <span class="token keyword">const</span> regex<span class="token operator">=</span><span class="token regex">/^[1-9]\\d*$/</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// 自定义验证规则</span>\n            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>regex<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n                <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'价格请输入数字\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            <span class="token keyword">else</span><span class="token punctuation">{</span>\n                <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    price<span class="token punctuation">:</span>IBaseFormFields<span class="token operator">&lt;</span>string<span class="token operator">>=</span> <span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span> <span class="token string">\'\'</span><span class="token punctuation">,</span>\n        ignore<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">constructor</span><span class="token punctuation">(</span>form<span class="token operator">?</span><span class="token punctuation">:</span> FormFields<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        FormFields<span class="token punctuation">.</span>initMapPropsToFields<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> form<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>'},["code","import { LegionsProForm } from 'legions-pro-design';\nimport { UploadChangeParam } from 'antd/lib/upload/interface';\nimport { FormRuleProperty } from 'legions-decorator/async.validator';\nimport { IBaseFormFields,HlLabeledValue } from 'legions-lunar/model';\nimport { ClassOf } from 'legions-lunar/types/api/typescript';\nclass FormFields extends LegionsProForm.ProFormFields<FormFields>{\n    @FormRuleProperty({\n\t\trequired: true,\n\t\tname: 'text',\n\t\terror: '文本框',\n\t\tdesc: '文本框',\n\t\ttype:'string',\n\t})\n\ttext: IBaseFormFields<string> = {\n\t\tvalue:'',\n    }\n    @FormRuleProperty({\n\t\trequired: true,\n\t\tname: 'textarea',\n\t\terror: '多行文本',\n\t\tdesc: '多行文本',\n\t\ttype:'string',\n\t})\n\ttextarea: IBaseFormFields<string> = {\n\t\tvalue:'',\n    }\n    @FormRuleProperty({\n\t\trequired: true,\n\t\tname: 'password',\n\t\terror: '密码文本',\n\t\tdesc: '密码文本',\n\t\ttype:'string',\n\t})\n\tpassword: IBaseFormFields<string> = {\n\t\tvalue:'',\n    }\n    @FormRuleProperty({\n        required: true,\n        name: 'numberText',\n        error: '数字文本',\n        desc: '数字文本',\n        type:'string',\n    })\n    numberText: IBaseFormFields<string> = {\n        value:'',\n    }\n    @FormRuleProperty({\n        required: true,\n        name: 'numbers',\n        error: '数字',\n        desc: '数字',\n        type:'number',\n    })\n    numbers: IBaseFormFields<number> = {\n        value:void 0,\n    }\n    \n    @FormRuleProperty({\n        required: true,\n        name: 'selectedItem',\n        error: '普通下拉',\n        desc: '普通下拉',\n        type:'object',\n    })\n    selectedItem: IBaseFormFields<HlLabeledValue> = {\n        value:void 0,\n    }\n    @FormRuleProperty({\n        required: true,\n        name: 'selectedItemRemote',\n        error: '远程下拉',\n        desc: '远程下拉',\n        type:'object',\n    })\n    selectedItemRemote: IBaseFormFields<HlLabeledValue> = {\n        value:void 0,\n    }\n\n    @FormRuleProperty({\n        required: true,\n        name: 'selectedItemMultiple',\n        error: '下拉多选',\n        desc: '下拉多选',\n        type:'array',\n    })\n    selectedItemMultiple: IBaseFormFields<Array<HlLabeledValue>> = {\n        value:void 0,\n    }\n    \n    @FormRuleProperty({\n        required: true,\n        name: 'upload',\n        error: '上传文件错误',\n        desc: '上传文件',\n        type:'object',\n    })\n    upload:IBaseFormFields<UploadChangeParam>= {\n        value: null,\n        submitBeforeTransform: (value) => {\n            if (value) {\n                return value.file.uid;  // 随便选取的数据，在真实业务中，取附件服务端存储网络地址\n            }\n            return ''\n        },\n    }\n    @FormRuleProperty({\n        required: true,\n        name: 'customRenderInput1',\n        error: '自定义组件信息错误',\n        desc: '自定义组件',\n        type:'string',\n        regex:/^[1-9]\\d*$/, // 自定义验证规则\n\n    })\n    customRenderInput1:IBaseFormFields<string>= {\n        value:'',\n    }\n    /**\n     * 提交到表单数据接口需要数据\n     * 不存在UI表单数据实体上面\n     * 依赖表单其他UI数据计算而来\n     * @type {IBaseFormFields<IFormFieldUserRenderInput1,{},FormFields>}\n     * @memberof FormFields\n     */\n    customRender: IBaseFormFields<IFormFieldUserRenderInput1,{},FormFields>= {\n        value:{\n            currency:'rmb',\n            number:0,\n        },\n        submitBeforeTransform: (value,formValue) => {\n            let newValue = value;\n            newValue.currency = formValue.priceType.value;\n            newValue.number = parseInt(formValue.price.value,0);\n            return newValue\n        },\n    }\n    /**\n     * 单价类型\n     *\n     * @type {(IBaseFormFields<IFormFieldUserRenderInput1>)}\n     * @memberof FormFields\n     */\n    @FormRuleProperty({\n        required: true,\n        name: 'priceType',\n        error: '价格类型错误',\n        desc: '价格类型',\n        type:'string',\n    })\n    priceType:IBaseFormFields<string>= {\n        value: '',\n        ignore: true,\n    }\n    @FormRuleProperty({\n        required: true,\n        name: 'price',\n        error: '价格只能是数字',\n        desc: '价格',\n        type:'string',\n        validator:(value:string,error,callback)=>{ // 自定义验证规则\n            const regex=/^[1-9]\\d*$/; // 自定义验证规则\n            if(!(regex.test(value.toString()))){\n                callback(new Error('价格请输入数字'));\n            }\n            else{\n                callback();\n            }\n        },\n    })\n    price:IBaseFormFields<string>= {\n        value: '',\n        ignore: true,\n    }\n    constructor(form?: FormFields) {\n        super()\n        FormFields.initMapPropsToFields.call(this, form)\n    }\n}"]],["style",'\n[id^="components-legionsproecharts-demo-"] .ant-btn {\n  margin-right: 8px;\n  margin-bottom: 12px;\n}\n[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {\n  margin-right: 0;\n}\n']]}}}]);