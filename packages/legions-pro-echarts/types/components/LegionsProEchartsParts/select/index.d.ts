import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React from 'react';
import '../style/select.less';
export default class LegionsProEchartsSelect extends React.Component<SelectProps> {
    static Option: typeof Select.Option;
    render(): JSX.Element;
}
