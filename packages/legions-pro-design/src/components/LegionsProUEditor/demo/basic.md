---
order: 0
title:
  zh-CN: 富文本使用方式
  en-US: 富文本使用方式
---

## zh-CN

富文本编辑器简单使用

## en-US

```jsx
import create from '../../../common/components/render.tsx';
import { JsonProperty } from 'json-mapper-object';
import { Button, Row } from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProUEditor, LegionsProPageContainer } from 'legions-pro-design';


interface IProps {}
class LegionsProUEditorDemo extends React.Component<IProps,{}> {
   editorInstance = null;
  constructor(props: IProps) {
    super(props);
    
  }
  render() {
    return (
       <React.Fragment>
        <LegionsProUEditor
            ueditorPath={`https://qa-zy.hoolinks.com/static/ueditor/`}
            ueditorConfig={{
                initialFrameHeight: 250,
                autoHeightEnabled: false,
                toolbars: [
                    [
                    'bold', // 加粗
                    'italic', // 斜体
                    'underline', // 下划线
                    'strikethrough', // 删除线
                    'subscript', // 下标
                    'superscript', // 上标
                    'pasteplain', // 纯文本粘贴模式
                    'preview', // 预览
                    'horizontal', // 分隔线
                    'removeformat', // 清除格式
                    'cleardoc', // 清空文档
                    'fontfamily', // 字体
                    'fontsize', // 字号
                    'spechars', // 特殊字符
                    'justifyleft', // 居左对齐
                    'justifyright', // 居右对齐
                    'justifycenter', // 居中对齐
                    'justifyjustify', // 两端对齐
                    'forecolor', // 字体颜色
                    'backcolor', // 背景色
                    'fullscreen', // 全屏
                    'lineheight', // 行间距
                    'simpleupload', // 单图上传
                    'insertimage', // 多图上传
                    ],
                ],
            }}
            ueditorId={`LegionsProUEditorDemo`}
            onReady={(instance) => {
                /* 配置上传接口 */
                instance['options'].serverUrl = `https://qa-fc.hoolinks.com/v1/oss/uploadByForm?project=4pl&module=ueditor`
                this.editorInstance = instance;
                // 初始化内容
                instance.execCommand('inserthtml', '');
                instance.setEnabled();
            }}
          ></LegionsProUEditor>
        </React.Fragment>
    );
  }
}
const root = props => {
  return <LegionsProUEditorDemo></LegionsProUEditorDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
