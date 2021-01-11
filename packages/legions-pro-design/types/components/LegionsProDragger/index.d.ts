import PropTypes from 'prop-types';
import { Component } from 'react';
interface IOptions {
    group?: string | {
        name: string;
        pull: boolean | 'clone' | [];
        put: boolean | [];
    };
    /**
     * 在列表内排序
     *
     * @type {true}
     * @memberof IOptions
     */
    sort?: boolean;
    /**
     * 定义合适开始排序的时间
     *
     * @type {0}
     * @memberof IOptions
     */
    delay?: number;
    /**
     * 只有在用户使用触摸时才会延迟
     *
     * @type {false}
     * @memberof IOptions
     */
    delayOnTouchOnly?: boolean;
    /**
     * 在取消延迟拖动事件之前，该点应移动多少像素
     *
     * @type {0}
     * @memberof IOptions
     */
    touchStartThreshold?: number;
    /**
     * 如果设置为真，则禁用可排序。
     *
     * @type {false}
     * @memberof IOptions
     */
    disabled?: false;
    store?: any;
    /**
     * 动画排序时移动项目的速度，“0”-不带动画
     *ms
     * @type {150}
     * @memberof IOptions
     */
    animation?: number;
    easing?: string;
    /**
     * 在列表项中拖动手柄选择器
     *.my-handle
     * @type {".my-handle"}
     * @memberof IOptions
     */
    handle?: string;
    /**
     *
     * 过滤不需要进行拖动的选择器
     * .ignore-elements
     * @type {".ignore-elements"}
     * @memberof IOptions
     */
    filter?: string;
    /**
     *
     *
     * @type {true}
     * @memberof IOptions
     */
    preventOnFilter?: boolean;
    /**
     *
     * 指定元素中哪些项可以移动
     * .item
     * @type {".item"}
     * @memberof IOptions
     */
    draggable?: string;
    dataIdAttr?: string;
    /**
     * 放置占位符的类名
     *
     * @type {"sortable-ghost"}
     * @memberof IOptions
     */
    ghostClass?: string;
    /**
     * 选择项目名称
     *
     * @type {"sortable-chosen"}
     * @memberof IOptions
     */
    chosenClass?: string;
    /**
     * 拖动项的类名
     *
     * @type {"sortable-drag"}
     * @memberof IOptions
     */
    dragClass?: string;
    /**
     *
     * 交换区阈值
     * @type {1}
     * @memberof IOptions
     */
    swapThreshold?: number;
    /**
     * 如果设置为真，将始终使用反向交换区域
     *
     * @type {false}
     * @memberof IOptions
     */
    invertSwap?: boolean;
    /**
     * 反向交换区域的阈值（默认设置为swap threshold值）
     *
     * @type {1}
     * @memberof IOptions
     */
    invertedSwapThreshold?: number;
    /**
     *
     * 方向
     * @type {'horizontal'}
     * @memberof IOptions
     */
    direction?: 'Vertical' | 'Horizontal';
    /**
     * 忽略html5 dnd行为并强制回退
     *
     * @type {false}
     * @memberof IOptions
     */
    forceFallback?: boolean;
    /**
     *
     * 使用forcefallback时克隆的dom元素的类名
     * @type {"sortable-fallback"}
     * @memberof IOptions
     */
    fallbackClass?: string;
    /**
     *
     *
     * @type {false}
     * @memberof IOptions
     */
    fallbackOnBody?: boolean;
    /**
     *
     *
     * @type {0}
     * @memberof IOptions
     */
    fallbackTolerance?: number;
    /**
     *
     *
     * @type {false}
     * @memberof IOptions
     */
    dragoverBubble?: boolean;
    /**
     *
     *
     * @type {true}
     * @memberof IOptions
     */
    removeCloneOnHide?: boolean;
    /**
     *
     *
     * @type {5}
     * @memberof IOptions
     */
    emptyInsertThreshold?: number;
    /**
     *
     *dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
     * @memberof IOptions
     */
    setData?: (/** DataTransfer */ dataTransfer: any, /** HTMLElement*/ dragEl: any) => void;
    onChoose?: (/**Event*/ evt: any) => void;
    onUnchoose?: (/**Event*/ evt: any) => void;
    onStart?: (/**Event*/ evt: any) => void;
    /**
     * var itemEl = evt.item;  // dragged HTMLElement
        evt.to;    // target list
        evt.from;  // previous list
        evt.oldIndex;  // element's old index within old parent
        evt.newIndex;  // element's new index within new parent
        evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
        evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
        evt.clone // the clone element
        evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
     *
     * @memberof IOptions
     */
    onEnd?: (/**Event*/ evt: any) => void;
    onAdd?: (/**Event*/ evt: any) => void;
    onUpdate?: (/**Event*/ evt: any) => void;
    onSort?: (/**Event*/ evt: any) => void;
    onRemove?: (/**Event*/ evt: any) => void;
    /**
     *var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
     *
     * @memberof IOptions
     */
    onFilter?: (/**Event*/ evt: any) => void;
    /**
    //  *  Example: https://jsbin.com/nawahef/edit?js,output
    // 	evt.dragged; // dragged HTMLElement
    // 	evt.draggedRect; // DOMRect {left, top, right, bottom}
    // 	evt.related; // HTMLElement on which have guided
    // 	evt.relatedRect; // DOMRect
    // 	evt.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
    // 	originalEvent.clientY; // mouse position
    // 	// return false; — for cancel
    // 	// return -1; — insert before target
    // 	// return 1; — insert after target
     *
     * @memberof IOptions
     */
    onMove?: (/**Event*/ evt: any, /**Event*/ originalEvent: any) => void;
    onClone?: (/**Event*/ evt: any) => void;
    onChange?: (evt: any) => void;
}
interface IProps {
    /**
     *
     *
     * @type {Object}
     * @memberof IProps
     */
    options: IOptions;
    onChange?: (order: any, sortable: any, evt: any) => void;
    tag?: string;
    className?: string;
}
export default class LegionsProDragger extends Component<IProps> {
    static propTypes: {
        options: PropTypes.Requireable<object>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        tag: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        style: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        options: {};
        tag: string;
        style: {};
    };
    node: any;
    sortable: any;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: any): boolean;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
