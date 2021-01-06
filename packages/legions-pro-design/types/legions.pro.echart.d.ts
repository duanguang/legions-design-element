import LegionsProEchartsCore from './core';
import { LegionsProEchartsPropsTypes } from './interface';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default class LegionsProEcharts extends LegionsProEchartsCore<LegionsProEchartsPropsTypes> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes>;
    constructor(props: any);
}
