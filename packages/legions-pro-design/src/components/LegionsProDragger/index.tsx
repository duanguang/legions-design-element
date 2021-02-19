import { Row } from 'antd';
import PropTypes from 'prop-types';
import React,{ Component } from 'react';
import SortableJS from 'sortablejs';

const store = {
    nextSibling: null,
    activeComponent: null
};
interface IOptions {
    group?: string | {
        name: string,
        pull: boolean | 'clone' | [],
        put: boolean | []
    },  // or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }

    /**
     * 在列表内排序
     *
     * @type {true}
     * @memberof IOptions
     */
    sort?: boolean,  // sorting inside list

	/**
     * 定义合适开始排序的时间
     *
     * @type {0}
     * @memberof IOptions
     */
    delay?: number, // time in milliseconds to define when the sorting should start

	/**
     * 只有在用户使用触摸时才会延迟
     *
     * @type {false}
     * @memberof IOptions
     */
    delayOnTouchOnly?: boolean, // only delay if user is using touch

	/**
     * 在取消延迟拖动事件之前，该点应移动多少像素
     *
     * @type {0}
     * @memberof IOptions
     */
    touchStartThreshold?: number, // px, how many pixels the point should move before cancelling a delayed drag event

	/**
     * 如果设置为真，则禁用可排序。
     *
     * @type {false}
     * @memberof IOptions
     */
    disabled?: false, // Disables the sortable if set to true.
    store?: any,  // @see Store

	/**
     * 动画排序时移动项目的速度，“0”-不带动画
     *ms
     * @type {150}
     * @memberof IOptions
     */
    animation?: number,  // ms, animation speed moving items when sorting, `0` — without animation
    easing?: string, // Easing for animation. Defaults to null. See https://easings.net/ for examples.

	/**
     * 在列表项中拖动手柄选择器
     *.my-handle
     * @type {".my-handle"}
     * @memberof IOptions
     */
    handle?: string,  // Drag handle selector within list items

	/**
     *
     * 过滤不需要进行拖动的选择器
     * .ignore-elements
     * @type {".ignore-elements"}
     * @memberof IOptions
     */
    filter?: string,  // Selectors that do not lead to dragging (String or Function)

	/**
     *
     *
     * @type {true}
     * @memberof IOptions
     */
    preventOnFilter?: boolean, // Call `event.preventDefault()` when triggered `filter`

	/**
     *
     * 指定元素中哪些项可以移动
     * .item
     * @type {".item"}
     * @memberof IOptions
     */
    draggable?: string,  // Specifies which items inside the element should be draggable

    dataIdAttr?: string,


	/**
     * 放置占位符的类名
     *
     * @type {"sortable-ghost"}
     * @memberof IOptions
     */
    ghostClass?: string,  // Class name for the drop placeholder

	/**
     * 选择项目名称
     *
     * @type {"sortable-chosen"}
     * @memberof IOptions
     */
    chosenClass?: string,  // Class name for the chosen item

	/**
     * 拖动项的类名
     *
     * @type {"sortable-drag"}
     * @memberof IOptions
     */
    dragClass?: string,  // Class name for the dragging item


	/**
     *
     * 交换区阈值
     * @type {1}
     * @memberof IOptions
     */
    swapThreshold?: number, // Threshold of the swap zone

	/**
     * 如果设置为真，将始终使用反向交换区域
     *
     * @type {false}
     * @memberof IOptions
     */
    invertSwap?: boolean, // Will always use inverted swap zone if set to true

	/**
     * 反向交换区域的阈值（默认设置为swap threshold值）
     *
     * @type {1}
     * @memberof IOptions
     */
    invertedSwapThreshold?: number, // Threshold of the inverted swap zone (will be set to swapThreshold value by default)

	/**
     *
     * 方向
     * @type {'horizontal'}
     * @memberof IOptions
     */
    direction?: 'Vertical' | 'Horizontal', // Direction of Sortable (will be detected automatically if not given)


	/**
     * 忽略html5 dnd行为并强制回退
     *
     * @type {false}
     * @memberof IOptions
     */
    forceFallback?: boolean,  // ignore the HTML5 DnD behaviour and force the fallback to kick in


	/**
     *
     * 使用forcefallback时克隆的dom元素的类名
     * @type {"sortable-fallback"}
     * @memberof IOptions
     */
    fallbackClass?: string,  // Class name for the cloned DOM Element when using forceFallback

	/**
     *
     *
     * @type {false}
     * @memberof IOptions
     */
    fallbackOnBody?: boolean,  // Appends the cloned DOM Element into the Document's Body

	/**
     *
     *
     * @type {0}
     * @memberof IOptions
     */
    fallbackTolerance?: number, // Specify in pixels how far the mouse should move before it's considered as a drag.


	/**
     *
     *
     * @type {false}
     * @memberof IOptions
     */
    dragoverBubble?: boolean,

	/**
     *
     *
     * @type {true}
     * @memberof IOptions
     */
    removeCloneOnHide?: boolean, // Remove the clone element when it is not showing, rather than just hiding it

	/**
     *
     *
     * @type {5}
     * @memberof IOptions
     */
    emptyInsertThreshold?: number, // px, distance mouse must be from empty sortable to insert drag element into it


	/**
     *
     *dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
     * @memberof IOptions
     */
    setData?: (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) => void,

    // Element is chosen
    onChoose?: (/**Event*/evt) => void,

    // Element is unchosen
    onUnchoose?: (/**Event*/evt) => void,

    // Element dragging started
    onStart?: (/**Event*/evt) => void,



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
    onEnd?: (/**Event*/evt) => void,

    // Element is dropped into the list from another list
    onAdd?: (/**Event*/evt) => void,

    // Changed sorting within list
    onUpdate?: (/**Event*/evt) => void,

    // Called by any change to the list (add / update / remove)
    onSort?: (/**Event*/evt) => void,

    // Element is removed from the list into another list
    onRemove?: (/**Event*/evt) => void,


	/**
     *var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
     *
     * @memberof IOptions
     */
    onFilter?: (/**Event*/evt) => void,



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
    onMove?: (/**Event*/evt, /**Event*/originalEvent) => void,

    // Called when creating a clone of element
    onClone?: (/**Event*/evt) => void,

    // Called when dragging element changes position
    onChange?: (evt) => void
}
interface IProps {

    /**
     *
     * 
     * @type {Object}
     * @memberof IProps
     */
    options: IOptions,
    onChange?: (order,sortable,evt) => void

    tag?: string;
    className?: string;
}
export default class LegionsProDragger extends Component<IProps> {
    static propTypes = {
        options: PropTypes.object,
        onChange: PropTypes.func,
        tag: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),
        style: PropTypes.object
    };

    static defaultProps = {
        options: {},
        tag: 'div',
        style: {}
    };
    node = null;
    sortable = null;

    componentDidMount() {
        const options = { ...this.props.options };

        [
            'onChoose',
            'onStart',
            'onEnd',
            'onAdd',
            'onUpdate',
            'onSort',
            'onRemove',
            'onFilter',
            'onMove',
            'onClone'
        ].forEach((name) => {
            const eventHandler = options[name];

            options[name] = (...params) => {
                const [evt] = params;

                if (name === 'onChoose') {
                    store.nextSibling = evt.item.nextElementSibling;
                    store.activeComponent = this;
                } else if ((name === 'onAdd' || name === 'onUpdate') && this.props.onChange) {
                    const items = this.sortable.toArray();
                    const remote = store.activeComponent;
                    const remoteItems = remote.sortable.toArray();

                    const referenceNode = (store.nextSibling && store.nextSibling.parentNode !== null) ? store.nextSibling : null;
                    evt.from.insertBefore(evt.item,referenceNode);
                    if (remote !== this) {
                        const remoteOptions = remote.props.options || {};

                        if ((typeof remoteOptions.group === 'object') && (remoteOptions.group.pull === 'clone')) {
                            // Remove the node with the same data-reactid
                            evt.item.parentNode.removeChild(evt.item);
                        }

                        remote.props.onChange && remote.props.onChange(remoteItems,remote.sortable,evt);
                    }

                    this.props.onChange && this.props.onChange(items,this.sortable,evt);
                }

                if (evt.type === 'move') {
                    const [evt,originalEvent] = params;
                    const canMove = eventHandler ? eventHandler(evt,originalEvent) : true;
                    return canMove;
                }

                setTimeout(() => {
                    eventHandler && eventHandler(evt);
                },0);
            };
        });

        this.sortable = SortableJS.create(this.node,options);
    }

    shouldComponentUpdate(nextProps) {
        // If onChange is null, it is an UnControlled component
        // Don't let React re-render it by setting return to false
        if (!nextProps.onChange) {
            return false;
        }
        return true;
    }

    componentWillUnmount() {
        if (this.sortable) {
            this.sortable.destroy();
            this.sortable = null;
        }
    }

    render() {
        const {
            tag: Component,
            options, // eslint-disable-line
            onChange, // eslint-disable-line
            //@ts-ignore
            style,
            children,
            ...props
        } = this.props;
        return (
            // @ts-ignore
            <Component
                style={{width:'100%',display:'inline-block'}}
                {...props}
                //@ts-ignore
                ref={node => {
                    this.node = node;
                }}
            >
                {this.props.children}
            </Component>
        );
    }
}