import { Component } from 'react';
import UserInfoStore from 'examples/stores/UserInfoStore';
interface IState {
    loading: boolean;
    pageIndexSelect: number;
    visible: boolean;
    page: number;
    pageSize: number;
    pageSelelctList: {
        key: string;
        value: string;
    }[];
    selectList: {
        key: string;
        value: string;
    }[];
}
interface IProps {
    store?: UserInfoStore;
}
export default class ProSelectDemo extends Component<IProps, IState> {
    data: any[];
    constructor(props: {});
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
