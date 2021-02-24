import React, {Component} from 'react';
import './zoomable.less';
import Handle from './handle';
const timestamp = Date.now();
const defaultProps = {
  used: true,
  direction: ["top", "right-top", "right", "right-bottom", "bottom", "left-bottom", "left", "left-top"],
  borderWidth: 2
};
interface IProps{

}
interface IState{
    isdrawing: number;
    direction: string;
    width: number;
    height: number;
    position: {
        x: number;
        y: number;
    };
    coordinate: {
        x: number;
        y: number;
    };
    change: {
        x: number;
        y: number;
    };
    reverseX: boolean;
    reverseY: boolean;
}
class Content extends Component<IProps,IState> {
  constructor(props) {
    super(props);
    this.state = {
      isdrawing: 0,
      direction: "",
      width: 0,
      height: 0,
      position: {
        x: props.positionX,
        y: props.positionX
      },
      coordinate: {
        x: 0,
        y: 0
      },
      change: {
        x: 0,
        y: 0
      },
      reverseX: false,
      reverseY: false
    };
  }
  componentDidMount() {
      const {
        //@ts-ignore
      zoomable: {
        width = {},
        height = {}
      } = {}
    } = this.props;
    document.documentElement.onmousemove = (event) => {
        const { isdrawing,direction } = this.state;
      if (isdrawing) {
        direction.split("-").forEach(item => Handle[`${item}Move`](this, event));
      }
    };
    document.documentElement.onmouseup = () => {
      const { isdrawing } = this.state;
      if (isdrawing) {
        Handle.mouseupHandle(this);
      }
    };
    const childNode = document.querySelector(`.size${timestamp}`).childNodes[0];
      this.setState({
         //@ts-ignore
          width: this.defaultSize(childNode.offsetWidth,width.min,width.max),
           //@ts-ignore
      height: this.defaultSize(childNode.offsetHeight, height.min, height.max)
    });
  }
  defaultSize(defaultSize, min, max) {
    if (min && min > defaultSize) {
      return min;
    } else if (max && max < defaultSize) {
      return max;
    } else {
      return defaultSize;
    }
  }
  boxStyle(props) {
    let padding = [{
      top: 0
    }, {
      right: 0
    }, {
      bottom: 0
    }, {
      left: 0
    }];
    const borderWidth = props.used ? `${props.borderWidth}px` : 0;
      props.direction.forEach(item => {
         //@ts-ignore
      padding = padding.map(direction => {
        if (typeof direction === 'object') {
          const key = Object.keys(direction)[0];
          if (item.indexOf(key) > -1) {
            return borderWidth;
          }
        }
        return direction;
      });
    });
    return {
      padding: padding.map(item => {
        if (typeof item === 'object') {
          return item[0];
        }
        return item;
      }).join(" ")
    };
  }
  render() {
      const me = this;
       //@ts-ignore
    const {children, zoomable, fixedWidth, fixedHeight} = me.props;
    const props = Object.assign({}, defaultProps, zoomable);
    return <div className="zoomable-box" style={me.boxStyle(props)}>
      <div className="zoomable-content" style={{
        width: fixedWidth || Handle.calculation(me, "width"),
        height: fixedHeight || Handle.calculation(me, "height")
      }}>
        <div className={`stretchable-size size${timestamp}`}>
          {children}
        </div>
      </div>
      {props.used && props.direction.map(item => {
        let border = props.borderWidth;
          item.indexOf('-') > -1 && ++border;
          console.log(item,'item');
        return <div
          key={item}
          className={`zoom-bar ${item}-bar`}
          style={{
            width: `${border}px`,
            height: `${border}px`
          }}
          onMouseDown={(e) => {
            Handle.mousedownHandle(me, e, item);
          }}
        ></div>;
      })}
    </div>;
  }
}

export default Content;