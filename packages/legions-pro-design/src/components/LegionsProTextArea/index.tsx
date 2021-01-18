import React from 'react';
import { Input } from 'antd';
import { InputProps, TextAreaProps } from '../interface/antd';
import { HTMLTextareaProps } from 'antd/lib/input/TextArea';
const {TextArea} = Input;

interface IProps extends TextAreaProps{
    
}
export declare type LegionsProTextAreaProps = IProps & HTMLTextareaProps
export default class LegionsProTextArea extends React.Component<LegionsProTextAreaProps>{
    onFocus(e){
            /** 获取焦点时全选 */
            e.target.select()
            /** 执行传入的onFocus事件 */
            this.props.onFocus&&this.props.onFocus(e)

    }
    render(){
        return(
            <TextArea {...this.props} onFocus={this.onFocus.bind(this)}></TextArea>
        )
    } 
}