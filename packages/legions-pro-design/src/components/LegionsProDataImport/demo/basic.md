---
order: 0
title:
  zh-CN: 后端解析
  en-US: 后端解析
---

## zh-CN

后端解析数据并抛出错误信息

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
                    templateUrl="https://uat-scm.hoolinks.com/file/jg/basic/物料信息-导入样例.xlsx"
                    uploadProps={{
                        name: 'uploadFile',
                        action: '/common/excel/import/upload.json',
                        data: {
                            templateCode: 'itemMasterImport_flex',
                        },
                    }}
                    uploadDataTransform={(reponse) => {
                        return reponse && reponse.success ? reponse.data.dataList.map((item, index) => ({
                            ...item,
                            /** 标识数据是否错误 */
                            isError: index === 2,
                            /** 标识数据是否警告 */
                            isWarn: index === 1,
                        })) : []
                    }}
                    tableProps={{
                        uniqueKey: 'trId',
                        uniqueUid: 'test', // 实际使用场景请勿赋值该属性
                        columns,
                        scroll: {y: 300, x: 1000},
                        onReady: (instance) => {
                            instance.viewModel.isAdaptiveHeight = true;
                            instance.viewModel.bodyExternalContainer.set('other', {height: 200})
                        },
                    }}
                    onSubmit={this.handleSubmit}
                    customBtn={<Button>自定义按钮</Button>}
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
