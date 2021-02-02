import React from 'react';
import { bind,observer } from 'legions/store-react'
import { Button } from 'antd';
import { LegionsProQueryConditions, LegionsProModalForm,LegionsProPageContainer } from '../../../components';
import { observablePromise } from 'legions/store-utils';
import { IQuery, IQueryConditionsInstance } from 'components/LegionsProQueryConditions/interface';
import LegionsProConditions from 'components/LegionsProQueryConditions/conditions';
const query = (that: QueryDemo,props?): Array<IQuery> => {
    return [
        {
            container: {
                width: 200,position: 'left',
                span:3,
                component: {
                    label: '企业全称:',
                    props: {
                        width: 145,
                        span:18,
                        placeholder: '企业全称',
                    },
                    type: 'textArea',
                    JsonProperty: {
                        name: 'vmOrderNo',
                        value: '',
                        queryPrams: 'orderNo',
                    },
                },
            },
        },
        {
            container: {
                width: 180,position: 'left',
                span:3,
                component: {
                    label: '数量:',
                    props: {
                        width: 145,
                        span:20,
                        placeholder: '数量',
                    },
                    type: 'number',
                    JsonProperty: {
                        name: 'number',
                        value: '',
                        queryPrams: 'number',
                    },
                    hooks: [{
                        name: 'onSearch',handle: (value) => {
                            console.log('数量回车搜索',value)
                        },
                    }],
                },
            },
        },
        {
            container: {
                width: 415,position: 'content',
                span:6,
                component: {
                    label: '单选组合:',
                    props: {
                        width: 360,
                        span:21,
                        placeholder: '单选组合',
                        /* options:[{label:'Hangzhou',value:'a',disabled:true},{label:'Shanghai',value:'b'},{label:'Beijing',value:'c'},{label:'Chengdu',value:'d'}], */
                    },
                    data: [{ label: 'Hangzhou',value: 'a' },{ label: 'Shanghai',value: 'b' },{ label: 'Beijing',value: 'c' },{ label: 'Chengdu',value: 'd' }],
                    type: 'radioButton',
                    JsonProperty: {
                        name: 'radioButton',
                        value: '',
                        queryPrams: 'radioButton',
                    },
                    defaultValue: 'a',
                },
            },
        },
        {
            container: {
                width: 200,position: 'content',
                span:3,
                component: {
                    label: '司机姓名:',
                    props: {
                        width: 145,
                        span:18,
                        placeholder: '司机姓名',
                    },
                    type: 'text',
                    JsonProperty: {
                        name: 'vmOrderNo3',
                        value: '',
                        queryPrams: 'orderNo3',
                    },
                    defaultValue: '2222',
                },
            },
        },
        {
            container: {
                width: 180,position: 'content',
                span:3,
                component: {
                    label: '车牌:',
                    props: {
                        width: 125,
                        span:20,
                        placeholder: '车牌',
                        /* mode: 'multiple', */
                        maxTagCount: 1,
                        paging: true,
                    },
                    type: 'select',
                    data: [{ key: '111',value: '昊链科技' },{ key: '222',value: '昊链科技1' },{ key: '333',value: '昊链科技3' },{ key: '444',value: '昊链科技4' }],
                    /* data:that.state.selectList, */
                    JsonProperty: {
                        name: 'vmOrderNo4',
                        value: '',
                        queryPrams: 'orderNo4',
                    },
                    defaultValue: [],
                    hooks: [{
                        handle: (value) => {
                            console.log(value);
                        },
                        name:'onChange',
                    }],
                },
            },
        },
        {
            container: {
                width: 80,position: 'content',
                span:1,
                component: {
                    props: {
                        width: 80,
                        span:24,
                        placeholder: '是否删除',
                    },
                    type: 'checkBox',
                    JsonProperty: {
                        name: 'vmOrderNo5',
                        value: '',
                        queryPrams: 'orderNo5',
                    },
                    defaultValue: true,
                },
            },
        },
        {
            container: {
                width: 200,position: 'content',
                span:3,
                component: {
                    label: '创建日期:',
                    props: {
                        width: 145,
                        span:18,
                        placeholder: '日期',
                        format: 'YYYY-MM-DD HH:mm:ss',
                    },
                    type: 'date',
                    JsonProperty: {
                        name: 'vmOrderNo6',
                        value: '',
                        queryPrams: 'orderNo6',
                    },
                    defaultValue: '2019-10-6',
                },
            },
        },
        {
            container: {
                width: 240,
                span:3,
                position: 'content',
                component: {
                    label: '日期范围:',
                    props: {
                        width: 185,
                        span:18,
                        placeholder: '日期',
                    },
                    type: 'daterange',
                    JsonProperty: {
                        name: 'vmOrderNo7',
                        value: '',
                        queryPrams: 'orderNo7',
                    },
                    defaultValue: '',
                },
            },
        },
        {
            container: {
                position: 'right',
                component: {
                    /* label: '保存', */
                    props: {
                        width: 66,
                    },
                    hooks: [
                        {
                            name: 'onSearch',handle: (value) => {
                                console.log('搜索',value)
                            },
                        },
                        {
                            name: 'onReset',handle: (value) => {
                                console.log(value)
                            },
                        },
                        {
                            name:'onRefresh',handle: (value) => {
                                console.log(value)
                            },
                        },
                    ],
                },
            },
        },
    ]
}
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
        this.queryRef.methods.setFieldState([
            {name:'vmOrderNo3',state:{visable:false}},
            {name:'vmOrderNo4',state:{visable:false}},
            {name:'vmOrderNo7',state:{visable:false}},
        ])
    }
    createConfig() {
        const formUtils = new LegionsProConditions.ProConditions();
        formUtils.renderTextConfig({
            containerProps: {
                col: {
                    span: 4,
                    md: 6,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo'
            },
            conditionsProps: {
                label: '司机姓名',
                labelSpan: 5,
                span:22,
            },
            jsonProperty:'orderNo'
        })
        formUtils.renderTextAreaConfig({
            containerProps: {
                col: {
                    span: 4,
                    md: 6,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo1'
            },
            conditionsProps: {
                label: '企业全称',
                labelSpan: 5,
                span:22,
            },
            jsonProperty:'orderNo1'
        })
        formUtils.renderSelectConfig({
            containerProps: {
                col: {
                    span: 4,
                    md: 6,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo2'
            },
            conditionsProps: {
                label: '企业',
                labelSpan: 3,
                multiple:false,
                options:[{ key: '111',value: '昊链科技' },{ key: '222',value: '昊链科技1' },{ key: '333',value: '昊链科技3' },{ key: '444',value: '昊链科技4' }]
            },
            jsonProperty:'orderNo2'
        })
        formUtils.renderDateConfig({
            containerProps: {
                col: {
                    span: 4,
                    md: 6,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo3'
            },
            conditionsProps: {
                label: '创建日期',
                labelSpan: 5,
                format: 'YYYY-MM-DD HH:mm:ss',
                showTime:true,
            },
            jsonProperty:'orderNo3'
        })
        formUtils.renderRangePickerConfig({
            containerProps: {
                col: {
                    span: 4,
                    md: 6,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo4'
            },
            conditionsProps: {
                label: '日期范围',
                labelSpan: 5,
                placeholder:['开始日期','结束日期']
                /* format: 'YYYY-MM-DD HH:mm:ss',
                showTime:true, */
            },
            jsonProperty:'orderNo4'
        })
        formUtils.renderCheckBoxConfig({
            containerProps: {
                col: {
                    span: 2,
                    md: 4,
                    lg: 2,
                    xl: 4,
                },
                name:'vmOrderNo5'
            },
            conditionsProps: {
                label: '是否删除',
                labelSpan: 5,
            },
            jsonProperty:'orderNo5'
        })
        formUtils.renderTextNumberConfig({
            containerProps: {
                col: {
                    span: 4,
                    md: 6,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo6'
            },
            conditionsProps: {
                label: '数量',
                labelSpan: 5,
            },
            jsonProperty:'orderNo6'
        })
        formUtils.renderRadioButtonConfig({
            containerProps: {
                col: {
                    span: 4,
                    md: 6,
                    lg: 4,
                    xl: 4,
                },
                name:'vmOrderNo7'
            },
            conditionsProps: {
                label: '城市',
                labelSpan: 5,
                options:[{ label: '上海',value: 'a' },{ label: '杭州',value: 'b' },{ label: '广州',value: 'g' },{ label: '北京',value: 'c' },{ label: '成都',value: 'd' }]
            },
            jsonProperty:'orderNo7'
        })
        formUtils.renderSearchConfig({
            containerProps: {
                name: 'search',
                col: {
                    span: 4,
                    md: 6,
                    lg: 4,
                    xl: 4,
                }
            },
            conditionsProps: {
                
            }
        })
        return [
            formUtils.getConditionsConfig('vmOrderNo'),
            formUtils.getConditionsConfig('vmOrderNo1'),
            formUtils.getConditionsConfig('vmOrderNo2'),
            formUtils.getConditionsConfig('vmOrderNo3'),
            formUtils.getConditionsConfig('vmOrderNo4'),
            formUtils.getConditionsConfig('search'),
            formUtils.getConditionsConfig('vmOrderNo6'),
            formUtils.getConditionsConfig('vmOrderNo7'),
            formUtils.getConditionsConfig('vmOrderNo5'),
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
                <LegionsProQueryConditions query={query(this)} onReady={(value) => {
                    this.queryRef = value;
                    console.log(this.queryRef)
                }}></LegionsProQueryConditions>

                <LegionsProConditions query={this.createConfig()}></LegionsProConditions>
            </div>
        )
    }
}
