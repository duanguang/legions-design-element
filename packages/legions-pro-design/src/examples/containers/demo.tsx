/*
 * @Author: duanguang
 * @Date: 2021-03-19 13:42:21
 * @LastEditTime: 2021-04-02 11:23:19
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/demo.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Button } from 'antd';
import React from 'react';

export default class Demo extends React.Component<{},{
    username: string; 
    val: number;
}>{
    noContrl:React.RefObject<HTMLInputElement>
    constructor(props) {
        super(props);
        this.state = {
            username: 'xiaoming',
            val:0,
        }
        this.noContrl = React.createRef();
    }
    componentWillMount() {
    }
    componentDidMount() {
        // 第一次调用
        /* this.setState({ val: this.state.val + 1 });
        console.log('first setState', this.state);

        // 第二次调用
        this.setState({ val: this.state.val + 1 });
        console.log('second setState', this.state);

        // 第三次调用
        this.setState({ val: this.state.val + 1 }, () => {
        console.log('in callback', this.state)
        }); */
        setTimeout(() => {
            // 第一次调用
            this.setState({ val: this.state.val + 1 });
            console.log('first setState', this.state);
        
            // 第二次调用
            this.setState({ val: this.state.val + 1 });
            console.log('second setState', this.state);
          });
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