import React from 'react';

/* export function errorBoundary(){
    return function (WrappedComponent) {
        class errorBoundary extends React.Component<{},{}>{
            ref = null
            renderwrap() {
                try {
                    console.dir(WrappedComponent,'WrappedComponent');
                    const props = {
                        ...this.props,
                    }
                    return React.createElement(WrappedComponent,props)
                }
                catch (e) {
                    console.log(e);
                    return <p>1</p>
                }
            }
            render() {
                return this.renderwrap()
            }
         }
        return errorBoundary
    }
} */