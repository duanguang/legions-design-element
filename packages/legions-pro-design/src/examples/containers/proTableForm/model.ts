/*
 * @Author: duanguang
 * @Date: 2021-03-31 10:18:42
 * @LastEditTime: 2021-11-17 00:02:11
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/proTableForm/model.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import {
  FormRuleProperty,
  createFormRule,
} from 'legions-decorator/async.validator';
import LegionsProForm from 'components/LegionsProForm';
export class TableFormDemoField extends LegionsProForm.ProFormFields {
  /** input */
  @FormRuleProperty({
    required: true,
    name: 'input',
    error: '',
    desc: '文本框',
  })
  input:string = void 0;

  /** select */
  @FormRuleProperty({
    required: true,
    name: 'select',
    error: '',
    desc: '下拉框',
  })
  select=void 0

  @FormRuleProperty({
    required: true,
    name: 'data',
    error: '',
    desc: '日期',
    type: 'object'
  })
  date = void 0;
}
