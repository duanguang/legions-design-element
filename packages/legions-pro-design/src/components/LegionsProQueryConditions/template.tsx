import React from 'react';
interface IProps{
    slot:string,
    width?:number
}
interface IState{
    vmVisible:boolean,
    visibleLeft:boolean
    bodyWidth:number

}
export default class Template extends React.Component<IProps>{
   render(){
      return <div >{this.props.children}</div>
   }
}