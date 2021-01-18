import React from 'react';
import { bind, observer } from 'legions/store-react';
import { Row,Col,Breadcrumb } from 'antd';
import './style/index.less';
const baseCls = `legions-pro-design-breadcrumb`
interface IProps{
    value:Array<IValue>
}
interface IValue{
    name:string
    url?:string
}
@observer
export default class LegionsProBreadcrumb extends React.Component<IProps>{
   renderCrumbItem(){
       let value = this.props.value||[]
       return value.map((item,index)=>{
           return <Breadcrumb.Item key={index}>
           {item.url? <a href={item.url}>{item.name}</a>:item.name}         
         </Breadcrumb.Item>
       })
   }
   render(){
       return(
        <Row className={baseCls} style={{marginBottom:'10px',marginLeft:'13px',marginRight:'13px'}}>
           <Col span={7}>
           <div className={baseCls}>
                <div className="system">
                <Breadcrumb>
                    {this.renderCrumbItem()}
                </Breadcrumb>
                </div>
            </div>
           </Col>
        </Row>
       )
   } 
}