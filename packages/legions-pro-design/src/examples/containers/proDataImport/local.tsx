/*
 * @Author: linzeqin
 * @Date: 2020-02-27 10:40:54
 * @description: 公共导入组件demo
 */
import { Button } from 'antd';
import { LegionsProDataImport } from 'components';
import { ITableColumnConfigProps } from 'components/LegionsProTable/interface';
import React from 'react';

/** 表格列配置 */
const columns: ITableColumnConfigProps[] = [
    { title: '序号', dataIndex: 'trId'},
    { title: '错误信息', dataIndex: 'errorInfo', width: 300, isExport: false, tooltip: true},
    { title: '类别', dataIndex: 'typeName_value'},
    { title: '料号', dataIndex: 'itemNo'},
    { title: '归并料号', dataIndex: 'baseCommodityItemNo_value'},
    { title: '商品编码', dataIndex: 'commodityCode_value'},
    { title: '货物名称', dataIndex: 'gname_value'},
    { title: '货物英文描述', dataIndex: 'gdescEn_value'},
    { title: '货物规格型号', dataIndex: 'type'},
]

export default class DataImportLocalDemo extends React.Component {
    /** 提交 */
    handleSubmit = (data: object[]) => {
        console.log(data)
    }
    render() {
        return (
            <div style={{padding: 10}}>
                <h2>前端解析</h2>
                <LegionsProDataImport
                    uploadDataTransform={async (reponse, data) => {
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
