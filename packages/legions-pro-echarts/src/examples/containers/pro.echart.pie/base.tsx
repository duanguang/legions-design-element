import { LegionsProEchartsBox, LegionsProEchartsLayout,LegionsProEchartsChartPie } from "components";
import React from "react";
const { ProRow, ProCol } = LegionsProEchartsLayout;
export class ProPieDemo extends React.Component{
    render(){
        return(
            <LegionsProEchartsLayout gutter={6}>
                <ProRow>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="圆形饼图" height="300px">
                            <LegionsProEchartsChartPie
                                onEvents={{'click':(e)=>{
                                    console.log(e,'click')
                                }}}
                                data={[
                                    { value: 1048, name: '搜索引擎' },
                                    { value: 735, name: '直接访问' },
                                    { value: 580, name: '邮件营销' },
                                    { value: 484, name: '联盟广告' },
                                    { value: 300, name: '视频广告' }
                                ]}
                            ></LegionsProEchartsChartPie>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="环形饼图" height="300px">
                            <LegionsProEchartsChartPie
                                data={[
                                    {value: 1048, name: '搜索引擎'},
                                    {value: 1000, name: '直接访问'},
                                    {value: 580, name: '邮件营销'},
                                    {value: 484, name: '联盟广告'},
                                    {value: 300, name: '视频广告'}
                                ]}
                                option={{
                                    label: {
                                        show: false,
                                        position:'center'
                                    },
                                    series: [{
                                        radius: ['25%', '40%'],
                                        data: [
                                            {value: 1048, name: '搜索引擎'},
                                            {value: 100, name: '直接访问'},
                                            {value: 580, name: '邮件营销'},
                                            {value: 484, name: '联盟广告'},
                                            {value: 300, name: '视频广告'}
                                        ]
                                    }],
                                }}
                            ></LegionsProEchartsChartPie>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={12}>
                        <LegionsProEchartsBox title="玫瑰饼图" height="300px">
                            <LegionsProEchartsChartPie
                                data={[
                                    {value: 40, name: 'rose 1'},
                                    {value: 33, name: 'rose 2'},
                                    {value: 28, name: 'rose 3'},
                                    {value: 22, name: 'rose 4'},
                                    {value: 20, name: 'rose 5'},
                                    {value: 15, name: 'rose 6'},
                                    {value: 12, name: 'rose 7'},
                                    {value: 10, name: 'rose 8'}
                                ]}
                                option={{
                                    series: [{
                                        radius: [20, 70],
                                        roseType: 'radius',
                                    }],
                                }}
                            ></LegionsProEchartsChartPie>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
                <ProRow>
                    <ProCol span={12}>
                        <LegionsProEchartsBox title="自定义饼图区域样式" height="300px">
                            <LegionsProEchartsChartPie
                                option={{
                                    series: [
                                        {
                                            name: '访问来源',
                                            type: 'pie',
                                            center:['25%','40%'],
                                            radius: ['45%', '60%'],
                                            itemStyle: {
                                                borderRadius: 10,
                                                borderWidth: 2
                                            },
                                            label: {
                                                show: false,
                                                position:'center'
                                            },
                                            emphasis: {
                                                label: {
                                                    show: true,
                                                    formatter:'{b|{b}}\n{c|{c}}',
                                                    rich:{
                                                        b: {
                                                            color: 'rgba(0,230,252,1)',
                                                            fontSize:24,
                                                            lineHeight: 24,
                                                            align: 'center'
                                                        },
                                                        c: {
                                                            color: 'rgba(155,231,245,1)',
                                                            fontSize:12,
                                                            lineHeight: 12,
                                                            align: 'center'
                                                        },
                                                    },
                                                }
                                            },

                                            data: [
                                                {value: 1048, name: '搜索引擎'},
                                                {value: 735, name: '直接访问'},
                                                {value: 580, name: '邮件营销'},
                                                {value: 484, name: '联盟广告'},
                                                {value: 300, name: '视频广告',itemStyle:{
                                                    color:'rgba(227,106,105,1)'
                                                }}
                                            ]
                                        },
                                        {
                                            type: 'pie',
                                            center:['75%','40%'],
                                            radius:'40%',
                                            itemStyle: {
                                                borderRadius: 0,
                                                borderColor: 'rgba(12,13,41,0.4)',
                                                borderWidth: 0
                                            },
                                            label: {
                                                show: true,
                                                formatter: '{b} {d}%',
                                            },
                                            data: [
                                                {value: 1048, name: '搜索引擎'},
                                                {value: 735, name: '直接访问'},
                                                {value: 580, name: '邮件营销'},
                                                {value: 484, name: '联盟广告'},
                                                {value: 300, name: '视频广告',itemStyle:{
                                                    color:'rgba(227,106,105,1)'
                                                }}
                                            ],
                                        }
                                    ]
                                }}
                            ></LegionsProEchartsChartPie>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
            </LegionsProEchartsLayout>
        )
    }
}
