import React from 'react'
import { Layout,Icon,Badge,Avatar,Breadcrumb,Menu,Dropdown,Button } from 'antd';
const { Header } = Layout;
import { observer,bind } from 'legions/store-react'
import LegionsStoreLayout from '../store';
import LegionsProSelect from '../../LegionsProSelect';
import { legionsProLayoutInterface,legionsProLayoutProps } from '../interface';
@bind({ store: LegionsStoreLayout.MenuStore })
@observer
export default class HeaderPart extends React.Component<legionsProLayoutProps['headerPart']>{
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
  /** 渲染系统设置节点 */
  renderSystemSettingElement() {
    return <Dropdown overlay={(<Menu onClick={(params) => {
      if (this.props.sysSettingDropdown) {
        this.props.sysSettingDropdown.onClick && this.props.sysSettingDropdown.onClick(params.key)
      }
    }} >
      {this.props.sysSettingDropdown && this.props.sysSettingDropdown.dropdown.map((item,_index) => {
        return <Menu.Item key={item.key || _index}>
          {item.node}
        </Menu.Item>
      })}
      <Menu.Item key="loginout">
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
    const { userEntity = {} as legionsProLayoutInterface['globalUser'] } = this.props;
    return <span className="action-item">
      <Avatar icon="user" size="small" />
      <span className="name">{userEntity['userName']}</span>
      {
        userEntity['companyName'] && <span> &nbsp;&nbsp;|&nbsp;&nbsp;
              {userEntity['companyName']}
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
  renderHeaderElement() {
    const renderHeaders = <Header style={{ padding: 0,height: '50px' }}>
      <div className='left-header'>
        {this.renderMenuToggleIconElement()}
        {this.renderBreadcrumbElement()}
      </div>
      {!this.props.isReCustomHeader ?
        <div className="right-header">
          {this.renderSearchDirectMenuElement()}
          {this.renderUserInfoElement()}
          {this.renderInsertRightHeaderElement()}

          {this.renderSkinsElement()}
          {this.renderSystemSettingElement()}
        </div>
        :
        <div className="right-header">
          {this.renderSearchDirectMenuElement()}
          {this.renderInsertRightHeaderElement()}
        </div>}
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
      classNames = 'ant-pro-fixed-header'
    }
    return classNames;
  }
  /** 计算header 标签 style 样式信息 */
  computedHeaderStyles() {
    const { store } = this.props;
    let headerStyles: React.CSSProperties = {};
    if (store.viewModel.fixedHeader) {
      const skin = store.viewModel.getSkinInfos()
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
  render() {
    return (
      this.renderHeaderElement()
    )
  }
}
