import { LegionsProTable } from '../../../components';
interface Materialsparames {
    baseCommodityItemNo?: string;
    createTimeEnd?: string;
    createTimeStart?: string;
    createrName?: string;
    current?: number;
    gname?: string;
    goodsCode?: string;
    isNotBlankCheckInfo?: string;
    itemNo?: string;
    size?: number;
    state?: string;
    typeName?: string;
}
interface IProps {
}
export declare class ProTable extends LegionsProTable.ProTableBaseClass<IProps, {
    size: any;
}, {}, {}> {
    parames: Materialsparames;
    status: {
        color: string;
    };
    constructor(props: IProps);
    componentWillUnmount(): void;
    handleSizeChange: (e: any) => void;
    render(): JSX.Element;
}
export {};
