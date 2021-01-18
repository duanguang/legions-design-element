import React from 'react';
import  LegionsProEcharts from '../LegionsProEcharts';
import { LegionsEchartsAutoQueryParams, LegionsProEchartsPropsTypes } from '../interface/interface';
import echarts from 'echarts/lib/echarts';
import { HeadersPrams } from 'legions/fetch';
import { observablePromise,observableViewModel } from 'brain-store-utils';
import { observable } from 'mobx';
import { LegionsFetch,MORE_IOCN } from '../core';
import { merge } from 'lodash';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/toolbox';
import { observer } from 'legions/store-react';
export class LegionsProEchartsChartLineProps extends LegionsProEchartsPropsTypes {
    /** 数据 */
    data?: echarts.EChartOption.SeriesPie.DataObject[] = [{value: 100, name: 'demo'}];
    /** 配置项 */
    option?: echarts.EChartOption = {};
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
        return []
    }
    /** 配置项 */
    get option(): echarts.EChartOption {
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
            toolbox: {
                /* show: true, */
                feature: {
                    saveAsImage: { type: 'png',show:true },
                    magicType: {
                        type: ["line", "bar",'stack', 'tiled']
                    },
                    myReadMore: {
                        onclick: function (){
                            alert('myToolHandler2')
                        },
                        title:'more',
                        icon:MORE_IOCN
                    },
                },
                showTitle: false, // 隐藏默认文字，否则两者位置会重叠
                tooltip: { // 和 option.tooltip 的配置项相同
                    show: true,
                    formatter: function (param) {
                        return  '<div>' + param.title + '</div>'; // 自定义的 DOM 结构
                    },
                    backgroundColor: '#222',
                    textStyle: {
                        fontSize: 12,
                    },
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // 自定义的 CSS 样式
                }

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
            series: this.props.autoQuery ? this.responseData : this.props.option ? this.props.option.series : [],
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
        const { option } = this.props;
        const loading = this.props.autoQuery ? this.viewModel.response.isPending : this.props.loading
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
