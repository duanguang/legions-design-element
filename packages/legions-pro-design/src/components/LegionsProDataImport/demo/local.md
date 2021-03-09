---
order: 0
title:
  zh-CN: 本地解析
  en-US: 本地解析
---

## zh-CN

本地直接解析导入文件内容

## en-US

```jsx

import React from 'react';
import { Button } from 'antd';
import { LegionsProDataImport } from 'legions-pro-design';
import { ITableColumnConfigProps } from 'legions-pro-design/es/LegionsProTable/interface';
import create from '../../../common/components/render.tsx';

/** 表格列配置 */
const columns: ITableColumnConfigProps[] = [
    { title: '序号', dataIndex: 'trId'},
    { title: '错误信息', dataIndex: 'errorInfo', width: 300, isExport: false, tooltip: true},
    { title: '类别', dataIndex: 'typeName_value'},
    { title: '料号', dataIndex: 'itemNo'},
    { title: '归并料号', dataIndex: 'baseCommodityItemNo_value'},
    { title: '商品编码', dataIndex: 'commodityCode_value'},
    { title: '货物名称', dataIndex: 'gname_value'},
    { title: '货物英文', dataIndex: 'gdescEn_value'},
    { title: '货物规格', dataIndex: 'type'},
]

export default class DataImportDemo extends React.Component {
    /** 提交 */
    handleSubmit = (data: object[]) => {
        console.log(data)
    }
    render() {
        return (
            <div style={{padding: 10}}>
                <LegionsProDataImport
                    uploadDataTransform={async (reponse, data) => {
                        /* 模拟接口等待两秒 */
                        await new Promise((resolve) => {
                            setTimeout(resolve, 2 * 1000)
                        })
                        return data.map((item, i) => {
                            return {trId: i.toString(), isError: false}
                        })
                    }}
                    uploadProps={{accept: 'xlsx,xls'}}
                    tableProps={{
                        uniqueKey: 'trId',
                        uniqueUid: 'test', // 实际使用场景请勿赋值该属性
                        columns,
                        scroll: {y: 300, x: 1000},
                        tableModulesName: 'b',
                        onReady: (instance) => {
                            instance.viewModel.isAdaptiveHeight = true;
                            instance.viewModel.bodyExternalContainer.set('other', {height: 150})
                        },
                    }}
                    onSubmit={this.handleSubmit}
                ></LegionsProDataImport>
            </div>
        )
    }
}

const root = props => {
  return <DataImportDemo></DataImportDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
