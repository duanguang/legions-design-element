import React from 'react';
interface IProRouterProps {
    component: any;
    routerMode?: 'hash' | 'history';
    path: string;
}
export default abstract class LegionsProRouter extends React.Component<IProRouterProps> {
    gegetRouter(path: string, mode?: 'hash' | 'history'): string;
}
export {};
