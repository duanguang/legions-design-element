/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: 基础表格组件示例
 */
import { Button, Tag, Tooltip } from 'antd';
import { LegionsProEchartsBox, LegionsProEchartsButton, LegionsProEchartsLayout, LegionsProEchartsProgress, LegionsProEchartsTable } from 'components';
import { mainColorList } from 'components/core';
import { randomBytes } from 'crypto';
import React from 'react';
const { ProRow, ProCol } = LegionsProEchartsLayout;

export class TableDemo extends React.Component{
    render() {
        return <LegionsProEchartsLayout gutter={6}>
            <ProRow>
                <ProCol span={6}>
                    <LegionsProEchartsBox title="无数据" height="300px">
                        <LegionsProEchartsTable style={{padding: 10}}></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
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
                <ProCol span={6}>
                    <LegionsProEchartsBox title="横竖向滚动条+分页" height="300px">
                        <LegionsProEchartsTable
                            style={{padding: 10}}
                            scroll={{x: 500, y: 180}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                                {title: '涨幅1',width: 100,dataIndex: 'c', sorter: true},
                                {title: '涨幅2',width: 100,dataIndex: 'd', sorter: true},
                                {title: '涨幅3',width: 100,dataIndex: 'e', sorter: true},
                                {title: '涨幅4',width: 100,dataIndex: 'f', sorter: true},
                                {title: '涨幅5',width: 100,dataIndex: 'g', sorter: true},
                            ]}
                            dataSource={Array.from({length: 25}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                                d: index,
                                e: index,
                                f: index,
                                g: index,
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
                            dataSource={Array.from({length: 5}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                            }))}
                            pagination={false}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
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
                            pagination={false}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBox title="高度自适应300px(分页)" height="300px">
                        <LegionsProEchartsTable
                            isFullScreen
                            style={{padding: 10}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                                {title: '涨幅',width: 100,dataIndex: 'c', sorter: true},
                            ]}
                            dataSource={Array.from({length: 55}).map((_, index) => ({
                                a: index,
                                b: index,
                                c: index,
                            }))}
                            pagination={{
                                pageSize: 20,
                                total: 55
                            }}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBox title="单元格超出隐藏" height="300px">
                        <LegionsProEchartsTable
                            isFullScreen
                            style={{padding: 10}}
                            columns={[
                                {title: '排名',width: 100,dataIndex: 'a', sorter: true, tooltip: 'topLeft'},
                                {title: '订单数',width: 100,dataIndex: 'b', sorter: true, tooltip: 'topLeft'},
                                {title: '涨幅',width: 100,dataIndex: 'c', sorter: true, tooltip: 'topLeft'},
                            ]}
                            dataSource={Array.from({length: 15}).map((_, index) => ({
                                a: '1111111321354564',
                                b: '1111111321354564',
                                c: '1111111321354564',
                            }))}
                            pagination={false}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
            </ProRow>
            <ProRow>
                <ProCol span={6}>
                    <LegionsProEchartsBox title="列表" height="300px">
                        <LegionsProEchartsTable
                            isFullScreen
                            style={{padding: 10}}
                            columns={[
                                {title: '排名',width: 40,dataIndex: 'a', render: (_, __, index) => <Tag color={mainColorList[index % mainColorList.length ]}>{index+1}</Tag>},
                                {title: '订单数',width: '100%',dataIndex: 'b', sorter: true, render: (text) => <LegionsProEchartsProgress percent={text} ></LegionsProEchartsProgress>},
                                {title: '涨幅',width: 52,dataIndex: 'c', sorter: true, render: () => <LegionsProEchartsButton size="small">库存</LegionsProEchartsButton>},
                            ]}
                            dataSource={Array.from({length: 15}).map((_, index) => ({
                                a: '1111111321354564',
                                b: Math.ceil(Math.random() * 100),
                                c: '1111111321354564',
                            }))}
                            pagination={false}
                            showHeader={false}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBox title="列表+分页" height="300px">
                        <LegionsProEchartsTable
                            isFullScreen
                            style={{padding: 10}}
                            columns={[
                                {width: 40,dataIndex: 'a', render: (_, __, index) => <Tag color={mainColorList[index % mainColorList.length ]}>{index+1}</Tag>},
                                {width: 40,dataIndex: 'b', sorter: true},
                                {width: '100%',dataIndex: 'c', sorter: true, render: (text) => <LegionsProEchartsProgress percent={text} ></LegionsProEchartsProgress>},
                                {width: 52,dataIndex: 'd', sorter: true, render: (text) => <LegionsProEchartsButton type={text ? 'ghost' : 'danger'} size="small">{ text ? '充足' : '不足'}</LegionsProEchartsButton>},
                            ]}
                            dataSource={Array.from({length: 200}).map((_, index) => ({
                                a: index,
                                b: '京东',
                                c: Math.ceil(Math.random() * 100),
                                d: index < 3,
                            }))}
                            pagination={{
                                pageSize: 20,
                                total: 200
                            }}
                            showHeader={false}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
                <ProCol span={12}>
                    <LegionsProEchartsBox title="自定义布局" height="300px">
                        <LegionsProEchartsTable
                            isFullScreen
                            style={{padding: 10}}
                            columns={[
                                {width: 40, dataIndex: 'a', textAlign: 'left', render: (text, __, index) =>
                                    <div>
                                        <div>
                                            <Tag color={mainColorList[index % mainColorList.length ]}>{index+1}</Tag>
                                            <span style={{color: '#108DE9'}}>平台客服货物</span>
                                            <span style={{color: '#6A94AC'}}>(HSD86881105,787x1092mm500)</span>
                                        </div>
                                        <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                                            <LegionsProEchartsProgress percent={text / 100} format={() => `${text}件`}></LegionsProEchartsProgress>
                                            <LegionsProEchartsButton size="small" style={{marginLeft: 50}} type={text > 5000 ? 'ghost' : 'danger'}>{text > 5000 ? '库存充足' : '库存不足'}</LegionsProEchartsButton>
                                        </div>
                                    </div>
                                },
                            ]}
                            dataSource={Array.from({length: 200}).map((_, index) => ({a: Math.ceil(Math.random() * 10000)}))}
                            pagination={{
                                pageSize: 20,
                                total: 200
                            }}
                            showHeader={false}
                        ></LegionsProEchartsTable>
                    </LegionsProEchartsBox>
                </ProCol>
            </ProRow>
        </LegionsProEchartsLayout>
    }
}
