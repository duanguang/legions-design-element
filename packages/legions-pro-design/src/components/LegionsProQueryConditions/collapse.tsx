import React from "react";
import { Button, Row } from 'antd';
import { findDOMNode } from 'react-dom'
interface IDidMount{
    /**
     *
     * 组件真实高度
     * @type {number}
     */
     height:number,

    /**
     *
     * 组件唯一UID
     * @type {string}
     */
    uid:string,
}
interface IProps {
    onToggle?: (visible: boolean,height: number) => void,

    /**
     *
     * 组件完成渲染时执行，有DOM结构，执行的钩子函数
     * @memberof IProps
     */
    onDidMount?: (value: IDidMount) => void,
    parentUid: string,

    /**
     * 容器宽度
     *
     * @type {number}
     * @memberof IProps
     */
    widthContainer: number,

    /**
     *
     * 默认是否展开
     * @type {boolean}
     * @memberof IProps
     */
    defaultToggle: boolean;
    ondragger?: (item:any[],key:string)=>React.ReactElement;
} 
interface IState {
    vmVisible: boolean;
    visibleLeft: boolean;
}

/**
 * 请勿外部使用，只用于搜索条件组件
 *
 * @export
 * @class CollapseUtil
 * @extends {React.Component<IProps, IState>}
 */
export default class CollapseUtil extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            vmVisible: this.props.defaultToggle,
            visibleLeft: true,
        }
    }
    componentWillMount() {
    }
    componentDidMount() {

        this.setState({
            ...this.state,
        })
    }
    getContentNodeWidth() {
        let { content } = this.slots();
        return this.getNodeWidth(content);
    }
    /**
     * 计算节点总宽度
     *
     * @param {any} items 节点集合
     * @returns
     * @memberof CollapseUtil
     */
    getNodeWidth(items) {
        let width = 0;
        if (items && items instanceof Array) {
            items.map(item => {
                let children = item.props.children;
                if (children) {
                    let clientWidth = item.props.width;
                    if (clientWidth) {
                        width += clientWidth+5;
                    }
                }
            });
        }
        return width;
    }
    /**
     * 计算solt-letf 宽度
     *
     * @returns
     * @memberof CollapseUtil
     */
    getLeftNodeWidth() {
        let { left } = this.slots();
        return this.getNodeWidth(left);
    }
    /**
     * 计算solt-show 宽度
     *
     * @returns
     * @memberof CollapseUtil
     */
    getRightNodeWidth() {
        let { right } = this.slots();
        return this.getNodeWidth(right);
    }
    get isShowCollapse() {
        let  LeftNodeWidth = this.getLeftNodeWidth() + this.getRightNodeWidth()+44;
        if((this.props.widthContainer-LeftNodeWidth) > 0){
            return true
        }
        return false
    }
    /**
 * 渲染折叠按钮
 *
 * @param {any} content
 * @returns
 * @memberof CollapseUtil
 */
    renderCollapse(content:any[]) {
        const  LeftNodeWidth = this.getLeftNodeWidth() + this.getRightNodeWidth()+44;
        const component = [<div style={{float:`left`,width:`74px`}}>
        <Button
                type="ghost"
                icon={this.state.vmVisible ? 'down' : 'up'}
            onClick={this.handleToggle.bind(this)}
                style={{ backgroundColor: `#fff`,borderColor: `#46b8da` }}>
                {this.state.vmVisible?'收起':'展开'}
        </Button>
        </div>]
        if ((this.props.widthContainer-LeftNodeWidth) > 0&&!this.state.vmVisible&&content.length) {
            return (component)
        }
        else if (this.state.vmVisible) {
            return (component)
        }
        return null;
    }
    handleToggle(){
        if (this.state.vmVisible) {
            this.setState({
                vmVisible:false
            },()=>{
                const queryDom = document.querySelector(`.${this.props.parentUid}`);
                const height = findDOMNode(queryDom).clientHeight;
                this.props.onToggle&&this.props.onToggle(false,height)
                this.props.onDidMount&&this.props.onDidMount({height,uid:this.props.parentUid})
            })
          } else {
            this.setState({
                vmVisible:true
            },()=>{
                const queryDom = document.querySelector(`.${this.props.parentUid}`);
                const height = findDOMNode(queryDom).clientHeight;
                this.props.onToggle&&this.props.onToggle(true,height)
                this.props.onDidMount&&this.props.onDidMount({height,uid:this.props.parentUid})
            })
        }
    }
    /**
   *
   *
   * @param {any} newItems
   * @param {any} component
   * @param {any} bodyWidth
   * @memberof CollapseUtil
   */
    getNodeItem(newItems, component:any[], bodyWidth:number) {
        let useWidth = bodyWidth;
        let content = [];
        newItems.content.map((item, index) => {
            let children = item.props.children;
            if (children) {
                let clientWidth = item.props.width;
                if (useWidth && clientWidth && useWidth > clientWidth) {
                    useWidth = useWidth - clientWidth-5;
                    component.push(item);
                    newItems.left.push(item);
                }
                else {
                    content.push(item);
                }
            }
            else {
                useWidth = useWidth - 5;
            }
        })
        newItems.content = [];
        newItems.content = content;
    }
    /**
   * 统计需要隐藏部分节点数据
   *
   * @param {any} items
   * @param {any} bodyWidth
   * @returns
   * @memberof CollapseUtil
   */
    renderRight(items, bodyWidth:number) {
        let component = {};
        let LeftNodeWidth = this.getNodeWidth(items)||0;
        let line = Math.ceil(LeftNodeWidth / (bodyWidth));
        let newItems = { left: [],content: items };
        if (items && Array.isArray(items) &&line&&bodyWidth&&isFinite(line)) { // 判定行数不是无穷大数字，导致内存崩溃
            for (let i = 0; i <= line; i++) {
                component[i] = [];
                this.getNodeItem(newItems, component[i], bodyWidth)
            }
        }
        return component;
    }
    /**
   * 渲染隐藏部分节点组件
   *
   * @param {any} component
   * @param {any} isShow
   * @returns
   * @memberof CollapseUtil
   */
    renderContent(component, isShow) {
        if (isShow && this.state.vmVisible) {
            let render = [];
            Object.keys(component).forEach((key,index) => {
               /*  render.push(<div style={{ float: `left`, width: `100%` }} key={index}>{component[key]}</div>) */
                render.push(component[key])
            })
            return render
        }
        return null;
    }
    renderItems(bodyWidth) {
        /* let LeftNodeWidth = 0;
        if (!this.state.vmVisible) {
            LeftNodeWidth = this.getLeftNodeWidth() + this.getRightNodeWidth() + 44;
        }
        else {
            LeftNodeWidth = this.getLeftNodeWidth();
        } */
        let LeftNodeWidth = this.getLeftNodeWidth() + this.getRightNodeWidth()+75;
        let useWidth = bodyWidth - LeftNodeWidth;
        let { content, left } = this.slots();
        let items = { left: [], content: [] };
        if (content && content instanceof Array) {
            content.map((item, index) => {
                let children = item.props.children;
                if (children) {
                    let clientWidth = item.props.width;
                    if (useWidth && clientWidth && (useWidth > clientWidth)) {
                        useWidth = useWidth - clientWidth-5;
                        items.left.push(item);
                    } else {
                        items.content.push(item);
                    }
                }
                /* else {
                    useWidth = useWidth - 5;
                } */
            })
        }
        return items;
    }
    slots() {
        let children: any = this.props.children;
        let left = children.filter(
            item =>
                item.props.slot &&
                item.props.slot === "left" &&
                item.props.children.length
        );
        let right = children.filter(
            item =>
                item.props.slot &&
                item.props.slot === "right" &&
                item.props.children.length
        );
        let content = children.filter(
            item =>
                item.props.slot &&
                item.props.slot === "content" &&
                item.props.children.length
        );
        return {
            left:left.length?left[0].props.children:[],
            right:right.length?right[0].props.children:[],
            content:content.length?content[0].props.children:[]
        };
    }
    draggerContent = (component) => {
        let render = [];
                Object.keys(component).forEach((key,index) => {
                /* render.push(<div style={{ float: `left`, width: `100%` }} key={index}>{component[key]}</div>) */
                    if (Array.isArray(component[key])) {
                        component[key].map((item) => {
                            render.push(item)
                        })
                    }
                    else{
                        render.push(component[key])
                    }
                })
                return render
    }
    render() {
        let items = this.renderItems(this.props.widthContainer);
        let component = this.renderRight(items.content, this.props.widthContainer);
        let { left,right } = this.slots(); // right: 搜索，重置按钮
        let style={}
        if (this.state.vmVisible) {
            style = {float:'right'}
        }
        /** 清除浮动，解决火狐塌陷问题 */
        return <Row>
            <div style={{ width: `100%`,lineHeight: `45px`,clear: 'both' }}>
                {this.props.ondragger && this.props.ondragger([...left,...items.left,...this.draggerContent(component)],'left')}
                
                {/* {left}
                {items.left}
                {this.renderContent(component,items.content ? true : false)} */}
                {!this.props.ondragger&&left}
                {!this.props.ondragger&&items.left}
                {/* {left}
                {items.left} */}
                {right} 
                {this.renderCollapse(items.content)}
            </div>
            <div style={{ width: `100%`,lineHeight: `45px`,clear:'both'  }}>
                {/* <div style={style}>
                {right}
                {this.renderCollapse(items.content)}
                </div> */}
                {/* {this.renderContent(component,items.content ? true : false)} */}
                {!this.props.ondragger&&this.renderContent(component,items.content ? true : false)}
            </div>
        </Row>;
    }
}
