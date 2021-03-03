/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: 基础表格组件示例
 */
import { LegionsProEchartsBox, LegionsProEchartsLayout, LegionsProEchartsTable } from 'components';
import React from 'react';
const { ProRow, ProCol } = LegionsProEchartsLayout;

export class TableDemo extends React.Component{
    render() {
        return <LegionsProEchartsLayout gutter={6}>
            <ProRow>
                {/* 无数据 */}
                <ProCol span={6}>
                    <LegionsProEchartsBox title="无数据" height="300px">
                        <LegionsProEchartsTable style={{padding: 10}}></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                {/* 竖向滚动条 */}
                <ProCol span={6}>
                    <LegionsProEchartsBox title="竖向滚动条" height="300px">
                        <LegionsProEchartsTable
                            style={{padding: 10}}
                            scroll={{y: 200}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                                {title: '涨幅',width: 100,dataIndex: 'c', sorter: true},
                            ]}
                            dataSource={Array.from({length: 25}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                            }))}
                            pagination={false}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                {/* 横向滚动条 */}
                <ProCol span={6}>
                    <LegionsProEchartsBox title="横向滚动条" height="300px">
                        <LegionsProEchartsTable
                            style={{padding: 10}}
                            scroll={{x: 500}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                                {title: '涨幅1',width: 100,dataIndex: 'c', sorter: true},
                                {title: '涨幅2',width: 100,dataIndex: 'd', sorter: true},
                                {title: '涨幅3',width: 100,dataIndex: 'e', sorter: true},
                                {title: '涨幅4',width: 100,dataIndex: 'f', sorter: true},
                                {title: '涨幅5',width: 100,dataIndex: 'g', sorter: true},
                            ]}
                            dataSource={Array.from({length: 6}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                                d: index,
                                e: index,
                                f: index,
                                g: index,
                            }))}
                            pagination={false}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                {/* 分页 */}
                <ProCol span={6}>
                    <LegionsProEchartsBox title="分页" height="300px">
                        <LegionsProEchartsTable
                            style={{padding: 10}}
                            scroll={{y: 170}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                                {title: '涨幅',width: 100,dataIndex: 'c', sorter: true},
                            ]}
                            dataSource={Array.from({length: 25}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                            }))}
                            pagination={{
                                pageSize: 10,
                                total: 25
                            }}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
            </ProRow>
            <ProRow>
                {/* 高度自适应300px */}
                <ProCol span={6}>
                    <LegionsProEchartsBox title="高度自适应300px" height="300px">
                        <LegionsProEchartsTable
                            isFullScreen
                            style={{padding: 10}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                                {title: '涨幅',width: 100,dataIndex: 'c', sorter: true},
                            ]}
                            dataSource={Array.from({length: 25}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                            }))}
                            pagination={{
                                pageSize: 10,
                                total: 25
                            }}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                {/* 高度自适应400px */}
                <ProCol span={6}>
                    <LegionsProEchartsBox title="高度自适应400px" height="400px">
                        <LegionsProEchartsTable
                            isFullScreen
                            style={{padding: 10}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                                {title: '涨幅',width: 100,dataIndex: 'c', sorter: true},
                            ]}
                            dataSource={Array.from({length: 25}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                            }))}
                            pagination={{
                                pageSize: 10,
                                total: 25
                            }}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                {/* 高度自适应500px */}
                <ProCol span={6}>
                    <LegionsProEchartsBox title="高度自适应500px(有分页)" height="500px">
                        <LegionsProEchartsTable
                            isFullScreen
                            style={{padding: 10}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                                {title: '涨幅',width: 100,dataIndex: 'c', sorter: true},
                            ]}
                            dataSource={Array.from({length: 25}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                            }))}
                            pagination={{
                                pageSize: 10,
                                total: 25
                            }}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                {/* 高度自适应500px */}
                <ProCol span={6}>
                    <LegionsProEchartsBox title="高度自适应500px(无分页)" height="500px">
                        <LegionsProEchartsTable
                            isFullScreen
                            style={{padding: 10}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                                {title: '涨幅',width: 100,dataIndex: 'c', sorter: true},
                            ]}
                            dataSource={Array.from({length: 25}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                            }))}
                            pagination={false}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
            </ProRow>
        </LegionsProEchartsLayout>
    }
}
