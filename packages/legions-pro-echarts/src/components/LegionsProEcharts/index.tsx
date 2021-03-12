
import LegionsProEchartsCore from '../LegionsProEchartsCore';
import { echarts, LegionsProEchartsPropsTypes } from '../interface';
import {
    TitleComponent,
    GridComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
const theme = require('../locale/theme.json');

/** 预设组件，也是注册必须的组件 */
echarts.use(
    [TitleComponent, LegendComponent, TooltipComponent, GridComponent, CanvasRenderer]
);

export default class LegionsProEcharts<P> extends LegionsProEchartsCore<P> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes<any>> = {
        ...new LegionsProEchartsPropsTypes(),
        theme,
    }
    constructor(props) {
      super(props);
      this.echartsLib = echarts;
    }
    componentDidMount() {
        super.componentDidMount();
        /** 抛出实例 */
        this.props.onChartReady && this.props.onChartReady({
            echarts: this.echartObj,
            methods: { onSearch: this.autoRequestData}
        });
        /** 执行请求 */
        this.autoRequestData();
    }
    /** 请求托管 */
    autoRequestData = (params?: any) => {
        if (this.props.request) {
            this.echartObj.showLoading(this.props.loadingOption)
            this.props.request(params).then(res => {
                this.echartObj.setOption(res)
            }).finally(() => {
                this.echartObj.hideLoading()
            })
        }
    }
}
