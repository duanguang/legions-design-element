import * as echarts from 'echarts/core';
import LegionsProEchartsCore from '../LegionsProEchartsCore';
import { LegionsProEchartsPropsTypes } from '../interface/interface';
import {
    TitleComponent,
    TitleComponentOption,
    GridComponent,
    GridComponentOption,
    TooltipComponent,
    TooltipComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ProEchartsOption<P> = echarts.ComposeOption<
  TitleComponentOption | GridComponentOption | TooltipComponentOption | P
>;

// 预设组件，也是注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, CanvasRenderer]
);
export default  class LegionsProEcharts extends LegionsProEchartsCore<LegionsProEchartsPropsTypes> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes> = new LegionsProEchartsPropsTypes()
    constructor(props) {
      super(props);
      this.echartsLib = echarts;
    }
}
