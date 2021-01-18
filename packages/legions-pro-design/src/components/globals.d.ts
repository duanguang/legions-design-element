/*
 * @Author: duanguang
 * @Date: 2021-01-06 14:12:12
 * @LastEditTime: 2021-01-06 14:12:28
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/globals.d.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import {MicroAppStateActions} from 'legions-micro-service/types/interfaces'

interface IIGlobalStateEvent{
    name: string;
    scope: string;
}
declare global {    
    namespace NodeJS {        
        interface Global {
            CONFIG: any,
        }
    }
    interface Window {
        LegionsProGlobal: {
            onGlobalStateChange: (callback:(value:any,prev:any,event:IIGlobalStateEvent)=>void,options:Parameters<MicroAppStateActions['onGlobalStateChange']>[1])=>void;
            setGlobalState: (state: any,event: IIGlobalStateEvent) => void;
            appId:string
        }
    }
}

