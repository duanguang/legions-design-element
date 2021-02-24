
import LegionsProEchartsCore from '../LegionsProEchartsCore';
import { echarts, LegionsProEchartsPropsTypes } from '../interface';
import {
    TitleComponent,
    GridComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import theme from '../locale/theme.json';

/** 预设组件，也是注册必须的组件 */
echarts.use(
    [TitleComponent, LegendComponent, TooltipComponent, GridComponent, CanvasRenderer]
);

export default class LegionsProEcharts extends LegionsProEchartsCore<LegionsProEchartsPropsTypes> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes> = {
        ...new LegionsProEchartsPropsTypes(),
        theme,
    }
    constructor(props) {
      super(props);
      this.echartsLib = echarts;
    }
}
