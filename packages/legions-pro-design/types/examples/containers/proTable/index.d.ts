import { LegionsProTable } from '../../../components';
interface IProps {
}
export declare class ProTable extends LegionsProTable.ProTableBaseClass<IProps, {
    size: any;
}, {}, {}> {
    status: {
        color: string;
    };
    constructor(props: IProps);
    handleSizeChange: (e: any) => void;
    render(): JSX.Element;
}
export {};
