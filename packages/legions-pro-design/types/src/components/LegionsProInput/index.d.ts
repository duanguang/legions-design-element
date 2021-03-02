import React from 'react';
import { InputProps } from '../interface/antd';
interface IProps extends InputProps {
}
export default class LegionsProInput extends React.Component<IProps> {
    onFocus(e: any): void;
    render(): JSX.Element;
}
export {};
