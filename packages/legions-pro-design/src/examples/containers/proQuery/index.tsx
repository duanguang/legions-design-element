import React from 'react';
import { bind,observer } from 'legions/store-react'
import { Button, Row } from 'antd';
import { LegionsProConditions, LegionsProModalForm,LegionsProPageContainer } from '../../../components';
import { observablePromise } from 'legions/store-utils';
import {  IQueryConditionsInstance } from 'components/LegionsProConditions/interface';
import moment from 'moment';
interface Istate{
    visable:boolean
}
@observer
export default class QueryDemo extends React.Component<{},Istate>{
    queryRef:IQueryConditionsInstance = null
    constructor(props:{}) {
        super(props)
        this.state = {
            visable:false,
        }
    }
    componentDidMount() {
 /*        this.queryRef.methods.setFieldState([
            {name:'vmOrderNo3',state:{visable:false}},
            {name:'vmOrderNo4',state:{visable:false}},
            {name:'vmOrderNo7',state:{visable:false}},
        ]) */
    }
    createConfig() {
        const formUtils = new LegionsProConditions.ProConditions();
        formUtils.renderTextConfig({
            containerProps: {
                col: {
                    md: 6,
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
        formUtils.renderTextAreaConfig({
            containerProps: {
                col: {
                    md: 6,
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
        formUtils.renderSelectConfig({
            containerProps: {
                col: {
                    md: 6,
                    lg: 4,
                    xl: 4,
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
        formUtils.renderDateConfig({
            containerProps: {
                col: {
                    md: 6,
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
        formUtils.renderRangePickerConfig({
            containerProps: {
                col: {
                    md: 6,
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
        formUtils.renderCheckBoxConfig({
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
                defaultChecked:true,
            },
            jsonProperty:'orderNo5'
        })
        formUtils.renderTextNumberConfig({
            containerProps: {
                col: {
                    md: 6,
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
                }
            },
            jsonProperty:'orderNo6'
        })
        formUtils.renderRadioButtonConfig({
            containerProps: {
                col: {
                    md: 6,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo7'
            },
            conditionsProps: {
                label: '城市',
                labelSpan: 5,
                onChange: (event,value,viewStore) => {
                    console.log(event,value,viewStore,'城市');
                },
                options:[{ label: '上海',value: 'a' },{ label: '杭州',value: 'b' },{ label: '广州',value: 'g' },{ label: '北京',value: 'c' },{ label: '成都',value: 'd' }]
            },
            jsonProperty:'orderNo7'
        })
        formUtils.renderSearchConfig({
            containerProps: {
                name: 'search',
                col: {
                    md: 6,
                    lg: 4,
                    xl: 4,
                }
            },
            conditionsProps: {
                onSearch: (value,view) => {
                    console.log(value);
                }
            }
        })
        formUtils.renderGroupCheckBoxConfig({
            containerProps: {
                col: {
                    md: 5,
                    lg: 2,
                    xl: 4,
                },
                name:'vmOrderNo8'
            },
            conditionsProps: {
                
                labelSpan: 5,
                options: [{ label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' }]
            },
            jsonProperty:'orderNo8'
        })
        return [
            formUtils.getConditionsConfig('vmOrderNo'),
            formUtils.getConditionsConfig('vmOrderNo1'),
            formUtils.getConditionsConfig('vmOrderNo2'),
            formUtils.getConditionsConfig('vmOrderNo3'),
            formUtils.getConditionsConfig('vmOrderNo4'),
            formUtils.getConditionsConfig('vmOrderNo6'),
            formUtils.getConditionsConfig('vmOrderNo7'),
            formUtils.getConditionsConfig('vmOrderNo5'),
            formUtils.getConditionsConfig('vmOrderNo8'),
            formUtils.getConditionsConfig('search'),
        ]
    }
    onChange() {
    }
    render() {
        return (
            <div>
                <Button onClick={() => {
                    this.queryRef.methods.setFieldsValue([{ fieldName: 'vmOrderNo4',value: '111' },{
                        fieldName: 'radioButton',
                        value:'b',
                    }])
                }}> 设置指定数据值</Button>
                <Button onClick={() => {
                    this.queryRef.methods.onSelectSearch('vmOrderNo4',{
                        pageIndex: 1,
                        ...{a:1},
                    })
                }}> 主动请求车牌下拉数据</Button>
                <Button onClick={() => {
                    const item = this.queryRef.methods.getQuerySelectOption('vmOrderNo4','103');
                    console.log(item);
                }}> 获取车牌数据指定项数据</Button>
                <Button onClick={() => {
                    this.setState({visable:!this.state.visable})
                    this.queryRef.methods.setFieldState([
                        {name:'vmOrderNo3',state:{visable:!this.state.visable}},
                        {name:'vmOrderNo7',state:{visable:this.state.visable}},
                    ])
                }}>设置指定元素隐藏/隐藏</Button>
                <Button onClick={() => {
                    this.queryRef.methods.setFieldState([
                        {name:'vmOrderNo4',state:{visable:true}},
                    ])
                }}>设置指定元素显示</Button>
                <Row style={{marginTop:'10px'}}><LegionsProConditions query={this.createConfig()}></LegionsProConditions>
                </Row>
                
            </div>
        )
    }
}
