import { Badge,Button,Col,Icon,message,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProForm,LegionsProPageContainer,LegionsProLayout,LegionsProModal,LegionsProTable } from '../../../components';
import { observablePromise } from 'legions/store-utils';
import { observable } from 'legions/store';
import { getSystem,getToken,HttpConfig,SocketUrl } from '../../constants/httpConfig';
import { FormFields } from '../proForm/model';
import { exportTaskDeleteService,getMenuList } from '../../services/menuService';
import UserInfoStore from '../../stores/UserInfoStore';
import { page } from 'legions-lunar/mobx-decorator';
import { InstanceProModal } from '../../../components/LegionsProModal/interface';
import { TableColumnConfig } from '../../../components/interface/antd';
import { ExportTaskEntity } from '../../models/ExportTaskEntity';
import { download } from 'legions-utils-tool/download';
import { OpenConfirm } from 'legions-lunar/antd-toolkit';
import { InstanceProTable } from '../../../components/LegionsProTable/interface';
import { runInAction } from 'mobx'
import TaskPlugin from '../../utils/TaskPlugin';
import { ContainerEntity } from '../../models/common/baseEntity';
const LOGO = 'https://qa-scm.hoolinks.com/scm-static/scm-admin/common/images/8893a956.SCM-IMAG.png';
const Columns = (that: ProLayout): TableColumnConfig<ExportTaskEntity>[] => [
    {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
        width: '10%',
    },
    {
        title: '版本号',
        dataIndex: 'version',
        key: 'version',
        width: '10%',
    },
    {
        title: '导出状态',
        dataIndex: 'stateDesc',
        key: 'stateDesc',
        width: '10%',
        render: (text,recrod) => {
            return <Badge status={recrod['stateUI']} text={text} />
        },
    },{
        title: '创建人',
        dataIndex: 'createrName',
        key: 'createrName',
        width: '10%',
    },{
        title: '导出名字',
        dataIndex: 'moduleName',
        key: 'moduleName',
        width: '10%',
    },
    {
        title: '导出开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: '20%',
    },
    {
        title: '导出完成时间',
        dataIndex: 'finishTime',
        key: 'finishTime',
        width: '20%',
    },
    {
        title: '下载',
        dataIndex: 'filePath',
        key: 'filePath',
        width: '10%',
        render: (text) => {
            return <span style={{ cursor: 'pointer' }}>{text && <Icon type="cloud-download-o" style={{ fontSize: '18px',color: '#108ee9' }} onClick={() => {
                download([decodeURIComponent(text)])
            }} />}</span>
        },
    },
    {
        title: '删除',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        render: (id) => {
            return <Icon type="delete" style={{ fontSize: '16px',color: '#108ee9',cursor: 'pointer' }} onClick={() => {
                OpenConfirm({
                    title: '提示',
                    content: '是否确认删除？',
                    onOk: () => {
                        that.exportTaskDelete && that.exportTaskDelete(id);
                    }
                })
            }}></Icon>
        },
    }
];
interface IProps {
    store?: UserInfoStore,
    menuStore?:InstanceType<typeof LegionsProLayout['LegionsStoreLayout']['MenuStore']>;
}
interface IState {
}
const whiteList = ['uat-scm.hoolinks.com','qa-scm.hoolinks.com','scm.hoolinks.com','demo-scm.hoolinks.com',
    'jabil.hoolinks.com','qa-jabil.hoolinks.com','demo-jabil.hoolinks.com','uat-jabil.hoolinks.com','localhost:8057']
let isRegisterTask = false;
@bind({ store: UserInfoStore,menuStore: LegionsProLayout['LegionsStoreLayout'].MenuStore })
@page<ProLayout,UserInfoStore>({
    sideEffect: (that,store: UserInfoStore) => {
        if (store.obUserInfo.isResolved) {
            const host = location.host
            const index = whiteList.findIndex((item) => item === host)
            if (index > -1 && !isRegisterTask) {
                const taskApi = `${getSystem()}/jg/report/export-task/list.json`
                TaskPlugin.install({
                    url: `${SocketUrl}/socket/export-task`,token: getToken(),
                    taskApi,userId: store.obUserInfo.value.result.id,callback: (data: ExportTaskEntity[] = []) => {
                        runInAction(() => {
                            that.props.store.exportTaskList = data.slice();
                        })
                    },
                })
                isRegisterTask = true;
            }
        }

    },
},
)
@observer
export class ProLayout extends React.Component<IProps,IState> {
    @observable modalContentType: 'pass' | 'task' | '' = ''
    modalRef: InstanceProModal = null;
    taskCenterTableRef: InstanceProTable = null
    constructor(props: IProps) {
        super(props)
    }
    componentDidMount() {
    }
    /** 删除异步任务 */
    exportTaskDelete(ids: string) {
        exportTaskDeleteService(ids).then((res: ContainerEntity<object>) => {
            if (res.success) {
                message.success(res.message);
                TaskPlugin.sendMessage()
            } else {
                message.error(res.message);
            }
        })
    }
    onLoginOut() {
        let url = 'https://qa-scm.hoolinks.com/'
        window.location.href = `${url}auth/authaccount/logout.do`
    }
    render() {
        console.log('render parent');
        let companyName = ''
        let userName = ''
        let userUid = ''
        let companyUid = ''
        let rowData = {}
        if (this.props.store.obUserInfo.isResolved) {
            companyName = this.props.store.obUserInfo.value.result.companyName;
            companyUid = this.props.store.obUserInfo.value.result.companyUid;
            userName = this.props.store.obUserInfo.value.result.userName;
            userUid = this.props.store.obUserInfo.value.result.uId;
            rowData = this.props.store.obUserInfo.value.result;
        }
        return (<React.Fragment>
            <LegionsProLayout
                notFoundUrl={HttpConfig.domain404}
                logo={LOGO}
                theme='lightBlue'
                onLoginOut={this.onLoginOut.bind(this)}
                onQueryPromiseMenus={getMenuList}
                /* loadedMenuTransformData={(value) => {
                    value.map((item) => {
                        if (item.path && item.path.indexOf('scm-static/scm') > -1) {
        
                        }
                        if (item.path && item.path.indexOf('scm-static/shippingOrder') > -1) {
                            item.loadingMode = 'sandbox'
                            item.sandbox.appEntiy = 'http://192.168.100.141:8080/scm-shippingOrder/scm-shippingOrder/#/'
                            item.sandbox.appName = 'hoolink-scm-web-scm-shippingOrder';
                            item.sandbox.appRootId = 'react-scm-shippingOrder';
                            item.sandbox.experimentalStyleIsolation = true;
                            item.sandbox.isMerge = false;
                        }
                    })
                    
                }} */
                domainUrl='https://qa-scm.hoolinks.com/'
                /* domainUrl={domainUrl} */
                fixedLayoutPosition={'fixedSiderHeader'}
                userEntity={{ userName,userUid,companyName,companyUid,rowData }}
                isEnabledTabs={true}
                header={
                    <React.Fragment>
                        <span className="action-item" onClick={() => {
                            this.modalRef.viewModel.visible = true;
                            this.modalRef.viewModel.width = 960;
                            this.modalRef.viewModel.title = '自动任务调度中心'
                            runInAction(() => {
                                this.modalContentType = 'task'
                            })
                        }}>
                            <Icon type="cloud-download-o" style={{ fontSize: '22px',color: '#108ee9' }} />
                        </span>
                    </React.Fragment>
                }
                sysSettingDropdown={{
                    onClick: (key) => {

                        if (key === 'pass') {
                            this.modalRef.viewModel.title = '修改密码';
                            this.modalRef.viewModel.width = 660;
                            this.modalRef.viewModel.visible = true;
                            this.modalContentType = 'pass'
                        }
                    },
                    dropdown: [
                        {
                            key: 'pass',
                            node: <span><Icon style={{ fontSize: '11px' }} type="user" />&nbsp;&nbsp;修改密码</span>
                        }
                    ]
                }}
            ></LegionsProLayout>
            <LegionsProModal
                onReady={(value) => {
                    this.modalRef = value;
                }}
                resizable
                draggable
                maskClosable={false}
            >

                <React.Fragment>
                    {this.modalContentType === 'task' && <LegionsProTable bodyStyle={{ minHeight: '0' }}
                        total={0}
                        scroll={{ x: '100%',y: '300px' }}
                        uniqueKey="id"
                        loading={false}
                        columns={Columns(this)}
                        onReady={(value) => {
                            this.taskCenterTableRef = value;
                            this.taskCenterTableRef.viewModel.pageSize = 2;
                        }}
                        dataSource={this.props.store.exportTaskList}

                    ></LegionsProTable>}
                </React.Fragment>
            </LegionsProModal>

        </React.Fragment>
        )
    }
}

