import { Component } from 'react';
import { InstanceFormElement } from './interface/formElement';
export default abstract class AbstractForm<P, S = {}> extends Component<P, S> {
    isFormHasError(getFieldsError: () => any): boolean;
    didMountClearNodeQueue(formref: InstanceFormElement, uid: string, eleId: string): void;
    isShouldComponentUpdate(formref: InstanceFormElement, uid: string, eleId: string): boolean;
}
