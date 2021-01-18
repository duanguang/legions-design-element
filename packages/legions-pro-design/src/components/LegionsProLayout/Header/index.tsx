import React from 'react'
import { Layout,Icon,Badge,Avatar,Breadcrumb,Menu,Dropdown,Button } from 'antd';
const { Header } = Layout;
import { observer,bind } from 'legions/store-react'
import {MenuStore} from '../../store/pro.layout';
import LegionsProSelect from '../../LegionsProSelect';
import { computed,observable,runInAction } from 'mobx';
import LegionsProModal from '../../LegionsProModal';
import { InstanceLegionsProModal } from '../../LegionsProModal/interface';
import {OpenConfirm} from 'legions-lunar/antd-toolkit'
import { InstanceProTable } from '../../LegionsProTable/interface'
import LegionsProTable from '../../LegionsProTable';
import { TableColumnConfig } from '../../interface/antd';
import { download } from 'legions-utils-tool/download';
import {ExportTaskEntity} from '../../models'
interface IProps {
  store?: MenuStore,
  userName: string
  companyName: string,
  onLoginOut: () => void,
  /** 删除异步任务 */
  onExportTaskDelete?: (id: string) => any,
  /**
   * 修改密码功能信息
   *
   * @memberof IProps
   */
  password?: {

    /**
     * 提交事件函数
     *
     */
    onSubmit: (value: {

      /**
       * 关闭弹窗
       *
       */
      onClose: () => void,
    }) => void;
    componentNode?: React.ReactNode;
    footer?: React.ReactNode;
    onReady?: (instance: InstanceLegionsProModal) => void
  }
  /**在插入自定义header信息 */
  header?: React.ReactNode
  skin?: string;
  /** false 表示props.header 自定义部分头部信息
   * 
   * 如果为 true 则props.header 自定义全部header 信息 完全个性化 
   */
  isReCustomHeader?: boolean;
  /** 布局布局位置
   *  fixedSider 主要为了兼容历史固定侧边方案  过渡性方案
   */
  fixedLayoutPosition?:'fixedSider'|'fixedSiderHeader'
}
const Columns = (that: HeaderPart): TableColumnConfig<ExportTaskEntity>[] => [
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
            that.props.onExportTaskDelete && that.props.onExportTaskDelete(id);
          }
        })
      }}></Icon>
    },
  }
];
@bind({ store: MenuStore })
@observer
export default class HeaderPart extends React.Component<IProps>{
  /** 模态框内容区展示组件类型 */
  @observable modalContentType: 'updatePass' | 'readTaskList' | '' = ''
  modalRef: InstanceLegionsProModal = null
  taskCenterTableRef: InstanceProTable = null
  constructor(props) {
    super(props)
    this.props.store.viewModel.skin = this.props.skin || this.props.store.viewModel.skin
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }
  static defaultProps = {
    fixedLayoutPosition: 'fixedSider',
  }
  /** 渲染皮肤方案切换节点 */
  renderSkinsElement() {
    const { viewModel } = this.props.store;
    const menuItem = <Menu onClick={this.handleClick} selectedKeys={[`${viewModel.skin}`]}>
      <Menu.Item key="0">
        <span>暗色 : <span><Icon type="skin" style={{ backgroundColor: '#484C72' }} /></span></span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <span>淡蓝色 : <span><Icon type="skin" style={{ backgroundColor: '#212D32' }} /></span></span>
      </Menu.Item>
      <Menu.Item key="3">
        <span>蓝色 : <span><Icon type="skin" style={{ backgroundColor: '#015EA3' }} /></span></span>
      </Menu.Item>
    </Menu>
    return <span className="action-item">
      <Dropdown overlay={menuItem} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          <Icon type="skin" style={{ fontSize: '18px' }} /><Icon type="down" />
        </a>
      </Dropdown>

    </span>
  }
  renderDropdown() {
    return <Menu onClick={this.props.onLoginOut}>
      <Menu.Item >
        <span>
          <Icon type="logout" style={{ fontSize: 13,color: '#08c',paddingRight: '5px' }} />
          <span >退出登录</span>
        </span>

      </Menu.Item>
    </Menu>
  }
  renderTaskCenterElement() {
    return <span className="action-item" onClick={() => {
      this.modalRef.viewModel.visible = true;
      this.modalRef.viewModel.width = 960;
      this.modalRef.viewModel.title = '自动任务调度中心'
      runInAction(() => {
        this.modalContentType = 'readTaskList'
      })
    }}>
      <Icon type="cloud-download-o" style={{ fontSize: '22px',color: '#108ee9' }} />
    </span>
  }
  /** 渲染系统设置节点 */
  renderSystemSettingElement() {
    return <Dropdown overlay={(<Menu onClick={(params) => {
      if (params.key === '0') {
        runInAction(() => {
          this.modalContentType = 'updatePass'
        })
        this.modalRef.viewModel.visible = true;
        this.modalRef.viewModel.width = 660;
        this.modalRef.viewModel.title = '修改密码'
      }
    }} >
      {(this.props.password && this.props.password.componentNode) && <Menu.Item key="0">
        <span><Icon style={{ fontSize: '11px' }} type="user" />&nbsp;&nbsp;修改密码</span>

      </Menu.Item>}
      <Menu.Item key="1">
        <span className="action-item" onClick={this.props.onLoginOut}>
          <Icon style={{ fontSize: '11px' }} type="logout" />
          &nbsp;&nbsp;退出登录
      </span>

      </Menu.Item>
    </Menu>)} trigger={['hover']}>
      <span className="action-item">
        <Icon type="setting" style={{ fontSize: '20px',color: '#108ee9' }} />
      </span>
    </Dropdown>
  }
  renderUserInfoElement() {
    return <span className="action-item">
      <Avatar icon="user" size="small" />
      <span className="name">{this.props.userName}</span>
      {
        this.props.companyName && <span> &nbsp;&nbsp;|&nbsp;&nbsp;
              {this.props.companyName}
        </span>
      }
    </span>
  }
  /** 在用户信息节点之后插入自定义header信息 */
  renderInsertRightHeaderElement() {
    return <span className="action-item">{this.props.header}</span>
  }
  /** 渲染搜索菜单直接打开菜单页签 */
  renderSearchDirectMenuElement() {
    return <LegionsProSelect
      labelInValue
      onChange={this.handleChange.bind(this)}
      placeholder="到达菜单"
      style={{ width: '160px' }}
      options={this.props.store.computedLastStageMenuItemList.map((item) => {
        return { key: item.key,value: item.title }
      })}></LegionsProSelect>
  }
  /** 渲染菜单展开折叠ICON 节点 */
  renderMenuToggleIconElement() {
    return <Icon
      className="trigger"
      style={{ float: 'left',fontSize: '26px' }}
      type={this.props.store.viewModel.collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={this.handleToggle}
    />
  }
  renderBreadcrumbElement() {
    return <Breadcrumb separator=">" style={{ display: 'inline-block',marginLeft: '22px',lineHeight: '50px' }}>
      {this.props.store.context.TabPaneApp.breadcrumbMenu.map((item,index) => {
        return (
          <Breadcrumb.Item key={index}><span style={{ fontSize: '14px' }}>{item}</span></Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  }
  renderModalElement() {
    let footer = null;
    if (this.modalContentType === 'readTaskList') {
      footer = { footer: null }
    }
    if (this.modalContentType === 'updatePass' && this.props.password && (this.props.password.footer === null || this.props.password.footer)) {
      footer = { footer: this.props.password.footer }
    }
    return <LegionsProModal
      {...footer}
      onOk={() => {
        if (this.props.password && this.props.password.onSubmit) {
          if (typeof this.props.password.onSubmit === 'function') {
            this.props.password.onSubmit({
              onClose: this.onClose,
            })
          }
        }
      }}
      onReady={(value) => {
        this.modalRef = value;
        if (this.props.password) {
          this.props.password.onReady && this.props.password.onReady(value)
        }
      }}>
      {
        //@ts-ignore
        this.modalContentType === 'readTaskList' && <LegionsProTable bodyStyle={{ minHeight: '0' }}
        total={this.props.store.viewModel.exportTaskList.length}
        scroll={{ x: '100%',y: '300px' }}
        uniqueKey="id"
        loading={false}
        columns={Columns(this)}
        onReady={(value) => {
          this.taskCenterTableRef = value;
          this.taskCenterTableRef.viewModel.pageSize = 2;
        }}
        data={this.props.store.viewModel.exportTaskList}

      ></LegionsProTable>}
      {(this.modalContentType === 'updatePass' && this.props.password) && (this.props.password.componentNode)}
    </LegionsProModal>
  }
  renderHeaderElement() {
    const renderHeaders = <Header style={{ padding: 0,height: '50px' }}>
    <div className='left-header'>
      {this.renderMenuToggleIconElement()}
      {this.renderBreadcrumbElement()}
    </div>
    {/* <Button onClick={() => {
    window.ReactStore.openTabPane({key:'0001105',keyPath:["0001105",'0001'],title:'百度',path:'https://www.baidu.com'})
    console.log();
  }}>1222</Button>
  &nbsp;&nbsp;&nbsp;<Button onClick={() => {
    window.ReactStore.removeTablePane('0001105')
  }}>33333</Button> */}
    {!this.props.isReCustomHeader ?
      <div className="right-header">
      {this.renderSearchDirectMenuElement()}
      {this.renderUserInfoElement()}
      {this.renderInsertRightHeaderElement()}

      {this.renderSkinsElement()}
      {this.renderTaskCenterElement()}
      {this.renderSystemSettingElement()}
    </div>
      :
      <div className="right-header">
        {this.renderSearchDirectMenuElement()}
        {this.renderInsertRightHeaderElement()}
      </div>}
    {this.renderModalElement()}
    </Header>
    if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
     return <header className={this.computedHeaderClassName()} style={this.computedHeaderStyles()}>
        {renderHeaders}
      </header>
    }
    return renderHeaders
  }
  /** 计算header 标签样式信息  */
  computedHeaderClassName() {
    const { store } = this.props;
    let classNames = ''
    if (store.viewModel.fixedHeader) {
      classNames ='ant-pro-fixed-header'
    } 
    return classNames;
  }
  /** 计算header 标签 style 样式信息 */
  computedHeaderStyles() {
    const { store } = this.props;
    let headerStyles: React.CSSProperties = {};
    if (store.viewModel.fixedHeader) {
      const skin= store.viewModel.getSkinInfos()
      let width = skin.width;
      if (store.viewModel.collapsed) {
        width = skin.width - skin.collapsedWidth - 40
      }
      headerStyles = { ...headerStyles,width: `calc(100% - ${width}px)` }
    }
    return headerStyles;
  }
  handleClick(value: { key: string; keyPath: Array<string> }) {
    this.props.store.viewModel.skin = value.key
  }
  handleToggle() {
    this.props.store.viewModel.collapsed = !this.props.store.viewModel.collapsed;
    this.props.store.triggerSyncCollapsedEvent({
      collapsed: this.props.store.viewModel.collapsed
    })
  }
  handleChange(value: { key: string,label: string }) {
    if (value) {
      const entrty = this.props.store.computedLastStageMenuItemList.find((item) => item.key === value.key);
      if (entrty) {
        const deep = entrty.deep.slice()
        const keyPath = []
        deep.map((item) => {
          keyPath.unshift(item)
        })
        const panes = { key: value.key,keyPath: keyPath }
        //@ts-ignore
        this.props.store.context.TabPaneApp.addTabPanes(panes,this.props.store.getAllMenuList())
      }
    }
  }
  onClose = () => {
    this.modalRef.viewModel.visible = false;
  }
  render() {
    const { store } = this.props;
    return (
      this.renderHeaderElement()
    )
  }
}
