import React from 'react';
import { TextAreaProps } from '../interface/antd';
import { HTMLTextareaProps } from 'antd/lib/input/TextArea';
interface IProps extends TextAreaProps {
}
export declare type LegionsProTextAreaProps = IProps & HTMLTextareaProps;
export default class LegionsProTextArea extends React.Component<LegionsProTextAreaProps> {
    onFocus(e: any): void;
    render(): JSX.Element;
}
export {};
