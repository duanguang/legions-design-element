import React, { Component } from 'react'
import { AbstractSelect } from '../LegionsProSelect';
import { InstanceFormElement } from './interface/formElement';

export default abstract class  AbstractForm<P,S={}> extends Component<P,S> {
    isFormHasError(getFieldsError: () => any) {
        let error = getFieldsError && getFieldsError()
        let has = false
        for (let key in error) {
            if (error[key]) {              
                has = true
                break;
            }
        }
        return has
    }
    didMountClearNodeQueue(formref: InstanceFormElement,uid: string,eleId: string) {
        if (formref) {
            const viewStore = formref.store.get(uid)
            if (viewStore.renderNodeQueue.has(eleId)) {
                viewStore.renderNodeQueue.delete(eleId)
            }
        }
    }
    isShouldComponentUpdate(formref: InstanceFormElement,uid: string,eleId: string) {
        if (formref) {
            const viewStore = formref.store.get(uid)
            if (viewStore.renderNodeQueue.has(eleId)) {
                if (eleId === 'text') {
                    console.log(viewStore.renderNodeQueue,viewStore.renderNodeQueue.has(eleId),eleId);
                }
                viewStore.renderNodeQueue.delete(eleId)
                return true
            }
        }
        return false;
    }
}

