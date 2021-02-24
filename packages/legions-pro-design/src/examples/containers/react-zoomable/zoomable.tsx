/*
 * @Author: duanguang
 * @Date: 2021-02-24 14:16:28
 * @LastEditTime: 2021-02-24 14:43:09
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/react-zoomable/zoomable.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import './zoomable.less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from './content';
const defaultDragArea = "zoomable-content";
interface IProps{
    style?: React.CSSProperties;
    className?: string;
    /** default 0  主体相对移动X轴 */
    defaultPositionX?: number;
    /** default 0  主体相对移动Y轴 */
    defaultPositionY?: number;
    zoomable?: {
        used: boolean;
        /** default all 可拉伸方向 */
        direction?: ["top","right-top","right","right-bottom","bottom","left-bottom","left","left-top"];
        /** default 2 外围可拉伸范围 */
        borderWidth?: number;
        width: {
            //default 10 拉伸最小宽度
            min: number;
            //default 1000 拉伸最大宽度
            max: number;
        };
        height: {
            //default 10 拉伸最小高度
            min: number;
            //default 500 拉伸最大高度
            max: number;
        };
        /** 拉伸开始时调用,param{direction:方向,position:位置{x,y},width:宽度,height:高度} */
        onZoomStart?: () => void,//
        /** 拉伸进行中调用,param同上 */
        onZooming: () => void,//
        /** 拉伸结束时调用,param同上 */
        onZoomEnd: ()=>void//
    }
}
interface IState{
    positionX: number;
    positionY: number;
}
class Zoomable extends Component<IProps,IState> {
  constructor(props) {
    super(props);
    this.state = {
      positionX: props.defaultPositionX || 0,
      positionY: props.defaultPositionY || 0
    };
  }
  componentDidMount() {
  }
  changePosition(x, y) {
    x && this.setState({
      positionX: x
    });
    y && this.setState({
      positionY: y
    });
  }
  render() {
    const me = this;
    const { positionX, positionY } = me.state;
    const {  className="", style={}} = me.props;
    const options = Object.assign({
      handle: `.${defaultDragArea}`
    }, {
      position: {
        x: positionX,
        y: positionY
      },
      onStop: (e, node) => {
        me.changePosition(node.x, node.y);
      }
    });
    return (<div className={`transform-box ${className}`} style={{
      touchAction: "none",
      transform: `translate(${positionX}px, ${positionY}px)`,
      ...style
      }}><Content
        {...me.props}
         //@ts-ignore
        changePosition={me.changePosition.bind(me)}
        positionX={positionX}
        positionY={positionY}
      /></div>);
  }
}

export default Zoomable;