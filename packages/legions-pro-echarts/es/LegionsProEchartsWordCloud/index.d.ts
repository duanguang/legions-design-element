import 'echarts-wordcloud';
import React from 'react';
import { LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
export declare class LegionsProEchartsWordCloudProps extends LegionsProEchartsPropsTypes<any> {
    /** 数据 */
    data?: Object;
}
export default class LegionsProEchartsWordCloud extends React.Component<LegionsProEchartsWordCloudProps> {
    static defaultProps: Readonly<LegionsProEchartsWordCloudProps>;
    /** 配置项 */
    get option(): LegionsProEchartsOption;
    render(): JSX.Element;
}
