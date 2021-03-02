import React from 'react';
import UserInfoStore from 'examples/stores/UserInfoStore';
import { MenuStore } from 'components/store/pro.layout';
import { InstanceLegionsProModal } from 'components/LegionsProModal/interface';
import { InstanceProTable } from 'components/LegionsProTable/interface';
interface IProps {
    store?: UserInfoStore;
    menuStore?: MenuStore;
}
interface IState {
}
export declare class ProLayout extends React.Component<IProps, IState> {
    modalContentType: 'pass' | 'task' | '';
    modalRef: InstanceLegionsProModal;
    taskCenterTableRef: InstanceProTable;
    constructor(props: IProps);
    componentDidMount(): void;
    /** 删除异步任务 */
    exportTaskDelete(ids: string): void;
    onLoginOut(): void;
    render(): JSX.Element;
}
export {};
