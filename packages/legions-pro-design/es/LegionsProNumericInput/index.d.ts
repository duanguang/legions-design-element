import { Component } from 'react';
import { InputProps } from '../interface/antd';
export interface IProNumericInputProps extends InputProps {
}
export default class LegionsProNumericInput extends Component<IProNumericInputProps> {
    onChange: (e: any) => void;
    handleChange(even: any, value: any): void;
    onBlur: (e: any) => void;
    render(): JSX.Element;
}
