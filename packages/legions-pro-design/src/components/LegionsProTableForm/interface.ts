import { ITableColumnConfigProps } from "../LegionsProTable/interface";
export interface IProTableFormColumnConfigGenProps{
    /** 表格行状态
     * 
     * true 编辑状态
     * 
     * false 非编辑状态
     */
    readonly isRecordEdit: boolean;
    /** 表格行key */
    readonly legionsTableFormItemKey: string;
}
export interface IProTableFormColumnConfigProps<T> extends ITableColumnConfigProps<T & IProTableFormColumnConfigGenProps>{}