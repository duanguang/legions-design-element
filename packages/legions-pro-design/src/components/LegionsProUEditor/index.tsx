import React,{ Component } from 'react'
interface IProps {

    /**
     *
     * UEditor 代码的路径
     * @type {string}
     * @memberof IProps
     */
    ueditorPath?: string

    /**
     *UEditor 配置项
     *
     * @type {Object}
     * @memberof IProps
     */
    ueditorConfig?: Object;

    ueditorId: string;

    onReady: (ueditorInstance) => void
    onChange?: (value: string) => void
    onBlur?:(value:string)=>void
}
interface IState {

    /**
     *为了避免麻烦，每个编辑器实例都用不同的 id
     *
     * @type {string}
     * @memberof IState
     */
    randomId: string
    
}
export default class LegionsProUEditor extends Component<IProps,IState> {
    static defaultProps = {
        editorConfig: {
            initialFrameHeight: 250,
            autoHeightEnabled: false,
            toolbars: [[
                //'anchor', //锚点
                //'undo', //撤销
                //'redo', //重做
                'bold', //加粗
                //'indent', //首行缩进
                //'snapscreen', //截图
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'subscript', //下标
                //'fontborder', //字符边框
                'superscript', //上标
                //'formatmatch', //格式刷
                //'source', //源代码
                //'blockquote', //引用
                'pasteplain', //纯文本粘贴模式
                //'selectall', //全选
                //'print', //打印
                'preview', //预览
                'horizontal', //分隔线
                'removeformat', //清除格式
                //'time', //时间
                //'date', //日期
                'unlink', //取消链接
                //'insertrow', //前插入行
                //'insertcol', //前插入列
                //'mergeright', //右合并单元格
                //'mergedown', //下合并单元格
                //'deleterow', //删除行
                //'deletecol', //删除列
                //'splittorows', //拆分成行
                //'splittocols', //拆分成列
                //'splittocells', //完全拆分单元格
                //'deletecaption', //删除表格标题
                //'inserttitle', //插入标题
                //'mergecells', //合并多个单元格
                //'deletetable', //删除表格
                'cleardoc', //清空文档
                //'insertparagraphbeforetable', //"表格前插入行"
                //'insertcode', //代码语言
                'fontfamily', //字体
                'fontsize', //字号
                //'paragraph', //段落格式
                //'edittable', //表格属性
                //'edittd', //单元格属性
                'link', //超链接
                //'emotion', //表情
                'spechars', //特殊字符
                'searchreplace', //查询替换
                //'help', //帮助
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify', //两端对齐
                'forecolor', //字体颜色
                'backcolor', //背景色
                //'insertorderedlist', //有序列表
                //'insertunorderedlist', //无序列表
                'fullscreen', //全屏
                //'directionalityltr', //从左向右输入
                //'directionalityrtl', //从右向左输入
                //'rowspacingtop', //段前距
                //'rowspacingbottom', //段后距
                //'pagebreak', //分页
                //'insertframe', //插入Iframe
                //'imagenone', //默认
                //'imageleft', //左浮动
                //'imageright', //右浮动
                //'attachment', //附件
                //'imagecenter', //居中
                //'wordimage', //图片转存
                'lineheight', //行间距
                //'edittip ', //编辑提示
                //'customstyle', //自定义标题
                //'autotypeset', //自动排版
                'touppercase', //字母大写
                'tolowercase', //字母小写
                //'background', //背景
                //'template', //模板
                //'inserttable', //插入表格
                //'drafts', // 从草稿箱加载
                'insertimage', //多图上传
            ]]
        },
        ueditorPath: '/static/ueditor1_4_3_3/',
    }
    /**
    *scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
    *
    * @type {number}
    * @memberof IState
    */
    scriptTagStatus = 0;
    instance = null
    constructor(props) {
        super(props)

        this.state = {
            randomId: this.props.ueditorId || 'editor_' + (Math.random() * 100000000000000000)
        }
    }
    componentDidMount() {
        /** 设置静态资源地址 */
        window['UEDITOR_HOME_URL'] = this.props.ueditorPath;
        // @ts-ignore
        if (window.UE !== undefined) {
            // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
            this.scriptTagStatus = 2;
            this.initEditor();
        } else {
            // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
            this.insertScriptTag();
        }
    }
    onChange = () => {
        const value = this.instance.getContent();
        this.props.onChange && this.props.onChange(value);
    }
    onBlur = () => {
        const value = this.instance.getContent();
        this.props.onBlur && this.props.onBlur(value);
    }
    insertScriptTag() {
        let editorScriptTag = document.getElementById('editorScriptTag');
        let configScriptTag = document.getElementById('configScriptTag');
        // 如果这个tag不存在，则生成相关代码tag以加载代码
        if (editorScriptTag === null) {
            configScriptTag = document.createElement('script');
            // @ts-ignore
            configScriptTag.type = 'text/javascript'; configScriptTag.src = this.props.ueditorPath + 'ueditor.config.js'; configScriptTag.id = 'configScriptTag';
            editorScriptTag = document.createElement('script');
            // @ts-ignore
            editorScriptTag.type = 'text/javascript'; editorScriptTag.src = this.props.ueditorPath + 'ueditor.all.js'; editorScriptTag.id = 'editorScriptTag';
            let s = document.getElementsByTagName('head')[0];
            s.appendChild(configScriptTag);
            s.appendChild(editorScriptTag);
        }
        // 等待代码加载完成后初始化编辑器
        // @ts-ignore
        if (configScriptTag.loaded) {
            this.scriptTagStatus++;
        } else {
            configScriptTag.addEventListener('load', () => {
                this.scriptTagStatus++;
                // @ts-ignore
                configScriptTag.loaded = true;
                this.initEditor();
            });
        }
        // @ts-ignore
        if (editorScriptTag.loaded) {
            this.scriptTagStatus++;
        } else {
            editorScriptTag.addEventListener('load', () => {
                this.scriptTagStatus++;
                // @ts-ignore
                editorScriptTag.loaded = true;
                this.initEditor();
            });
        }
        this.initEditor();
    }
    initEditor() {
        // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
        if (this.scriptTagStatus === 2 && this.instance === null) {
            // @ts-ignore
            this.instance = window.UE.getEditor(this.state.randomId, this.props.ueditorConfig);
                // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
            this.instance.addListener('ready', () => {
                this.props.onReady&&this.props.onReady(this.instance)
            });
            this.instance.addListener('contentChange', () => {
                this.onChange();
            });
            this.instance.addListener('blur', () => {
                this.onBlur();
            });
        }
    }
    componentWillUnmount() {
        // 组件销毁的时候，要销毁 UEditor 实例
        if (this.instance !== null && this.instance.destroy) {
            this.instance.destroy();
        }
    }
    render() {
        return (
            <script id={this.state.randomId}  type="text/plain"></script>
        )
    }
}