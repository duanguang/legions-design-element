/**
  *  legions-pro-design v0.0.9
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { Component } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var LegionsProUEditor = /** @class */ (function (_super) {
    __extends(LegionsProUEditor, _super);
    function LegionsProUEditor(props) {
        var _this = _super.call(this, props) || this;
        /**
        *scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
        *
        * @type {number}
        * @memberof IState
        */
        _this.scriptTagStatus = 0;
        _this.instance = null;
        _this.onChange = function () {
            var value = _this.instance.getContent();
            _this.props.onChange && _this.props.onChange(value);
        };
        _this.onBlur = function () {
            var value = _this.instance.getContent();
            _this.props.onBlur && _this.props.onBlur(value);
        };
        _this.state = {
            randomId: _this.props.ueditorId || 'editor_' + (Math.random() * 100000000000000000)
        };
        return _this;
    }
    LegionsProUEditor.prototype.componentDidMount = function () {
        /** 设置静态资源地址 */
        window['UEDITOR_HOME_URL'] = this.props.ueditorPath;
        // @ts-ignore
        if (window.UE !== undefined) {
            // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
            this.scriptTagStatus = 2;
            this.initEditor();
        }
        else {
            // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
            this.insertScriptTag();
        }
    };
    LegionsProUEditor.prototype.insertScriptTag = function () {
        var _this = this;
        var editorScriptTag = document.getElementById('editorScriptTag');
        var configScriptTag = document.getElementById('configScriptTag');
        // 如果这个tag不存在，则生成相关代码tag以加载代码
        if (editorScriptTag === null) {
            configScriptTag = document.createElement('script');
            // @ts-ignore
            configScriptTag.type = 'text/javascript';
            configScriptTag.src = this.props.ueditorPath + 'ueditor.config.js';
            configScriptTag.id = 'configScriptTag';
            editorScriptTag = document.createElement('script');
            // @ts-ignore
            editorScriptTag.type = 'text/javascript';
            editorScriptTag.src = this.props.ueditorPath + 'ueditor.all.js';
            editorScriptTag.id = 'editorScriptTag';
            var s = document.getElementsByTagName('head')[0];
            s.appendChild(configScriptTag);
            s.appendChild(editorScriptTag);
        }
        // 等待代码加载完成后初始化编辑器
        // @ts-ignore
        if (configScriptTag.loaded) {
            this.scriptTagStatus++;
        }
        else {
            configScriptTag.addEventListener('load', function () {
                _this.scriptTagStatus++;
                // @ts-ignore
                configScriptTag.loaded = true;
                _this.initEditor();
            });
        }
        // @ts-ignore
        if (editorScriptTag.loaded) {
            this.scriptTagStatus++;
        }
        else {
            editorScriptTag.addEventListener('load', function () {
                _this.scriptTagStatus++;
                // @ts-ignore
                editorScriptTag.loaded = true;
                _this.initEditor();
            });
        }
        this.initEditor();
    };
    LegionsProUEditor.prototype.initEditor = function () {
        var _this = this;
        // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
        if (this.scriptTagStatus === 2 && this.instance === null) {
            // @ts-ignore
            this.instance = window.UE.getEditor(this.state.randomId, this.props.ueditorConfig);
            // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
            this.instance.addListener('ready', function () {
                _this.props.onReady && _this.props.onReady(_this.instance);
            });
            this.instance.addListener('contentChange', function () {
                _this.onChange();
            });
            this.instance.addListener('blur', function () {
                _this.onBlur();
            });
        }
    };
    LegionsProUEditor.prototype.componentWillUnmount = function () {
        // 组件销毁的时候，要销毁 UEditor 实例
        if (this.instance !== null && this.instance.destroy) {
            this.instance.destroy();
        }
    };
    LegionsProUEditor.prototype.render = function () {
        return (React.createElement("script", { id: this.state.randomId, type: "text/plain" }));
    };
    LegionsProUEditor.defaultProps = {
        editorConfig: {
            initialFrameHeight: 250,
            autoHeightEnabled: false,
            toolbars: [[
                    //'anchor', //锚点
                    //'undo', //撤销
                    //'redo', //重做
                    'bold',
                    //'indent', //首行缩进
                    //'snapscreen', //截图
                    'italic',
                    'underline',
                    'strikethrough',
                    'subscript',
                    //'fontborder', //字符边框
                    'superscript',
                    //'formatmatch', //格式刷
                    //'source', //源代码
                    //'blockquote', //引用
                    'pasteplain',
                    //'selectall', //全选
                    //'print', //打印
                    'preview',
                    'horizontal',
                    'removeformat',
                    //'time', //时间
                    //'date', //日期
                    'unlink',
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
                    'cleardoc',
                    //'insertparagraphbeforetable', //"表格前插入行"
                    //'insertcode', //代码语言
                    'fontfamily',
                    'fontsize',
                    //'paragraph', //段落格式
                    //'edittable', //表格属性
                    //'edittd', //单元格属性
                    'link',
                    //'emotion', //表情
                    'spechars',
                    'searchreplace',
                    //'help', //帮助
                    'justifyleft',
                    'justifyright',
                    'justifycenter',
                    'justifyjustify',
                    'forecolor',
                    'backcolor',
                    //'insertorderedlist', //有序列表
                    //'insertunorderedlist', //无序列表
                    'fullscreen',
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
                    'lineheight',
                    //'edittip ', //编辑提示
                    //'customstyle', //自定义标题
                    //'autotypeset', //自动排版
                    'touppercase',
                    'tolowercase',
                    //'background', //背景
                    //'template', //模板
                    //'inserttable', //插入表格
                    //'drafts', // 从草稿箱加载
                    'insertimage',
                ]]
        },
        ueditorPath: '/static/ueditor1_4_3_3/',
    };
    return LegionsProUEditor;
}(Component));

export default LegionsProUEditor;
