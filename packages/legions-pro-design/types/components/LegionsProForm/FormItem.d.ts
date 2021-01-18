import { WrappedFormUtils, IAntdFormItemProps, IAntdRule } from '../interface/antd';
import AbstractForm from './AbstractForm';
export interface IFormItemProps extends IAntdFormItemProps {
    form: WrappedFormUtils;
    className?: string;
    itemName: string;
    rules: IAntdRule[];
}
export default class HLFormItem extends AbstractForm<IFormItemProps> {
    constructor(props: any);
    render(): JSX.Element;
}
