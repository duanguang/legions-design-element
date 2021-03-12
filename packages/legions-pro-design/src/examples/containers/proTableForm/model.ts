import {
  FormRuleProperty,
  createFormRule,
} from 'legions-decorator/async.validator';
import LegionsProForm from 'components/LegionsProForm';
import { IBaseFormFields, HlLabeledValue } from 'legions-lunar/model';
import { IAntdRule } from 'legions-lunar/types/antd/form';
export class TableFormDemoField extends LegionsProForm.ProFormFields<
  TableFormDemoField
> {
  /** input */
  @FormRuleProperty({
    required: true,
    name: 'input',
    error: '',
    desc: '文本框',
  })
  input:IAntdRule[] = void 0;

  /** select */
  @FormRuleProperty({
    required: true,
    name: 'select',
    error: '',
    desc: '下拉框',
  })
  select: IAntdRule[]=void 0

  @FormRuleProperty({
    required: true,
    name: 'data',
    error: '',
    desc: '日期',
    type: 'object'
  })
  date: IAntdRule[] = void 0;
  constructor() {
    super();
  }
}
