/*
 * @Author: duanguang
 * @Date: 2021-03-19 13:42:21
 * @LastEditTime: 2021-03-22 09:57:59
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/demo.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Button } from 'antd';
import React from 'react';
export default class Demo extends React.Component<{},{
    username: string; 
}>{
    noContrl:React.RefObject<HTMLInputElement>
    constructor(props) {
        super(props);
        this.state = {
            username:'xiaoming'
        }
        this.noContrl = React.createRef();
    }
    componentWillMount() {
    }
    
    render() {
        console.log(this.noContrl);
        return <React.Fragment>
            <input defaultValue="111"
                onChange={(e) => {
                    console.log( e.target.value,this.noContrl.current.value);
                }}
                ref={this.noContrl} />
            <Button onClick={() => {
                console.log(this.noContrl,this.noContrl.current.value);
                this.setState({
                    username:'222'
                })
                this.noContrl.current.value='222'
            }}>获取{this.state.username}</Button>
        </React.Fragment>
    }
}