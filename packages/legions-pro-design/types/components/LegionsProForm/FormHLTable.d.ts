import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import { Omit } from '../interface';
import AbstractForm from './AbstractForm';
import { InstanceFormElement } from './interface/formElement';
import { IProTableProps } from '../LegionsProTable/interface';
export declare class LabelWithHLTableModel {
    iAntdProps: IAntdProps;
    iFormWithTable: IFormHLTableProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormWithTable: IFormHLTableProps, rules?: IAntdRule[]);
}
export interface IFormHLTableProps extends Partial<Pick<IProTableProps, 'uniqueKey' | 'total' | 'onPagingQuery' | 'loading'>>, Omit<IProTableProps, 'uniqueKey' | 'total' | 'onPagingQuery' | 'loading'>, IAntdFormItemProps {
}
interface IFormWithSwitch {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithTable: IFormHLTableProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
}
interface ISate {
}
export default class FormHLTable extends AbstractForm<IFormWithSwitch, ISate> {
    FormUploadRef: InstanceFormElement;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
