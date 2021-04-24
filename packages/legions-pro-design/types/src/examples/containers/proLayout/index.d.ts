import React from 'react';
import UserInfoStore from '../../stores/UserInfoStore';
import LegionsStoreLayout from '../../../components/LegionsStoreLayout';
import { InstanceProModal } from '../../../components/LegionsProModal/interface';
import { InstanceProTable } from '../../../components/LegionsProTable/interface';
interface IProps {
    store?: UserInfoStore;
    menuStore?: InstanceType<typeof LegionsStoreLayout['MenuStore']>;
}
interface IState {
}
export declare class ProLayout extends React.Component<IProps, IState> {
    modalContentType: 'pass' | 'task' | '';
    modalRef: InstanceProModal;
    taskCenterTableRef: InstanceProTable;
    constructor(props: IProps);
    componentDidMount(): void;
    /** 删除异步任务 */
    exportTaskDelete(ids: string): void;
    onLoginOut(): void;
    render(): JSX.Element;
}
export {};
