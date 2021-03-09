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

export default class DataImportBaseDemo extends React.Component {
    /** 提交 */
    handleSubmit = (data: object[]) => {
        console.log(data)
    }
    render() {
        return (
            <div style={{padding: 10}}>
                <h2>后端解析</h2>
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
