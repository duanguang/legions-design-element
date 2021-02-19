import { Col,Progress,Row } from 'antd';
import LegionsProEchartsBoxList from '../../../components/LegionsProEchartsBoxList';
import LegionsProEchartsLayout from '../../../components/LegionsProEchartsLayout';
import React from 'react';
import LegionsProEchartsBox from '../../../components/LegionsProEchartsBox';
import './index.less';
const { ProRow, ProCol } = LegionsProEchartsLayout;
interface IDataSourceSingleRowList{
    name: string;
    proportion: number;
    total: number;
}
export class LegionsProEchartsBoxDemo extends React.Component {

    render() {
        const multipleColumns=[
            {
                title: '镇区',
                dataIndex:'zhengqu',
                tooltip:true,
            },
            {
                title: '交易额',
                dataIndex:'jiaoyie',
            },
            {
                title: '交易单量',
                dataIndex:'jiaoyidanliang',
            },
        ]
        return <LegionsProEchartsLayout gutter={6}>
            <ProRow>
                <ProCol span={6}>
                    <LegionsProEchartsBoxList
                        boxTitle="无数据"
                        noContent="暂无数据"
                        rowKey={'name'}
                        columns={
                            [
                                {
                                    title: '标题',
                                    dataIndex: 'name',
                                },
                                {
                                    title: '所占比例',
                                    dataIndex: 'proportion',
                                    render: 'proportion',
                                    colSpan: 6,
                                },
                                {
                                    title: '总量',
                                    dataIndex: 'total',
                                    offset: 1,
                                    className: 'box-lit-progress-text',
                                },

                            ]
                        }
                        dataSource={[]}></LegionsProEchartsBoxList>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBoxList
                        <IDataSourceSingleRowList>
                        boxStyle={{ height: '33.33%', paddingBottom: 10, paddingTop: 5 }}
                        boxTitle="单行列表"
                        columns={
                            [
                                {
                                    title: '标题',
                                    dataIndex: 'name',
                                },
                                {
                                    title: '总量',
                                    dataIndex: 'total',
                                    className: 'box-lit-progress-text',
                                },
                            ]
                        }
                        rowKey={'name'}
                        dataSource={[
                            {
                                name: '俄罗斯',
                                proportion: 40,
                                total: 397786,
                            },
                            {
                                name: '美国',
                                proportion: 41,
                                total: 397786
                            },
                        ]}></LegionsProEchartsBoxList>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBoxList
                        boxStyle={{ height: '33.33%', paddingBottom: 10, paddingTop: 5 }}
                        boxTitle="列表占比"
                        rowKey={'name'}
                        columns={
                            [
                                {
                                    title: '标题',
                                    dataIndex: 'name',
                                    /* className:'box-lit-title', */
                                    tooltip: true,
                                },
                                {
                                    title: '所占比例',
                                    dataIndex: 'proportion',
                                    render: 'proportion',
                                    colSpan: 6,
                                },
                                {
                                    title: '总量',
                                    dataIndex: 'total',
                                    offset: 1,
                                    className: 'box-lit-progress-text',
                                },

                            ]
                        }
                        dataSource={[
                            {
                                name: '俄罗斯',
                                proportion: 55,
                                total: 397786,
                            },
                            {
                                name: '美国',
                                proportion: 41,
                                total: 397786
                            },
                            {
                                name: '比利时',
                                proportion: 61,
                                total: 397786
                            },
                        ]}></LegionsProEchartsBoxList>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBoxList
                        boxStyle={{ height: '33.33%',paddingBottom: 10,paddingTop: 5 }}
                        rowKey={'zhengqu'}
                        boxTitle="超出内容部分浮框显示"
                        columns={multipleColumns}
                        dataSource={[
                            {
                                zhengqu: '火炬区',
                                jiaoyie: '50,000,00',
                                jiaoyidanliang: 9234567,
                            },
                            {
                                zhengqu: '南朗镇',
                                jiaoyie: '49,567,57',
                                jiaoyidanliang: 42342,
                            },
                            {
                                zhengqu: '五桂山镇',
                                jiaoyie: '48,477,37',
                                jiaoyidanliang: 31245,
                            },
                            {
                                zhengqu: '坦洲镇',
                                jiaoyie: '40,457,37',
                                jiaoyidanliang: 21445,
                            },
                        ]}></LegionsProEchartsBoxList>
                </ProCol>
            </ProRow>
            <ProRow>
                <ProCol span={12}>
                <LegionsProEchartsBoxList
                        boxStyle={{ height: '33.33%', paddingBottom: 10, paddingTop: 5 }}
                        boxTitle="列表占比"
                        rowKey={'name'}
                        columns={
                            [
                                {
                                    title: '标题',
                                    dataIndex: 'name',
                                    tooltip: true,
                                },
                                {
                                    title: '所占比例',
                                    dataIndex: 'proportion',
                                    render: 'proportion',
                                    colSpan: 6,
                                },
                                {
                                    title: '总量',
                                    dataIndex: 'total',
                                    offset: 1,
                                    className: 'box-lit-progress-text',
                                },

                            ]
                        }
                        dataSource={[
                            {
                                name: '俄罗斯',
                                proportion: 55,
                                total: 397786,
                            },
                            {
                                name: '美国',
                                proportion: 41,
                                total: 397786
                            },
                            {
                                name: '比利时',
                                proportion: 61,
                                total: 397786
                            },
                        ]}></LegionsProEchartsBoxList>
                </ProCol>
            </ProRow>
        </LegionsProEchartsLayout>
    }
}
