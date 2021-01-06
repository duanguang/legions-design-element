import React, { Component } from 'react'
import { AbstractSelect } from '../LegionsProSelect';

export default class AbstractForm<P,S={}> extends Component<P,S> {
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
}
export  class AbstractSelectForm<P,S={}> extends AbstractSelect<P,S> {
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
}
