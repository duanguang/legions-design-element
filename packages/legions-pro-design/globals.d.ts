/*import ComponentClass = __React.ComponentClass;*/

declare var __DEV__:boolean;

interface Window {
    CONFIG: any
}

export {};
declare global {    
    namespace NodeJS {        
        interface Global {
            CONFIG: any,
        }
    }
    interface Window {
    }
}