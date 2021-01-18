import React from 'react';
import { Route,Switch } from 'legions/router';

interface IProRouterProps{
    component:any
    routerMode?:'hash'|'history'
    path:string
}

export default abstract class LegionsProRouter extends React.Component<IProRouterProps>{
    gegetRouter(path:string,mode:'hash'|'history'='hash'){
        path =mode==='history'?`${window.location.pathname}`:path
        return path
   }
}