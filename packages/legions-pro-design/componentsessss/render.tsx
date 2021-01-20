import React from 'react';
//@ts-ignore
import { StoreManage,getInjector,setInjector } from 'brain-store'
import { Provider } from 'brain-store-react'
import { createHashHistory } from "history";
import invariant from 'invariant';
import warning from 'warning';
const NODE_ENV = process.env.NODE_ENV;
const brain=function (options) {
    options = options || {};
    let {router, history,enableDevTools} = options;
    if (router && !history) {
        history = createHashHistory();
    }
    const initialState = options.initialState || {};

    let storeManage =getInjector()
    if (!storeManage) {
        //@ts-ignore
        storeManage =  setInjector(history,initialState)
    }
    //const storeManage =(app&&app._stores&&NODE_ENV!=='production')?app._stores:new StoreManage({history, initialState});
    const app = {
        _history: history,
        _stores: storeManage,
        use,
        // router,
        start
    };
    return app;
    function use(hooks) {
    }

    function mount(s) {
        return storeManage.store(s);
    }

    function start(componentClass, container) {
        invariant(typeof componentClass === 'function', 'componentClass should be function');

        // support selector
        if (typeof container === 'string') {
            container = document.querySelector(container);
            invariant(container, `app.start: could not query selector: ${container}`);
        }
        invariant(!container || isHTMLElement(container), 'app.start: container should be HTMLElement');
        // invariant(this._router, 'app.start: router should be defined');

        if (container) {
            render(container, storeManage, this, componentClass);
            /* plugin.apply('onHmr')(render.bind(this, container, storeManage, this));        */    
        } else {
            return getApp(storeManage, this, componentClass);
        }
    }
    function render(container, store, app, componentClass) {
        const ReactDOM = require('react-dom');
        ReactDOM.render(React.createElement(getApp(store, app, componentClass)), container);
    }
    function isHTMLElement(node) {
        return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
    }
    function getApp(store, app, componentClass) {
        return extraProps => {
            const element = React.createElement(componentClass, {app, ...extraProps});
            return (
                <div>
                    <Provider store={store}>
                        {app._history ? (
                            {element}
                        ) : element}
                    </Provider>
                </div>
            )
        }

    }

}

export default brain;