import { LegionsProEchartsCore } from '../LegionsProEchartsCore';
import { LegionsProEchartsPropsTypes } from '../interface/interface';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export declare class LegionsProEcharts extends LegionsProEchartsCore<LegionsProEchartsPropsTypes> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes>;
    constructor(props: any);
}
