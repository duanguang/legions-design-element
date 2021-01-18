import React,{ Component } from 'react'
import { Input,Tooltip } from 'antd';
import { InputProps } from '../interface/antd';
export interface IProNumericInputProps extends InputProps {
}
function formatNumber(value) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0,num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export default class LegionsProNumericInput extends Component<IProNumericInputProps> {

    onChange = (e) => {
        const { value } = e.target;
        this.handleChange(e,value)
    }
    handleChange(even,value) {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            // @ts-ignore
            this.props.onChange(even,value);
        }
    }
    onBlur = (e) => {
        const { value,onBlur } = this.props;
        if (value && value.toString().charAt(value.length - 1) === '.' || value === '-') {
            this.handleChange(e,value.slice(0,-1))
        }
        onBlur && onBlur(e)
    }
    render() {
        const { value } = this.props;
        const title = value ? (
            <span className="numeric-input-title">
                {value !== '-' ? formatNumber(value) : '-'}
            </span>
        ) : '请输入数字';
        return (
            <Tooltip
                trigger={'focus'}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                <Input
                    maxLength="25"
                    {...this.props}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    placeholder={`${this.props.placeholder || '请输入数字'}`}

                />
            </Tooltip>
        );
    }
}
