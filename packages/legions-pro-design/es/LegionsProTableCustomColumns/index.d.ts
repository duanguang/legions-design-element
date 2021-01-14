import { Component } from 'react';
import { InstanceLegionsProModal } from '../LegionsProModal/interface';
import { ProTableStore } from '../store/pro.table';
interface IProps {
    /**
     * 列配置归属table表
     *
     * @type {string}
     * @memberof IProps
     */
    tableUid: string;
    store?: ProTableStore;
    /**
    *  组件componentWillMount 执行
    *
    * @memberof IHLTableProps
    */
    onReady?: (instance: InstanceLegionsProModal) => void;
    /** 本地数据同步到服务端的接口 */
    customColumnsConfig: {
        /** 编辑自定义信息同步到服务端接口地址 */
        editApi: string;
        /** 从服务端查询自定义列信息接口地址 */
        queryApi: string;
    };
}
interface IState {
    columns?: {
        dataIndex: string;
        title: string;
    }[];
}
export default class LegionsProTableCustomColumns extends Component<IProps, IState> {
    modalRef: InstanceLegionsProModal;
    constructor(props: any);
    componentDidMount(): void;
    get viewStore(): any;
    render(): JSX.Element;
}
export {};
