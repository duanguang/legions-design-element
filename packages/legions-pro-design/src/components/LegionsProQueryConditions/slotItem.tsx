import React from 'react';
interface IProps {
   width?: number,
   style?: React.CSSProperties;
   name?: string;
}
export default class SlotItem extends React.Component<IProps>{
   render() {
      const style:React.CSSProperties = {float: "left",marginRight: "4px",position:'relative',width: this.props.width + "px",...this.props.style}
      return <div style={style} >{this.props.children}</div>
   }
}