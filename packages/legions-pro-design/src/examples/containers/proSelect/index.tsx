import React,{ Component } from 'react'
import { Row } from 'antd';
import { bind,observer } from 'legions/store-react'
import LegionsProSelect from 'components/LegionsProSelect';
import UserInfoStore from 'examples/stores/UserInfoStore';
interface IState {
    loading: boolean,
    pageIndexSelect: number,
    visible: boolean,
    page: number,
    pageSize: number,
    pageSelelctList: { key: string; value: string }[],
    selectList:{ key: string; value: string }[],
}
interface IProps {
    store?: UserInfoStore,
}
@bind({ store: UserInfoStore })
@observer
export default class ProSelectDemo extends Component<IProps,IState> {
    data = [];
    constructor(props: {}) {
        super(props)
        let total = 50000;
        const data = [];
        for (let i = 0; i < total; i++) {
            this.data.push({
                id: i,
                key: `${i}`,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no.London, Park Lane no. ${i}`,
                value: `Edward King ${i}`,
            });
        }
        for (let i = 0; i < 40; i++) {
            data.push({
                id: i,
                key: `${i}`,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no.London, Park Lane no. ${i}`,
                value: `Edward King ${i}`,
            });
        }
        this.state = {
            loading: false,
            page: 1,
            pageSize: 100,
            pageIndexSelect: 1,
            visible: false,
            pageSelelctList: this.data,
            selectList:data,
        }
    }
    componentDidMount() {
        const time = 2000;
        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            },time)
        }).then(() => {
            this.setState({ pageSelelctList: this.data })
        })
        this.props.store.getNatcdName({
            keyword: '',
            current: 1,
            size: 100,
        })
    }
    render() {
        const data = this.props.store.UserPageList.data;
        //@ts-ignore
        const state = this.props.store.obUserPageList.data.get(this.state.pageIndexSelect.toString());
        return (
            <React.Fragment>
                <Row>
                    {/* 远程搜索:<LegionsProSelect
                        style={{ width: '250px' }}
                        loading={state && state.isPending}
                        total={this.props.store.UserPageList.total}
                        onPagingQuery={(pageIndex,pageSize,keywords) => {
                            console.log(pageIndex)
                            this.props.store.getNatcdName({
                                keyword: keywords as string,
                                current: pageIndex,
                                size: pageSize,
                            })
                            this.setState({
                                pageIndexSelect: pageIndex,
                            })
                        }}
                        remote
                        defaultOpen={this.state.visible}
                        labelInValue
                        onSearch={(val) => {
                            this.props.store.getNatcdName({
                                keyword: val,
                                current: 1,
                                size: 100,
                            })
                            this.setState({
                                pageIndexSelect: 1,
                            })
                            console.log(val)
                        }}
                        onChange={(value) => {
                            console.log(value)
                        }}
                        paging
                        options={data.get(this.state.pageIndexSelect.toString()) || []}
                    >
                    </LegionsProSelect> */}
                </Row>
                <Row style={{ marginTop: '30px' }}>
                    {/* 本地搜索及分页:<LegionsProSelect
                        style={{ width: '150px' }}
                        total={this.state.pageSelelctList.length}
                        value={{key:'30',label:'Edward King 30'}}
                        paging
                        labelInValue
                        options={this.state.pageSelelctList.map((item: { key: string; value: string }) => {
                            return { key: item.key,value: item.value,title: item.value }
                        })}
                    >
                    </LegionsProSelect>
                    <LegionsProSelect
                        style={{ width: '150px' }}
                        labelInValue
                        
                        options={this.state.selectList.map((item: { key: string; value: string }) => {
                            return { key: item.key,value: item.value,title: item.value }
                        })}
                    >
                    </LegionsProSelect> */}
                    <LegionsProSelect
                        style={{ width: '150px' }}
                        labelInValue
                        paging
                        pageSize={30}
                        
                        options={this.state.selectList.map((item: { key: string; value: string }) => {
                            return { key: item.key,value: item.value,title: item.value }
                        })}
                    >
                    </LegionsProSelect>
                    {/* <LegionsProSelect
                        style={{ width: '150px' }}
                        total={this.state.pageSelelctList.length}
                        paging
                        options={this.state.pageSelelctList.map((item: { key: string; value: string }) => {
                            return { key: item.key,value: item.value,title: item.value }
                        })}
                        maxTagCount={3}
                        mode="multiple"
                    >
                    </LegionsProSelect> */}

                </Row>
            </React.Fragment>
        )
    }
}