/*
 * @Author: duanguang
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:42:03
 * @LastEditors: duanguang
 * @Description: 饼图组件
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsLiquidFill/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import  LegionsProEcharts from '../LegionsProEcharts';
import { LegionsEchartsAutoQueryParams, LegionsProEchartsPropsTypes, Weaken } from '../interface/interface';
import echarts from 'echarts/lib/echarts';
import { HeadersPrams } from 'legions/fetch';
import { observablePromise,observableViewModel } from 'brain-store-utils';
import { observable } from 'mobx';
import { LegionsFetch } from '../core';
import { merge } from 'lodash';
import './liquidFill';
export class LegionsProEchartsLiquidFillProps extends LegionsProEchartsPropsTypes<IOptions> {
    /** 数据 */
    data?: echarts.EChartOption.SeriesPie.DataObject[] = [{value: 100, name: 'demo'}];
/** 配置项 */
    option?: IOptions = {};
    /** 请求托管 */
    autoQuery?: LegionsEchartsAutoQueryParams
}
interface IOptions extends  Omit<echarts.EChartOption,'series'>{
    series?:echarts.EChartOption.Series []
}
/* interface ISeries extends Weaken<echarts.EChartOption,'series'>{

} */
class ViewModel {
    /** 请求托管response */
    @observable response = observablePromise<LegionsEchartsAutoQueryParams['model']>()
}
/** 水滴波纹组件 */
export default class LegionsProEchartsLiquidFill extends React.Component<LegionsProEchartsLiquidFillProps>{
    static defaultProps: Readonly<LegionsProEchartsLiquidFillProps> = new LegionsProEchartsLiquidFillProps()
    viewModel = observableViewModel<ViewModel>(new ViewModel());
    /** 自动接管接口返回数据 */
    get responseData() {
        if (this.viewModel.response.isResolved&&this.props.autoQuery) {
            return this.props.autoQuery.responseTransform(this.viewModel.response)
        }
        return []
    }
    /** 配置项 */
    get option(): IOptions {
        return {
            backgroundColor: new echarts.graphic['RadialGradient'](0.3, 0.3, 0.8, [{
                offset: 0,
                color: '#1D263F'
            }, {
                offset: 1,
                color: '#111D35'
            }]),
            title: [{
                text: (0.2 * 100).toFixed(0) + '{a|%}',
                textStyle: {
                    fontSize: 25,
                    fontFamily: 'Microsoft Yahei',
                    fontWeight: 'normal',
                    color: '#bcb8fb',
                    rich: {
                        a: {
                            fontSize: 25,
                        }
                    },
                },
                //@ts-ignore
                x: 'center',
                top:'33%',
            }],

            series: [
                {

                    type: 'liquidFill',
                    radius: '80%',
                    center: ['50%', '50%'],
                    //  shape: 'roundRect',
                    data: [{
                        name: '流量统计',
                       value:0.2,
                    },0.2,0.2,0.2,],

                    label: {
                        show:true,
                        position: ['50%','60%'],
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
    getData() {
        const { autoQuery } = this.props;
        const server = new LegionsFetch()
        if (autoQuery) {
            if (autoQuery.method === 'post') {
                const res = server.post({
                    url: autoQuery.url as string,
                    model: autoQuery.model,
                    parameter: autoQuery.params,
                    headers: autoQuery.headerOption,
                })
                this.viewModel.response = observablePromise(res)
            } else {
                const res = server.get({
                    url: autoQuery.url as string,
                    model: autoQuery.model,
                    parameter: autoQuery.params,
                    headers: autoQuery.headerOption,
                })
                this.viewModel.response = observablePromise(res)
            }
        }

    }
    render() {
        const { option } = this.props;
        console.log(echarts);
        const loading = this.props.autoQuery ? this.viewModel.response.isPending : this.props.loading;
        return (
            <LegionsProEcharts
                {...this.props}
                loading={loading}
                option={merge(this.option, option)}
            ></LegionsProEcharts>
        )
    }
}
