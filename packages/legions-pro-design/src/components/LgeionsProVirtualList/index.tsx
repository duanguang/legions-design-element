import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import throttleWithRAF from './throttleWithRAF';
import getVisibleItemBounds from './getVisibleItemBounds';
import defaultMapToVirtualProps from './defaultMapVirtualToProps';
interface IOptions {
    container: React.DOMElement<any, any>,
    initialState: {
        firstItemIndex: number,
        lastItemIndex: number,
    }
}
interface IState {
    firstItemIndex: number,
    lastItemIndex: number,
}
interface IProps{
    items:[],
    itemHeight:number,
    itemBuffer:number,
}
const LegionsProVirtualList = (options?: IOptions, mapVirtualToProps = defaultMapToVirtualProps) => (InnerComponent) => {
    return class vlist extends PureComponent<IProps, IState> {
        _isMounted = false;
        domNode = null
        static propTypes = {
            items: PropTypes.array.isRequired,
            itemHeight: PropTypes.number.isRequired,
            itemBuffer: PropTypes.number,
        };
        static defaultProps = {
            itemBuffer: 0,
        };
        options: IOptions
        constructor(props) {
            super(props);
            this.options = {
                container: typeof window !== 'undefined' ? window : undefined,
                ...options,
            };

            this.state = {
                firstItemIndex: 0,
                lastItemIndex: -1,
            };
            // initialState allows us to set the first/lastItemIndex (useful for server-rendering)
            if (options && options.initialState) {
                this.state = {
                    ...this.state,
                    ...options.initialState,
                };
            }
            this.refreshState = this.refreshState.bind(this);
            // if requestAnimationFrame is available, use it to throttle refreshState
            if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
                this.refreshState = throttleWithRAF(this.refreshState);
            }
        }
        componentWillMount() {
            this._isMounted = true;
        }
        componentDidMount() {
            // cache the DOM node
            this.domNode = ReactDOM.findDOMNode(this);

            // we need to refreshState because we didn't have access to the DOM node before
            this.refreshState();

            // add events
            // @ts-ignore
            this.options.container.addEventListener('scroll', this.refreshState);
            // @ts-ignore
            this.options.container.addEventListener('resize', this.refreshState);
        };
        componentWillUnmount() {
            this._isMounted = false;

            // remove events
            // @ts-ignore
            this.options.container.removeEventListener('scroll', this.refreshState);
            // @ts-ignore
            this.options.container.removeEventListener('resize', this.refreshState);
        };
        // if props change, just assume we have to recalculate
        componentWillReceiveProps(nextProps) {
            const { itemHeight, items, itemBuffer } = nextProps;

            this.setStateIfNeeded(this.domNode, this.options.container, items, itemHeight, itemBuffer);
        };
        setStateIfNeeded(list, container, items, itemHeight, itemBuffer) {
            // get first and lastItemIndex
            console.dir(container,'container')
            const state = getVisibleItemBounds(list, container, items, itemHeight, itemBuffer);

            if (state === undefined) { return; }

            if (state.firstItemIndex > state.lastItemIndex) { return; }

            if (state.firstItemIndex !== this.state.firstItemIndex || state.lastItemIndex !== this.state.lastItemIndex) {
                this.setState(state);
            }
        }
        refreshState() {
            if (!this._isMounted) {
                return;
            }

            const { itemHeight, items, itemBuffer } = this.props;

            this.setStateIfNeeded(this.domNode, this.options.container, items, itemHeight, itemBuffer);
        };
        render() {
            console.log(this.props,{...mapVirtualToProps(this.props, this.state)},this.state)
            return (<InnerComponent {...this.props} {...mapVirtualToProps(this.props, this.state)}/>);
        };
    }
}
export default LegionsProVirtualList;