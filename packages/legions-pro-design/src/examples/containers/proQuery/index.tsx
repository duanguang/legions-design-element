import React from 'react';
import { bind,observer } from 'legions/store-react'
import { Button, Row } from 'antd';
import { LegionsProConditions, LegionsProModalForm,LegionsProPageContainer } from '../../../components';
import { observablePromise } from 'legions/store-utils';
import {  InstanceQueryConditions } from 'components/LegionsProConditions/interface';
import moment from 'moment';
import { observable } from 'legions/store';
import { ObservableMap,runInAction } from 'mobx';
import { SearchEntity } from './searchEntity';
interface Istate{
    visable:boolean
}

@observer
export default class QueryDemo extends React.Component<{},Istate>{
    queryRef: InstanceQueryConditions = null
    @observable smp:ObservableMap<string,{a:{b:number}}>=observable.map()
    constructor(props:{}) {
        super(props)
        this.state = {
            visable:false,
        }
        runInAction(() => {
            this.smp.set('ss',{a:{b:2}})
        })
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
                name: 'vmOrderNo',
                onClick: (value) => {
                    console.log(value);
                }
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
                options: [{ key: '111',value: '昊链科技' },
                    { key: '222',value: '昊链科技1' },
                    { key: '333',value: '昊链科技3' },
                    { key: '444',value: '昊链科技4' }]
            },
            jsonProperty:'companyCode,companyName'
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
                /* placeholder: ['开始日期','结束日期'], */
                onChange: (originValue,value,viewStore) => {
                    console.log(originValue,value,viewStore,'日期范围');
                },
                defaultValue:[moment('2015-01-01', 'YYYY-MM-DD'),moment('2016-01-01', 'YYYY-MM-DD')],
                format: 'YYYY-MM-DD',
                /*showTime:true, */
                transformFormat: 'x',
            },
            jsonProperty: 'createTimeStart,createTimeEnd',
        })
        formUtils.renderCheckBoxConfig({
            containerProps: {
                col: {
                    md: 2,
                    lg: 2,
                    xl: 1,
                },
                name:'vmOrderNo5'
            },
            conditionsProps: {
                label: '删除',
                labelSpan: 5,
                defaultChecked: true,
                onChange: (event,value) => {
                    console.log(event,value,'数量');
                },
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
                },
                defaultValue:22
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
                defaultValue:'b',
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
                },
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
                defaultValue:['Apple'],
                labelSpan: 5,
                options: [{ label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' }]
            },
            jsonProperty:'orderNo8'
        })
        formUtils.renderSelectConfig({
            containerProps: {
                col: {
                    md: 5,
                    lg: 2,
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
        formUtils.renderSearchConfig({
            containerProps: {
                name: 'search',
                col: {
                    md: 6,
                    lg: 6,
                    xl: 4,
                },
            },
            conditionsProps: {
                onSearch: (value,view) => {

                },
                onRefresh:()=>{

                }
            },
        })
        return [
            formUtils.getConditionsConfig('vmOrderNo'),
            formUtils.getConditionsConfig('vmOrderNo1'),
            formUtils.getConditionsConfig('vmOrderNo2'),
            formUtils.getConditionsConfig('vmOrderNo3'),
            formUtils.getConditionsConfig('vmOrderNo4'),
            formUtils.getConditionsConfig('vmOrderNo6'),
            formUtils.getConditionsConfig('vmOrderNo7'),
            formUtils.getConditionsConfig('vmOrderNo9'),
            formUtils.getConditionsConfig('vmOrderNo5'),
            formUtils.getConditionsConfig('vmOrderNo8'),
            formUtils.getConditionsConfig('search'),
        ]
    }
    onChange() {
    }
    render() {
        console.log(22);
        return (
            <div>
                <Button onClick={() => {
                    /* this.queryRef.methods.setFieldsValue([{ fieldName: 'vmOrderNo5',value: false },{
                        fieldName: 'vmOrderNo6',
                        value:2,
                    }]) */
                    this.queryRef.methods.setFieldsValues<InstanceType<typeof LegionsProConditions.ConditionTextModel>>('vmOrderNo',(value) => {
                            value.conditionsProps.label = 'sss';
                            value.conditionsProps.value = '222';
                    })

                }}> 设置指定数据值{this.smp.get('ss').a.b}</Button>
                <Button onClick={() => {
                    this.queryRef.methods.onRrmoteSearch('vmOrderNo9',{
                        pageIndex: 1,
                        ...{a:1},
                    })
                }}> 主动请求车牌下拉数据</Button>
                <Button onClick={() => {
                    const item = this.queryRef.methods.getQuerySelectOption('vmOrderNo9','103');
                    console.log(item);
                }}> 获取车牌数据指定项数据</Button>
                <Button onClick={() => {
                    this.setState({visable:!this.state.visable})
                    this.queryRef.methods.setFieldsValues<InstanceType<typeof LegionsProConditions.ConditionRadioButtonModel>>('vmOrderNo7',(value) => {
                        if(value.conditionsProps.visable ===void 0){
                            value.conditionsProps.visable =true
                        }
                        value.conditionsProps.visable = !value.conditionsProps.visable;
                    })
                }}>设置指定元素隐藏/隐藏</Button>
                <Row style={{ marginTop: '10px' }}><LegionsProConditions
                    onReady={(value) => {
                        this.queryRef = value;
                    }}
                    defaultCollapsed
                    /* isDragSort */
                    query={this.createConfig()}></LegionsProConditions>
                </Row>

            </div>
        )
    }
}
