import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio/group';
import React from 'react';
import '../style/radio.less';
interface IProps extends RadioGroupProps {
    /** 主题 */
    theme?: 'default' | 'card';
}
export default class LegionsProEchartsRadio extends React.Component<IProps> {
    static Button: typeof Radio.Button;
    static defaultProps: IProps;
    render(): JSX.Element;
}
export {};
