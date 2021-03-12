import LegionsProForm from 'components/LegionsProForm';
import { IAntdRule } from 'legions-lunar/types/antd/form';
export declare class TableFormDemoField extends LegionsProForm.ProFormFields<TableFormDemoField> {
    /** input */
    input: IAntdRule[];
    /** select */
    select: IAntdRule[];
    date: IAntdRule[];
    constructor();
}
