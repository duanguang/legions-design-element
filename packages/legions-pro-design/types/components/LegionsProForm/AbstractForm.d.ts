import { Component } from 'react';
import { AbstractSelect } from '../LegionsProSelect';
export default class AbstractForm<P, S = {}> extends Component<P, S> {
    isFormHasError(getFieldsError: () => any): boolean;
}
export declare class AbstractSelectForm<P, S = {}> extends AbstractSelect<P, S> {
    isFormHasError(getFieldsError: () => any): boolean;
}
