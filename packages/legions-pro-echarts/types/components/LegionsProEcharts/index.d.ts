import LegionsProEchartsCore from '../LegionsProEchartsCore';
import { LegionsProEchartsPropsTypes } from '../interface';
export default class LegionsProEcharts<P> extends LegionsProEchartsCore<P> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes<any>>;
    constructor(props: any);
    componentDidMount(): void;
    /** 请求托管 */
    autoRequestData: (params?: any) => void;
}
