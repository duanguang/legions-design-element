
import React from 'react';
import Store,{ StoreModules,getInjector,setInjector } from 'brain-store';
import { Provider } from 'brain-store-react'
let storeManage = getInjector()
if (!storeManage) {
  //@ts-ignore
  storeManage = setInjector(null,null)
}
export const App = (props: any) => {
    return <div>
      <Provider
        // @ts-ignore
        store={storeManage}>
        {props.children}
      </Provider>
    </div>
}
export const Apps = (props: any) => {
    return <div>
      <Provider
        // @ts-ignore
        store={storeManage}>
        {props.children}
      </Provider>
    </div>
  }