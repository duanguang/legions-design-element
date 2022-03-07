import React from 'react';
import { bind,observer } from 'legions/store-react'
import { Button, Row } from 'antd';
import { LegionsProConditions, LegionsProModalForm,LegionsProPageContainer } from '../../../components';
import { observablePromise } from 'legions/store-utils';
import {  ProConditions } from 'components/LegionsProConditions/interface';
import moment from 'moment';
import { observable } from 'legions/store';
import { ObservableMap,runInAction } from 'mobx';
import { SearchEntity } from './searchEntity';
import {post} from 'legions/fetch'
import { HttpConfig, setHeaders } from 'examples/constants/httpConfig';
interface Istate{
    visable:boolean
}

@observer
export default class QueryDemo extends React.Component<{},Istate>{
    queryRef: ProConditions['ref'] = null
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
        const formUtils = new LegionsProConditions.ProConditionsBase();
        formUtils.renderConfig('text',{
            container: {
                name: 'vmOrderNo',
                onClick: (value) => {
                    console.log(value);
                }
            },
            props: {
                label: '司机姓名',
                defaultValue:'司机姓名',
                onChange: (event,value,viewStore) => {
                    console.log(event,value,viewStore,'司机姓名');
                }
            },
        })
        formUtils.renderConfig('textArea',{
            container: {
            
                name:'vmOrderNo1'
            },
            props: {
                label: '企业全称',
                defaultValue:'企业全称',
                onChange: (event,value,viewStore) => {
                    console.log(event,value,viewStore,'企业全称');
                }
            },
        })
        formUtils.renderConfig('select',{
            container: {
                name:'vmOrderNo2'
            },
            props: {
                label: '企业',
                labelInValue: true,
                // defaultValue:{key:'111',label:''},
               // mode:'multiple',
                onChange: (value,viewStore) => {
                    console.log(value,viewStore,'企业');
                },
                jsonProperty:['companyCode','companyName'],
                options: [{ value: '1',label:'昊链科技(1)' },
                    { value: '2',label:'昊链科技1(2)' },
                    { value: '3',label:'昊链科技3(3)' },
                    { value: '4' ,label:'昊链科技4(4)'}]
            },
            
        })
        formUtils.renderConfig('date',{
            container: {
                name:'vmOrderNo3'
            },
            props: {
                label: '创建日期',
                /* format: 'YYYY-MM-DD HH:mm:ss', */
                format: 'YYYY-MM-DD',
                showTime: true,
                defaultValue:moment('2016-01-01', 'YYYY-MM-DD'),
                /* value:moment('2017-01-01', 'YYYY-MM-DD'), */
                onChange: (originValue,value,viewStore) => {
                    console.log(originValue,value,viewStore,'企业');
                },
            },
        })
        formUtils.renderConfig('rangePicker',{
            container: {
                name: 'vmOrderNo4',
                
            },
            props: {
                label: '日期范围',
                /* placeholder: ['开始日期','结束日期'], */
                onChange: (originValue,value,viewStore) => {
                    console.log(originValue,value,viewStore,'日期范围');
                },
                defaultValue:[moment('2015-01-01', 'YYYY-MM-DD'),moment('2016-01-01', 'YYYY-MM-DD')],
                format: 'YYYY-MM-DD',
                /*showTime:true, */
               // transformFormat: 'x',
                jsonProperty: ['createTimeStart','createTimeEnd'],
            },
            
        })
        formUtils.renderConfig('checkBox',{
            container: {
                name:'vmOrderNo5'
            },
            props: {
                label: '删除',
                defaultChecked: true,
                onChange: (event,value) => {
                    console.log(event,value,'数量');
                },
            },
        })
        formUtils.renderConfig('textNumber',{
            container: {
                name:'vmOrderNo6'
            },
            props: {
                label: '数量',
                onChange: (event,value,viewStore) => {
                    console.log(event,value,viewStore,'数量');
                },
                defaultValue:22
            },
        })
        formUtils.renderConfig('radioButton',{
            container: {
                name:'vmOrderNo7'
            },
            props: {
                label: '城市',
                defaultValue:'b',
                onChange: (event,value,viewStore) => {
                    console.log(event,value,viewStore,'城市');
                },
                options:[{ label: '上海',value: 'a' },{ label: '杭州',value: 'b' },{ label: '广州',value: 'g' },{ label: '北京',value: 'c' },{ label: '成都',value: 'd' }]
            },
        })
        
        formUtils.renderConfig('groupCheckBox',{
            container: {
                name:'vmOrderNo8'
            },
            props: {
                defaultValue:['Apple'],
                options: [{ label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' }]
            },
        })
        formUtils.renderConfig('select',{
            container: {
                
                name:'vmOrderNo9'
            },
            props: {
                paging: true,
                label: '远程下拉',
                options: [],
                request: async () => {
                    let options = setHeaders(`https://qa-scm.hoolinks.com/jg/basic/cusinfo/search.json`);
                    const result = await post(`${HttpConfig.gateWay}`,{
                        size: 30,
                        keyword: '',
                        current: 1,
                        templateCode: 'Country',
                        //@ts-ignore
                    },options).then((res) => {
                        return new SearchEntity(res);
                    })
                    console.log(result)
                    return {
                        data:[]
                    }
                },
            },
        })
        formUtils.renderConfig('search',{
            container: {
                name: 'search',
            },
            props: {
                
                onSearch: (value,view) => {
                   console.log(value)
                },
                onRefresh:()=>{

                },
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
                            value.props.label = 'sss';
                            value.props.value = '222';
                    })

                }}> 设置指定数据值{this.smp.get('ss').a.b}</Button>
                <Button onClick={() => {
                    this.queryRef.methods.onSelectRequest('vmOrderNo9')
                }}> 主动请求车牌下拉数据</Button>
                <Button onClick={() => {
                    const item = this.queryRef.methods.getQuerySelectOption('vmOrderNo9','103');
                    console.log(item);
                }}> 获取车牌数据指定项数据</Button>
                <Button onClick={() => {
                    this.setState({visable:!this.state.visable})
                    this.queryRef.methods.setFieldsValues<InstanceType<typeof LegionsProConditions.ConditionRadioButtonModel>>('vmOrderNo7',(value) => {
                        if(value.props.visable ===void 0){
                            value.props.visable =true
                        }
                        value.props.visable = !value.props.visable;
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
