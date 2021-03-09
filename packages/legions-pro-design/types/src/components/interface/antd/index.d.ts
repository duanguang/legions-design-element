/// <reference types="react" />
import { ColProps } from 'antd/lib/grid/col';
import { ValidationRule } from 'antd/lib/form/Form';
import { OptionProps } from 'antd/lib/select';
export { InputProps } from 'antd/lib/input/Input';
export { ValidationRule };
export { WrappedFormUtils, FormComponentProps, } from 'antd/lib/form/Form';
export { TableColumnConfig, TableRowSelection } from 'antd/lib/table/Table';
export { ColProps };
export { SelectProps } from 'antd/lib/select';
export { OptionProps };
export { UploadProps } from 'antd/lib/upload/Upload';
export { DatePickerProps, MonthPickerProps, RangePickerProps, } from 'antd/lib/date-picker';
export { InputNumberProps } from 'antd/lib/input-number';
export { RadioGroupProps } from 'antd/lib/radio/group';
export { RadioButtonProps } from 'antd/lib/radio/radioButton';
export { RadioProps } from 'antd/lib/radio/radio';
export { TextAreaProps } from 'antd/lib/input/TextArea';
export { ModalProps, ModalFuncProps } from 'antd/lib/modal/Modal';
export { SwitchProps } from 'antd/lib/switch';
export { PaginationProps } from 'antd/lib/pagination';
export { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
export { SelectionDecorator } from 'antd/lib/table/SelectionCheckboxAll';
export { CheckboxProps } from 'antd/lib/checkbox/Checkbox';
export { CheckboxGroupProps } from 'antd/lib/checkbox/Group';
export { UploadFileStatus } from 'antd/lib/upload/interface';
export interface FormItemProps {
    prefixCls?: string;
    label?: React.ReactNode;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    help?: React.ReactNode;
    extra?: React.ReactNode;
    validateStatus?: 'success' | 'warning' | 'error' | 'validating';
    hasFeedback?: boolean;
    className?: string;
    required?: boolean;
    style?: React.CSSProperties;
    colon?: boolean;
}
export interface IAntdProps {
    id: string;
    name: string;
    placeholder: string;
    className?: string;
    /**
     *
     * 分组ID
     * @type {number}
     * @memberof IFormInputProps
     */
    groupId?: number;
    /**
     * 栅格占位格数，为 0 时相当于 display: none
     *
     * @type {number}
     * @memberof IAntdProps
     */
    span?: number;
    /**
     *指定跳转元素 key , 如果不指定，默认跳转下一个
     *
     * @type {string}
     * @memberof IAntdProps
     */
    nextElementKey?: string | {
        formUid: string;
        nextElementKey: string;
    };
}
export interface IAntdFormItemProps extends FormItemProps {
    /**
     * 转换表单里面数据值 暂未提供使用
     *
     * @memberof IAntdFormItemProps
     */
    transformFormItem?: <T>(value: any) => T;
    /**组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见 组件移除 */
    visible?: boolean;
    /**
     *
     * 组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见
     * 注意此隐藏只是隐藏dom 设置display:'none'，元素依然存在只是不可见，如果元素有附加验证规则，则
     * @type {Boolean}
     */
    display?: boolean;
}
export interface IAntdRule extends ValidationRule {
    required?: boolean;
    /**
     *
     *校验前转换字段值
     * @memberof IAntdRule
     */
    transform: (value: any) => any;
    /**
     * 内建校验类型
     *object: Must be of type object and not Array.isArray.
     * @type {('string'|'number'|'boolean'|'method'|'regexp'|'integer'|'float'|'object'
     *     |'array'|'date'|'upload')}
     * @memberof IAntdRule
     */
    type?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'object' | 'enum' | 'url' | 'email' | 'array' | 'date';
}
export interface IAntdSelectOption extends OptionProps {
    /**
     *
     * 默认根据此属性值进行筛选
     * @type {string}
     * @memberof IAntdSelectOption
     */
    value: string;
    key: string;
    extendedField?: string;
    /**
     * 分组信息
     *
     * @type {(string|number)}
     * @memberof IAntdSelectOption
     */
    group?: string | number;
    label?: string;
}
/** 表格表单组件列配置约束类型 */
export declare type TableFormColumnsType = 'input' | 'select' | 'date' | 'radio' | 'switch' | 'text' | 'self';
