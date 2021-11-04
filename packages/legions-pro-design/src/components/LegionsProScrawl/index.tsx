import React from 'react';
/* const ReactDOM = require('react-dom'); */
import * as ReactDOM from 'react-dom'
/* const { Paper,Rect } = require('react-raphael'); */
import { Paper,Rect } from 'react-raphael'
import './style/index.less';
import { Icon,Popover,Slider,message } from 'antd';
import { bind,observer } from 'legions/store-react'
import { observableViewModel } from 'legions/store-utils';
import { observable,computed } from 'mobx';
const redoSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/redo.png';
const redo1Src = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/redo-1.png';
const undoSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/undo1.png';
const PickcolorSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/Pickcolor.png';
import { runScriptsSdk } from 'legions-thirdparty-plugin';
const ua = navigator.userAgent.toLowerCase();
const isMobile = /iphone|ipad|ipod|Android/.test(ua);
interface IAttrs {

    /**
     *
     * 画笔颜色
     * @type {string}
     * @memberof IAttrs
     */
    stroke: string;

    /**
     * 画笔粗细大小
     *
     * @type {number}
     * @memberof IAttrs
     */
    'stroke-width': number;

    /**
     * 画笔锚点坐标
     *
     * @type {any[]}
     * @memberof IAttrs
     */
    path: any[];
    fill: string;
}
interface IProps {
    width: number;
    height: number;
    attr: { "stroke": string,opacity: number,"stroke-width": number };


    /**
     * 需要生成图片的html 元素
     * 
     * 默认document.body
     *
     * @memberof IProps
     */
    onRenderhtml2canvas?: () => HTMLElement;

    /**
     *
     * html2canvas 函数执行参数
     * @type {Object}
     * @memberof IProps
     */
    html2canvasOptions?: Object;
    onReady: (value: {
        methods: {

            /**
             * 
             * 绘制画板
             * 
             * 通过画板坐标自动绘制画板
             */
            onDrawScrawl: (value: IAttrs[]) => void,
            clear: () => void;

            /**
             * 获取画笔所有轨迹数据
             *
             */
            getLocationPath: () => IAttrs[];
        }
    }) => void

    /**
     * 保存画板时触发
     *
     * @memberof IProps
     */
    onSubmit?: (locationAttrs: IAttrs[],Image: HTMLImageElement,canvas: HTMLCanvasElement) => void;


    /**
     * 在画板显示及隐藏时触发
     *
     * @memberof IProps
     */
    onVisible?: (visible: boolean) => void
    /**
     * 父级容器节点样式名称
     * 
     * 传了此样式，坐标读取传入的元素节点
     *
     * @type {string}
     * @memberof IAttrs
     */
    parentElement?: string;
}
class ViewModel {
    @observable chochooseColor: 'red' | 'violet' | 'black' | 'blue' | 'green' | 'yellow' = 'red'

    /** 
     * 画笔属性
     *
     * @memberof ViewModel
     */
    @observable brushColor: { "stroke": string,"stroke-width": number,opacity: number } = { "stroke": "#FF3C2A","stroke-width": 6,opacity: 0.8 }


    /**
     *
     * 画板是否可见
     * @type {boolean}
     * @memberof ViewModel
     */
    @observable visible: boolean = true;


    /**
     *
     * 待还原队列
     * @type {[]}
     * @memberof ViewModel
     */
    @observable redoQueue: [] = []
    @computed get colorStyle() {
        const styles = {
            red: {
                className: 'wPaint-menu-color-icon-bred',
                value: '#FF3C2A',
            },
            violet: {
                className: 'wPaint-menu-color-icon-bviolet',
                value: '#9D4DB3',
            },
            yellow: {
                className: 'wPaint-menu-color-icon-byellow',
                value: '#E37C56',
            },
            black: {
                className: 'wPaint-menu-color-icon-bblack',
                value: '#484948',
            },
            blue: {
                className: 'wPaint-menu-color-icon-bblue',
                value: '#6CCBDD',
            },
            green: {
                className: 'wPaint-menu-color-icon-bgreen',
                value: '#77E680',
            },
        }
        return styles[this.chochooseColor]
    }
}
@observer
export default class LegionsProScrawl extends React.Component<IProps>{
    offset = {
        x: 0,
        y: 0,
    }
    paper: any = null;
    set: any[] = null;
    path: Object = null;
    d: any[];
    moving: boolean;
    viewMoDel = observableViewModel<ViewModel>(new ViewModel())
    /* modulesUid: string = ''; */
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
        // @ts-ignore
        this.viewMoDel.brushColor = this.props.attr;
    }
    static defaultProps = {
        width: 600,
        height: 400,
        attr: { "stroke": "#FF3C2A",opacity: 0.8,"stroke-width": 3 },
        modulesName: 'GeneralForm/HLScrawl',
        isNormalFlow: false,
    }
    componentDidMount() {
        this.handleStart = this.handleStart.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.setState({
            loaded: true
        })
        this.props.onReady && this.props.onReady({
            methods: {
                onDrawScrawl: this.initLocalPath.bind(this),
                clear: this.clear.bind(this),
                getLocationPath: () => {
                    let path: IAttrs[] = []
                    // @ts-ignore
                    for (var i = 0; i < this.set.items.length; i++) {
                        // @ts-ignore
                        path.push(this.set.items[i].attrs)
                    }
                    return path;
                }
            }
        })
    }
    initLocalPath(value: IAttrs[]) {
        // @ts-ignore
        const paper = this.refs.paper.getPaper();
        if (!this.set) this.set = paper.set();
        /* const attrs:IAttrs[] = eval('(' + window.localStorage.getItem('test11') + ')') */
        const attrs: IAttrs[] = value;
        if (attrs && Array.isArray(attrs)) {
            attrs.map((item) => {
                let path = paper.path();
                // @ts-ignore
                path.attr({
                    /* path: [eval('(' + window.localStorage.getItem('test11') + ')')] */
                    path: item.path,
                    stroke: item.stroke,
                    'stroke-width': item['stroke-width'],
                });
                this.set.push(path);
            })
        }
    }
    handleToImage() {
        if (!runScriptsSdk.plugins.html2canvas) {
            message.warning('Plugin is not ready to excel, Please install at the entrance(legionsThirdpartyPlugin.use({name:"html2canvas",url:"xxxx"}))');
            return;
        }
        let body = document.body;
        if (this.props.onRenderhtml2canvas) {
            body = this.props.onRenderhtml2canvas()
        }
        runScriptsSdk.plugins.html2canvas.html2canvas(body,this.props.html2canvasOptions).then((canvas) => {
            /* canvas.id = 'screenshotCanvas';
            document.body.appendChild(canvas);
            const can = document.getElementById("screenshotCanvas");
            // @ts-ignore
            can.style = "display:none"
            // @ts-ignore
            const dataURL = can.toDataURL('image/png');
            const dataImg = new Image()
            dataImg.src = dataURL
            const alink = document.createElement("a");
            alink.href = dataImg.src;
            alink.download = "附件.p ng";
            alink.click(); */
            // canvas宽度
            const canvasWidth = canvas.width;
            // canvas高度
            const canvasHeight = canvas.height;
            //@ts-ignore
            const img = legionsThirdpartyPlugin.plugins.html2canvas.Canvas2Image.convertToImage(canvas,canvasWidth,canvasHeight);
            /* Canvas2Image.saveAsPNG(canvas, canvasWidth, canvasHeight); */
            let path: IAttrs[] = []
            // @ts-ignore
            for (var i = 0; i < this.set.items.length; i++) {
                // @ts-ignore
                path.push(this.set.items[i].attrs)
            }
            /* const queryCode = serialize(path,{ ignoreFunction: false,space: 2 })
            window.localStorage.setItem('test11',queryCode) */
            this.props.onSubmit && this.props.onSubmit(path,img,canvas);
        });
    }
    handleStart(x,y,e) {
        // @ts-ignore
        this.paper = this.refs.paper.getPaper();
        let container: HTMLElement = null;
        const canvasParentContainer = this.paper.canvas.parentElement;
        if (this.props.parentElement) {
            container = document.querySelector(`.${this.props.parentElement}`);
        }
        /* this.offset = {
            x: canvasParentContainer.offsetLeft,
            y: canvasParentContainer.offsetTop,
        } */
        if (!this.set) this.set = this.paper.set();
        this.path = this.paper.path();
        let locationX = x;
        let locationY = y;
        if (container) {
            locationX = x - container.offsetLeft - canvasParentContainer.offsetLeft + container.scrollLeft;
            locationY = y - container.offsetTop - canvasParentContainer.offsetTop + container.scrollTop;
        }
        else {
            locationX = x - canvasParentContainer.offsetLeft + canvasParentContainer.scrollLeft;
            locationY = y - canvasParentContainer.offsetTop + canvasParentContainer.scrollTop;
        }
        /*  this.d = [["M",locationX - this.offset.x,locationY - this.offset.y]]; */
        this.d = [["M",locationX,locationY]];
        // @ts-ignore
        this.path.attr(this.viewMoDel.brushColor);
        // @ts-ignore
        this.path.attr({
            path: this.d
        });
        this.moving = true;
        this.set.push(this.path);
    }
    handleMove(dx,dy,x,y,e) {
        if (this.moving) {
            let locationX = x;
            let locationY = y;
            let container: HTMLDivElement = null;
            if (this.props.parentElement) {
                container = document.querySelector(`.${this.props.parentElement}`);
            }
            const canvasParentElement = this.paper.canvas.parentElement;
            if (container) {
                locationX = x - container.offsetLeft - canvasParentElement.offsetLeft + container.scrollLeft;
                locationY = y - container.offsetTop - canvasParentElement.offsetTop + container.scrollTop;
            } else {
                locationX = x - canvasParentElement.offsetLeft + canvasParentElement.scrollLeft;
                locationY = y - canvasParentElement.offsetTop + canvasParentElement.scrollTop;
            }
            /* this.d.push(["L",locationX - this.offset.x,locationY - this.offset.y]); */
            this.d.push(["L",locationX,locationY]);
            // @ts-ignore
            this.path.attr({
                path: this.d
            });
        }
        this.moving = true;
    }
    handleEnd(e) {
        this.moving = false;
    }
    clear() {
        if (!this.set) return;
        // @ts-ignore
        for (var i = 0; i < this.set.items.length; i++) {
            // @ts-ignore
            this.set.items[i].remove();
        }
        // @ts-ignore
        this.set.clear();
        this.viewMoDel.dispatchAction(() => {
            this.viewMoDel.redoQueue = [];
        })
    }
    handleChooseColor(value: 'red' | 'violet' | 'black' | 'blue' | 'green' | 'yellow') {
        this.viewMoDel.chochooseColor = value;
        this.viewMoDel.brushColor.stroke = this.viewMoDel.colorStyle.value;
    }
    handleVisible() {
        this.viewMoDel.visible = !this.viewMoDel.visible
        this.props.onVisible && this.props.onVisible(this.viewMoDel.visible)
    }

    /**
     * 撤销最后一条记录
     *
     * @returns
     * @memberof HLScrawl
     */
    handleUndo() {
        if (!this.set) return;
        // @ts-ignore
        if (this.set.items.length > 0) {
            // @ts-ignore
            const rear = this.set.items.pop()

            this.viewMoDel.dispatchAction(() => {
                // @ts-ignore
                this.viewMoDel.redoQueue.push(rear)
            })
            rear.hide()
        }
    }
    handleRedo() {
        if (!this.set) return;
        if (this.viewMoDel.redoQueue.length > 0) {
            const newArray = [...this.viewMoDel.redoQueue]
            const item = newArray.pop()
            this.viewMoDel.dispatchAction(() => {
                this.viewMoDel.redoQueue.pop()
            })
            // @ts-ignore
            for (var i = 0; i < this.set.length; i++) {
                // @ts-ignore
                if (typeof this.set[i] === 'object' && !Array.isArray(this.set[i]) && this.set[i].id === item['id']) {

                    // @ts-ignore
                    /* this.set.push(item) */
                    this.set[i].show();
                }
            }
            // @ts-ignore
            const index = this.set.items.findIndex((items) => item.id === items.id)
            if (index < 0) {
                // @ts-ignore
                this.set.items.push(item)
            }
        }
    }
    onChange = (value) => {
        this.viewMoDel.dispatchAction(() => {
            this.viewMoDel.brushColor.opacity = value / 100
        })
    }
    render() {
        var { width,height } = this.props;
        return (<div className={`${!this.viewMoDel.visible ? 'legions-pro-scrawl-paper-container-not-visible' : ''}`}>
            <Paper ref="paper" width={width} height={height}>
                <Rect x={0} y={0} width={width} height={height} drag={{ move: this.handleMove,start: this.handleStart,end: this.handleEnd }} />
            </Paper>
            <div className="legions-pro-scrawl-menu-holder" style={{ zIndex: 9 }}>
                <div className="legions-pro-scrawl-menu-icon"><img src={undoSrc} className="legions-pro-scrawl-menu-icon-img" onClick={this.handleUndo.bind(this)} /></div>
                <div className="legions-pro-scrawl-menu-icon"><img src={this.viewMoDel.redoQueue.length > 0 ? redoSrc : redo1Src} className="legions-pro-scrawl-menu-icon-img" onClick={this.handleRedo.bind(this)} /></div>
                <div className="legions-pro-scrawl-menu-icon"><Icon title={this.viewMoDel.visible ? "隐藏" : "显示"} type={this.viewMoDel.visible ? 'eye-o' : 'eye'} onClick={this.handleVisible.bind(this)} style={{ fontSize: '18px' }} className="legions-pro-scrawl-menu-antd-icon" /></div>
                {/* <div className="legions-pro-scrawl-menu-icon"><Icon type="file-jpg" style={{fontSize:'18px'}} onClick={this.handleToImage.bind(this)} className="legions-pro-scrawl-menu-antd-icon"/></div>  */}
                <div className="legions-pro-scrawl-menu-icon">
                    <Popover placement="bottomLeft" title={(<div >
                        <span style={{ float: 'left' }}>选取颜色:</span>
                        <div className={`legions-pro-scrawl-menu-color-icon-bg ${this.viewMoDel.colorStyle.className}`} />
                        <br /><span>透明度:</span><Slider defaultValue={this.viewMoDel.brushColor.opacity * 100} value={this.viewMoDel.brushColor.opacity * 100} onChange={this.onChange} min={1} max={100} />
                    </div>)} content={(<div className="legions-pro-scrawl-menu-holder">
                        <div className="legions-pro-scrawl-menu-color-icon">
                            <div className="legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bred" onClick={this.handleChooseColor.bind(this,'red')} />
                            <div className="legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bviolet" onClick={this.handleChooseColor.bind(this,'violet')} />
                            <div className="legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-byellow" onClick={this.handleChooseColor.bind(this,'yellow')} />
                            <div className="legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bblack" onClick={this.handleChooseColor.bind(this,'black')} />
                            <div className="legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bblue" onClick={this.handleChooseColor.bind(this,'blue')} />
                            <div className="legions-pro-scrawl-menu-color-icon-bg legions-pro-scrawl-menu-color-icon-bgreen" onClick={this.handleChooseColor.bind(this,'green')} />
                        </div>

                    </div>)} trigger="click">
                        <img src={PickcolorSrc} className="legions-pro-scrawl-menu-icon-img" />
                    </Popover>

                </div>

            </div>
        </div>)
    }
}