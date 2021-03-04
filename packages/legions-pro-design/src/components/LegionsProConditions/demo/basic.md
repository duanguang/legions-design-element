---
order: 0
title:
  zh-CN: 高级用法
  en-US: 高级用法
---

## zh-CN

筛选条件使用配置示例


## en-US

```tsx
import create from '../../../common/components/render.tsx';
import { Button, Row ,Col,Form} from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProConditions } from 'legions-pro-design';
import { IQueryConditionsInstance} from 'legions-pro-design/LegionsProConditions/interface';
import { ClassOf } from 'legions-lunar/types/api/typescript';
const FormItem = Form.Item;
import moment from 'moment';
import { observable } from 'legions/store';
import { ObservableMap,runInAction } from 'mobx';

interface IProps {}
interface IState{
  visibleText:boolean;
  visible:boolean;
  disabledText:boolean
}
class ProQueryDemo extends React.Component<IProps,IState> {
  queryRef: IQueryConditionsInstance = null
  constructor(props: IProps) {
    super(props);
    this.state={
      visibleText: false,
      disabledText:true,
      visible:true,
    }
  }
  createConfig() {
        const ConditionsUtils = new LegionsProConditions.ProConditions();
        ConditionsUtils.renderTextConfig({
            containerProps: {
                col: {
                    md: 4,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo'
            },
            conditionsProps: {
                label: '司机姓名',
                labelSpan: 5,
                defaultValue:'司机姓名',
                onChange: (event,value,viewStore) => {
                    console.log(event,value,viewStore,'司机姓名');
                }
            },
            jsonProperty:'orderNo'
        })
        ConditionsUtils.renderTextAreaConfig({
            containerProps: {
                col: {
                    md: 4,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo1'
            },
            conditionsProps: {
                label: '企业全称',
                labelSpan: 5,
                defaultValue:'企业全称',
                onChange: (event,value,viewStore) => {
                    console.log(event,value,viewStore,'企业全称');
                }
            },
            jsonProperty:'orderNo1'
        })
        ConditionsUtils.renderSelectConfig({
            containerProps: {
                col: {
                    md: 3,
                    lg: 3,
                    xl: 3,
                },
                name:'vmOrderNo2'
            },
            conditionsProps: {
                label: '企业',
                labelSpan: 3,
                multiple: false,
                labelInValue: true,
                defaultValue:{key:'111',label:''},
                onChange: (value,viewStore) => {
                    console.log(value,viewStore,'企业');
                },
                options: [{ key: '111',label: '111',value: '昊链科技' },
                    { key: '222',label: '2222',value: '昊链科技1' },
                    { key: '333',value: '昊链科技3',label:'333' },
                    { key: '444',value: '昊链科技4',label:'444' }]
            },
            jsonProperty:'orderNo2'
        })
        ConditionsUtils.renderDateConfig({
            containerProps: {
                col: {
                    md: 4,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo3'
            },
            conditionsProps: {
                label: '创建日期',
                labelSpan: 5,
                /* format: 'YYYY-MM-DD HH:mm:ss', */
                format: 'YYYY-MM-DD',
                showTime: true,
                defaultValue:moment('2016-01-01', 'YYYY-MM-DD'),
                /* value:moment('2017-01-01', 'YYYY-MM-DD'), */
                onChange: (originValue,value,viewStore) => {
                    console.log(originValue,value,viewStore,'企业');
                },
            },
            jsonProperty:'orderNo3'
        })
        ConditionsUtils.renderRangePickerConfig({
            containerProps: {
                col: {
                    md: 4,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo4'
            },
            conditionsProps: {
                label: '日期范围',
                labelSpan: 5,
                placeholder: ['开始日期','结束日期'],
                onChange: (originValue,value,viewStore) => {
                    console.log(originValue,value,viewStore,'日期范围');
                },
                defaultValue:[moment('2015-01-01', 'YYYY-MM-DD'),moment('2016-01-01', 'YYYY-MM-DD')],
                format: 'YYYY-MM-DD',
                /*showTime:true, */
            },
            jsonProperty:'orderNo4'
        })
        ConditionsUtils.renderCheckBoxConfig({
            containerProps: {
                col: {
                    md: 2,
                    lg: 2,
                    xl: 2,
                },
                name:'vmOrderNo5'
            },
            conditionsProps: {
                label: '是否删除',
                labelSpan: 5,
                defaultChecked: true,
                onChange: (event,value) => {
                    console.log(event,value,'数量');
                },
            },
            jsonProperty:'orderNo5'
        })
        ConditionsUtils.renderTextNumberConfig({
            containerProps: {
                col: {
                    md: 4,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo6'
            },
            conditionsProps: {
                label: '数量',
                labelSpan: 5,
                onChange: (event,value,viewStore) => {
                    console.log(event,value,viewStore,'数量');
                },
                defaultValue:22
            },
            jsonProperty:'orderNo6'
        })
        ConditionsUtils.renderRadioButtonConfig({
            containerProps: {
                col: {
                    md: 7,
                    lg: 5,
                    xl: 5,
                },
                name:'vmOrderNo7'
            },
            conditionsProps: {
                label: '城市',
                labelSpan: 5,
                defaultValue:'b',
                onChange: (event,value,viewStore) => {
                    console.log(event,value,viewStore,'城市');
                },
                options:[{ label: '上海',value: 'a' },{ label: '杭州',value: 'b' },{ label: '广州',value: 'g' },{ label: '北京',value: 'c' },{ label: '成都',value: 'd' }]
            },
            jsonProperty:'orderNo7'
        })
        ConditionsUtils.renderSearchConfig({
            containerProps: {
                name: 'search',
                col: {
                    md: 6,
                    lg: 5,
                    xl: 5,
                }
            },
            conditionsProps: {
                onSearch: (value,view) => {
                    console.log(value);
                },
            }
        })
        ConditionsUtils.renderGroupCheckBoxConfig({
            containerProps: {
                col: {
                    md: 5,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo8'
            },
            conditionsProps: {
                defaultValue:['Apple'],
                labelSpan: 5,
                options: [{ label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' }]
            },
            jsonProperty:'orderNo8'
        })
        ConditionsUtils.renderSelectConfig({
            containerProps: {
                col: {
                    md: 4,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo9'
            },
            conditionsProps: {
                paging: true,
                label: '远程下拉',
                options: [],
                labelSpan: 5,
                autoQuery: {
                    params: (pageIndex,pageSize,keywords,params) => {
                        return {
                            keyword: keywords,
                            current: pageIndex,
                            size: 300,
                            templateCode: 'Country',
                            pageIndex: 1,
                            pageSize,
                            defaultKeyWords:'',
                        }
                    },
                    options: {
                        'api-target': 'https://qa-scm.hoolinks.com//jg/basic/cusinfo/search.json'
                    },
                    isInitialize: false,
                    ApiUrl: 'https://gateway.hoolinks.com/api/gateway',
                    method: 'post',
                    token: 'SESSION=ffeb848f-53f1-4d50-b021-5ef3789a2fbd;',
                    mappingEntity: (that,res) => {
                        that.total = res['total'];
                        that.current = res['current'];
                        that.pageSize = res['size'];
                        const data = res['data'] as [] || []
                        return data.map((item) => {
                            return {
                                key: item['code'],
                                value: item['name'],
                            }
                        });
                    },
                    transform: (value) => {
                        let arr = value.value ? value.value.result : []
                        return {
                            data: arr.map((item) => {
                                return {
                                    key: item.key,
                                    value: '(' + item.key + ')' + item.value,
                                }
                            }),
                            total: value.value ? value.value.total : 0,
                        }
                    },
                },
            },
            jsonProperty:'orderNo9'
        })
        return [
            ConditionsUtils.getConditionsConfig('vmOrderNo'),
            ConditionsUtils.getConditionsConfig('vmOrderNo1'),
            ConditionsUtils.getConditionsConfig('vmOrderNo2'),
            ConditionsUtils.getConditionsConfig('vmOrderNo3'),
            ConditionsUtils.getConditionsConfig('vmOrderNo4'),
            ConditionsUtils.getConditionsConfig('vmOrderNo6'),
            ConditionsUtils.getConditionsConfig('vmOrderNo7'),
            ConditionsUtils.getConditionsConfig('vmOrderNo9'),
            ConditionsUtils.getConditionsConfig('vmOrderNo8'),
            ConditionsUtils.getConditionsConfig('search'),
            ConditionsUtils.getConditionsConfig('vmOrderNo5'),
        ]
    }
  render() {
    return (
      <Row>
        <FormItem
          wrapperCol={{ span: 18, offset: 1 }}
        >
          <Button type="primary" htmlType="submit" onClick={()=>{
                  this.queryRef.methods.setFieldsValues<InstanceType<typeof LegionsProConditions.ConditionTextModel>>('vmOrderNo',(value) => {
                        value.conditionsProps.value = '郭某嘉';
                    })
                }}>填充司机信息</Button>

          <Button style={{marginLeft:'10px'}} type="primary" htmlType="submit" onClick={()=>{
                   this.queryRef.methods.setFieldsValues<InstanceType<typeof LegionsProConditions.ConditionTextModel>>('vmOrderNo',(value) => {
                        value.conditionsProps.disabled = !value.conditionsProps.disabled;
                        this.setState({
                            disabledText:!value.conditionsProps.disabled
                        })
                    })
                    
                }}>{!this.state.disabledText?'启用司机信息':'禁用司机信息'}</Button>
         <Button style={{marginLeft:'10px'}} type="primary" htmlType="submit" onClick={()=>{
                  this.queryRef.methods.setFieldsValues<InstanceType<typeof LegionsProConditions.ConditionRadioButtonModel>>('vmOrderNo7',(value) => {
                        if(value.conditionsProps.visable ===void 0){
                                value.conditionsProps.visable =true
                        }
                        value.conditionsProps.visable = !value.conditionsProps.visable;
                        this.setState({
                            visibleText:!value.conditionsProps.visable
                        })
                    })
                 
                }}>{!this.state.visibleText?'隐藏城市':'显示城市'}</Button>       
                <Button style={{marginLeft:'10px'}} type="primary" htmlType="submit" onClick={()=>{
                   this.queryRef.methods.onRrmoteSearch('vmOrderNo9',{
                        pageIndex: 1,
                        ...{a:1},
                    })
                }}>主动请求远程下拉数据</Button>  
                <Button style={{marginLeft:'10px'}} onClick={() => {
                    const item = this.queryRef.methods.getQuerySelectOption('vmOrderNo9','103');
                    console.log(item);
                }}> 获取远程下拉项指定项数据</Button>     
        </FormItem>
         <LegionsProConditions
            onReady={(value) => {
                this.queryRef = value;
            }}
            defaultCollapsed
            query={this.createConfig()}></LegionsProConditions>
      
      </Row>
     
    );
  }
}
const root = props => {
  return <ProQueryDemo></ProQueryDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
