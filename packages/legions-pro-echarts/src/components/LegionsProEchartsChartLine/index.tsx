import React from 'react';
import  LegionsProEcharts from '../LegionsProEcharts';
import { echarts, LegionsEchartsAutoQueryParams, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import { HeadersPrams } from 'legions/fetch';
import { observablePromise,observableViewModel } from 'brain-store-utils';
import { observable } from 'mobx';
import { LegionsFetch,MORE_IOCN } from '../core';
import { merge } from 'lodash';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/toolbox';
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { observer } from 'legions/store-react';

echarts.use([LineChart])
export class LegionsProEchartsChartLineProps extends LegionsProEchartsPropsTypes {
    /** 数据 */
    data?: LineSeriesOption['data'] = [{value: 100, name: 'demo'}];
    /** 配置项 */
    option?: LegionsProEchartsOption<LineSeriesOption> = {};
    /** 请求托管 */
    autoQuery?: LegionsEchartsAutoQueryParams
}
class ViewModel {
    /** 请求托管response */
    @observable response = observablePromise<LegionsEchartsAutoQueryParams['model']>()
}
@observer
export default class LegionsProEchartsChartLine extends React.Component<LegionsProEchartsChartLineProps>{
    static defaultProps: Readonly<LegionsProEchartsChartLineProps> = new LegionsProEchartsChartLineProps()
    viewModel = observableViewModel<ViewModel>(new ViewModel());
    /** 自动接管接口返回数据 */
    get responseData() {
        if (this.viewModel.response.isResolved && this.props.autoQuery) {
            return this.props.autoQuery.responseTransform(this.viewModel.response)
        }
        return {}
    }
    /** 配置项 */
    get option(): LegionsProEchartsOption<LineSeriesOption> {
        return  {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                padding:15,
                itemWidth:13,
                itemHeight:5,
            },
            grid: {
                top:'20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine:{
                    lineStyle:{
                        type:'dashed',
                        color:'#0C4354',
                    },
                },
                axisLabel:{
                    color:'#6A94AC',
                },
            },
            yAxis: {
                type: 'value',
                splitLine:{
                    lineStyle:{
                        type:'dashed',
                        color:'#0C4354',
                    },
                },
                axisLabel:{
                    color:'#6A94AC',
                },
                show:true,
            },
            series: [],
        };
    }
    componentDidMount(){
        if(this.props.autoQuery){
            this.getData()
        }
    }
    /** 获取数据 */
    getData(option?:Object){
        const {autoQuery} = this.props
        const server = new LegionsFetch
        if(autoQuery){
            if(autoQuery.method === 'post'){
                const res = server.post({
                    url:autoQuery.url as string,
                    model:autoQuery.model,
                    parameter: option ? { ...autoQuery.params, ...option } : autoQuery.params,
                    headers:autoQuery.headerOption,
                })
                this.viewModel.response = observablePromise(res)
            }else{
                const res = server.get({
                    url:autoQuery.url as string,
                    model:autoQuery.model,
                    parameter: option ? { ...autoQuery.params, ...option } : autoQuery.params,
                    headers:autoQuery.headerOption,
                })
                this.viewModel.response = observablePromise(res)
            }
        }
    }
    render() {
        const loading = this.props.autoQuery ? this.viewModel.response.isPending : this.props.loading
        const option = this.props.autoQuery ? merge(this.props.option,this.responseData) : this.props.option
        return(
            <LegionsProEcharts
            {...this.props}
            onChartReady={(value)=>{
                if(this.props.onChartReady){
                    this.props.onChartReady(value,{
                        methods:{
                            onSearch:(option?:Object)=>{
                                this.getData(option)
                            }
                        },
                    })
                }
            }}
            loading={loading}
            option={merge(this.option, option)}
            ></LegionsProEcharts>
        )
    }
}
