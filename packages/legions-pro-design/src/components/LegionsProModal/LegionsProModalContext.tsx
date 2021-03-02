/*
 * @Author: duanguang
 * @Date: 2021-02-02 10:10:12
 * @LastEditTime: 2021-03-02 14:09:21
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProModal/LegionsProModalContext.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React,{ Component } from 'react'
import { PropTypes,Provider,MobXProviderContext } from "mobx-react";
import { getInjector } from 'legions/store';
interface IProps{
    /** 弹窗内容区组件 */
    content: React.ReactNode;
    /** 模态框组件 */
    modal?: React.ReactNode;
    // @ts-ignore
    children?:any;
}
export class LegionsProModalContext extends React.Component<IProps> {
    renderMobXProviderContext() {
        return <MobXProviderContext.Consumer>
            {
                (context) => {
                    // @ts-ignore
                return React.cloneElement(this.props.modal||this.props.children,null,<Provider storeManage={context.storeManage}> {this.props.content}</Provider>)
                }
        
            }
        </MobXProviderContext.Consumer>
    }
    renderContextType() {
        return React.cloneElement(this.props.modal||this.props.children,null,<Provider storeManage={this.context.storeManage['getState']?this.context.storeManage:getInjector()}> {this.props.content}</Provider>)
    }
    render() {
      return (
        this.renderContextType()
      );
    }
}
LegionsProModalContext.contextType= MobXProviderContext