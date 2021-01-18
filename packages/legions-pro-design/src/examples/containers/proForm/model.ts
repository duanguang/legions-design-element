/*
 * @Author: duanguang
 * @Date: 2021-01-15 15:42:07
 * @LastEditTime: 2021-01-15 18:36:10
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/proForm/model.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { FormRuleProperty } from 'legions-decorator';
import { IBaseFormFields } from 'legions-lunar/model';
import { ClassOf } from 'legions-lunar/types/api/typescript';
import { LegionsProForm } from '../../../components';
export class FormFields extends LegionsProForm.ProFormFields<FormFields>{
    @FormRuleProperty({
		required: true,
		name: 'uniqueKey',
		error: '唯一字段',
		desc: '唯一字段',
		type:'string',
	})
	uniqueKey: IBaseFormFields<string> = {
		value:'id',
    }
    constructor(form?: FormFields) {
        super(FormFields,form)
    }
}
