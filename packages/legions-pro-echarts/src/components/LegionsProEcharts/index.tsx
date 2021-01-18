import echarts from 'echarts/lib/echarts';
import React from 'react';
import LegionsProEchartsCore from '../LegionsProEchartsCore';
import { LegionsProEchartsPropsTypes } from '../interface/interface';
/* 默认加载下列组件，其他组件按需引入 */
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default  class LegionsProEcharts extends LegionsProEchartsCore<LegionsProEchartsPropsTypes> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes> = new LegionsProEchartsPropsTypes()
    constructor(props) {
      super(props);
      this.echartsLib = echarts;
    }
}
