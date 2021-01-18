import React from 'react';
import { Input } from 'antd';
import { InputProps } from '../interface/antd';
interface IProps extends InputProps {

}
export default class LegionsProInput extends React.Component<IProps>{
    onFocus(e) {
        /** 获取焦点时全选 */
        e.target.select()
        /** 执行传入的onFocus事件 */
        this.props.onFocus && this.props.onFocus(e)
    }
    render() {
        return (
            <Input {...this.props} onFocus={this.onFocus.bind(this)}></Input>
        )
    }
}