/*
 * @Author: duanguang
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:13:20
 * @LastEditors: duanguang
 * @Description: 饼图组件
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsChartPie/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { observablePromise, observableViewModel } from 'brain-store-utils';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { observer } from 'legions/store-react';
import { merge } from 'lodash';
import { observable } from 'mobx';
import React from 'react';
import { LegionsFetch } from '../core';
import { echarts, LegionsEchartsAutoQueryParams, LegionsProEchartsPropsTypes, LegionsProEchartsOption } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';
echarts.use([PieChart])

export class LegionsProEchartsPieProps extends LegionsProEchartsPropsTypes {
    /** 数据 */
    data?: PieSeriesOption['data'] = [];
    /** 配置项 */
    option?: LegionsProEchartsOption<PieSeriesOption> = {};
    /** 请求托管 */
    autoQuery?: LegionsEchartsAutoQueryParams
}
class ViewModel {
    /** 请求托管response */
    @observable response = observablePromise<LegionsEchartsAutoQueryParams['model']>()
}
/** 饼图组件 */
@observer
export default class LegionsProEchartsChartPie extends React.Component<LegionsProEchartsPieProps>{
    static defaultProps: Readonly<LegionsProEchartsPieProps> = new LegionsProEchartsPieProps()
    viewModel = observableViewModel<ViewModel>(new ViewModel());
    /** 自动接管接口返回数据 */
    get responseData() {
        if (this.viewModel.response.isResolved&&this.props.autoQuery) {
            return this.props.autoQuery.responseTransform(this.viewModel.response)
        }
        return []
    }
    /** 配置项 */
    get option(): LegionsProEchartsOption<PieSeriesOption> {
        return  {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)',
            },
            legend: {
                bottom: 30,
                itemWidth: 10,
                itemHeight: 4,
            },
            series: [
                {
                    type: 'pie',
                    radius: '40%',
                    center: ['50%', '40%'],
                    itemStyle: {
                        borderRadius: 0,
                        borderColor: 'rgba(12,13,41,0.4)',
                        borderWidth: 2
                    },
                    selectedOffset: 1.5,
                    data: this.props.data || [],
                    label: {
                        show: true,
                        formatter: '{b}\n{d}%',
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
            ],
        };
    }
    componentDidMount() {
        if (this.props.autoQuery) {
            this.getData()
        }
    }
    /** 获取数据 */
    getData(option?:Object) {
        const { autoQuery } = this.props;
        const server = new LegionsFetch()
        if (autoQuery) {
            if (autoQuery.method === 'post') {
                const res = server.post({
                    url: autoQuery.url as string,
                    model: autoQuery.model,
                    parameter: option ? { ...autoQuery.params, ...option } : autoQuery.params,
                    headers: autoQuery.headerOption,
                })
                this.viewModel.response = observablePromise(res)
            } else {
                const res = server.get({
                    url: autoQuery.url as string,
                    model: autoQuery.model,
                    parameter: option ? { ...autoQuery.params, ...option } : autoQuery.params,
                    headers: autoQuery.headerOption,
                })
                this.viewModel.response = observablePromise(res)
            }
        }

    }
    render() {
        const loading = this.props.autoQuery ? this.viewModel.response.isPending : this.props.loading;
        const option = this.props.autoQuery ? merge(this.props.option,this.responseData) : this.props.option
        return (
            <LegionsProEcharts
                {...this.props}
                onChartReady={(value)=>{
                    if(this.props.onChartReady){
                        this.props.onChartReady(value,{
                            methods:{
                                onSearch:(option?:Object)=>{
                                    this.getData(option)
                                }
                            }
                        })
                    }
                }}
                loading={loading}
                option={merge(this.option, option)}
            ></LegionsProEcharts>
        )
    }
}
