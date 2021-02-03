import { LegionsProTable } from '../../../components';
interface IProps {
}
export declare class ProTable extends LegionsProTable.ProTableBaseClass<IProps, {}, {}, {}> {
    status: {
        color: string;
    };
    constructor(props: IProps);
    render(): JSX.Element;
}
export {};
