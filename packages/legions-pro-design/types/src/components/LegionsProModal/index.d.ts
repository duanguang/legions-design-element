import React from 'react';
import ModalStore from './store';
import { ILegionsProModalProps } from './interface';
import './style/index.less';
interface IProps extends ILegionsProModalProps {
    children?: React.ReactNode;
}
export declare type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
declare const LegionsProModal: {
    (props: IProps): JSX.Element;
    store: typeof ModalStore;
};
export default LegionsProModal;
