/*import ComponentClass = __React.ComponentClass;*/



/* interface Window {
    CONFIG: any,
    
} */
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

