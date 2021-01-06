import React from 'react'
import { Layout,Menu,Icon,message } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
import { observer,bind } from 'legions/store-react'
import {MenuStore,TabPaneViewStore} from '../../store/pro.layout';
import { MenuEntity } from '../../models/pro.menu.model';
import { SelectParam,MenuProps,ClickParam } from 'antd/lib/menu'
import ReactDOM from 'react-dom'
import './style/index.less'
import { autorun,isObservableArray } from 'mobx';
import { RegExChk,validatorType } from 'legions-utils-tool/regex';
import { IUserInfo,ILegionsPluginDataOrigin } from '../../interface';
import { IPanes,IRouter } from '../../interface//pro.store';
import { page } from 'legions-lunar/mobx-decorator';
import { LegionsPluginsExecute } from 'legions-lunar/legion.plugin.sdk';
import { MasterGlobalStateStore } from '../../core/cross-module';
import { inject } from 'legions/store';
interface IProps extends IUserInfo,MenuProps {
  store?: MenuStore
  logo: string,
  onGetMenuEntity: () => Promise<any>
  activeKey?: string,
  query?: string
  domainUrl?: string
  router: Array<IRouter>;
  defaultOpenKeys?: string[];
  onLogoClick?: () => void;
  /** 布局布局位置
   *  fixedSider 主要为了兼容历史固定侧边方案  过渡性方案
   */
  fixedLayoutPosition?: 'fixedSider' | 'fixedSiderHeader'

  /** 在菜单数据接口请求完成后，如果需要对菜单数据项进行自定义加工，可传入此函数 */
  loadedMenuTransformData?: (menuList: MenuEntity[]) => void;
}
@bind({ store: MenuStore })
@page<MenuParts,MenuStore>({
  sideEffect: (that,store: MenuStore) => {
    if (store.obMenuList.isResolved) {
      /** 首次加载完成 */
      that.masterGlobalStateStore.menuList = store.getAllMenuList(store.obMenuList.value.result,that.props.loadedMenuTransformData)
      that.onPageloadedOpenTabpane(that.masterGlobalStateStore.menuList)
    }
  }
})
@observer
export default class MenuParts extends React.Component<IProps>{
  @inject(MasterGlobalStateStore)
  masterGlobalStateStore: MasterGlobalStateStore
  constructor(props) {
    super(props)
    this.onSelect = this.onSelect.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  static defaultProps = {
    fixedLayoutPosition: 'fixedSider',
  }
  componentDidMount() {
    this.props.store.getMenuList(this.props.onGetMenuEntity);
    this.initGlobalVariableValue();
    this.setOpenKesInDidMountcycle();
  }
  initGlobalVariableValue() {
    const openTabPane = (pane: Pick<IPanes,'key' | 'title' | 'path' | 'params' | 'forceRefresh'> & { keyPath?: Array<string> }) => {
      const item = this.props.store.getMenuByKey(pane.key)
      if (item) {
        pane['keyPath'] = pane.keyPath || item.deep.reverse()
      }
      //@ts-ignore
      this.props.store.context.TabPaneApp.addTabPanes(pane,this.props.store.getAllMenuList())
    }
    const removeTablePane = (targetKey: string | string[]) => {
      this.props.store.context.TabPaneApp.update(targetKey,'remove');
      this.props.store.triggerSetBreadCrumbsEven();
    }
    this.masterGlobalStateStore.openTabPane = openTabPane;
    this.masterGlobalStateStore.removeTablePane = removeTablePane;
  }
  /** 在did mount 生命周期内设置菜单展开项数据 */
  setOpenKesInDidMountcycle() {
    if (this.props.defaultOpenKeys && Array.isArray(this.props.defaultOpenKeys) && this.props.defaultOpenKeys.length) {
      if (this.props.store.openKeys.length === 0) {
        this.props.store.openChange(this.props.defaultOpenKeys)
      } else {
        let newOpenKeys = [...new Set([...this.props.store.openKeys,...this.props.defaultOpenKeys])]
        this.props.store.openChange(newOpenKeys)
      }
    }
  }
  /** 在打开菜单页面路由时，获取菜单完毕时，打开菜单页签 */
  onPageloadedOpenTabpane(menuList: MenuEntity[]) {
    const { store } = this.props;
    store.context.TabPaneApp.syncTabPanes(menuList);
    const activeMenuItem = menuList.find((item) => item.key === this.props.activeKey)
    const hash = window.location.hash;
    const menuItem = hash && menuList.find((item) => (item.path === hash.replace('#','') || item.path === hash || (item.path !== '#' && hash.indexOf(item.path) > -1)))
    if (activeMenuItem) {/** 如果用户通过URL传入了活动菜单key值， 则打开用户指定的菜单key */
      store.openDefault({ key: this.props.activeKey,title: activeMenuItem.title,path: `${activeMenuItem.path}?${this.props.query}` });
    }
    else if (hash && menuItem) {/** 如果用户传入指定菜单路由进行访问，则通过路由地址去找寻菜单数据，进行访问菜单页面 */
      store.openDefault({ key: menuItem.key,title: menuItem.title,path: `${menuItem.path}` });
    } else {
      /** 默认打开第一个 
         * 条件 当默认选中值为空或数组长度为0 则可以自动打开默认页，
         * 否则调取默认缓存中菜单数据进行打开 */
        if ((Array.isArray(store.selectedKeys) || isObservableArray(store.selectedKeys)) && store.selectedKeys.length === 0) {
          const entity = menuList.length && menuList[0];
          if (entity.path && entity.path !== '#' && !this.props.activeKey) {
            store.context.TabPaneApp.setDefaultTabPanes({
              key: entity.key,
              keyPath: [entity.key.toString()]
            },menuList)
          }
        }
    }
  }
  renderFirstMenuItemElement(item: MenuEntity) {
    const skin = this.props.store.viewModel.getSkinInfos()
    this.props.store.setRootSubMenu(item.key.toString(),'0')
    return (
      <Menu.Item key={`${item.key}`}
        className={(skin && skin.skin) || ''}
      >
        {!item.icon ? [<Icon type='pie-chart'></Icon>,
        <span>{item.title}</span>] : [
            <img className='anticon' src={item.icon} style={{ position: 'relative',top: '4px',right: '4px' }}></img>,
            <span>{item.title}</span>
          ]}
      </Menu.Item>
    )
  }
  renderFirstSubMenuELement(item: MenuEntity) {
    const skin = this.props.store.viewModel.getSkinInfos()
    this.props.store.setRootSubMenu(item.key.toString(),'0')
    let icon = ''
    if (item.icon && typeof item.icon === 'string') {
      //@ts-ignore
      if (RegExChk(validatorType.url,item.icon)) {
        icon = item.icon;
      }
      else {
        icon = `${this.props.domainUrl}${item.icon}`;
      }
    }
    return (
      <SubMenu key={`${item.key}`}
        className={(skin && skin.skin) || ''}
        title={<span >{icon ? <img className='anticon' src={icon} style={{ position: 'relative',top: '4px',right: '4px' }}></img> : <Icon type="appstore" />}<span>{item.title}</span></span>}>
        {this.renderRecursiveCallsMenu(item.children,false)}
      </SubMenu>
    )
  }
  /** 渲染末级菜单选项 */
  renderMenuItemElement(item: MenuEntity) {
    const skin = this.props.store.viewModel.getSkinInfos()
    return (
      <Menu.Item key={`${item.key}`}
        className={(skin && skin.skin) || ''}
      >
        {item.title}
      </Menu.Item>
    )
  }
  renderSubMenuElement(item: MenuEntity) {
    const skin = this.props.store.viewModel.getSkinInfos()
    return (
      <SubMenu
        className={(skin && skin.skin) || ''}
        key={`${item.key}`}
        title={item.title}>
        {this.renderRecursiveCallsMenu(item.children,false)}
      </SubMenu>
    )
  }
  /** 递归调用不断遍历所有菜单，并按照顺序渲染相应层级菜单 */
  renderRecursiveCallsMenu(list: Array<MenuEntity>,isFirst = true) {
    if (isFirst) {
      return list.map((item,index) => {
        return !item.children.length ? this.renderFirstMenuItemElement(item) : this.renderFirstSubMenuELement(item)
      })
    }
    else {
      return list.map((item,index) => {
        return !item.children.length ? this.renderMenuItemElement(item) : this.renderSubMenuElement(item)
      })
    }
  }
  /** 渲染Logo节点 */
  renderLogoElement() {
    const { store } = this.props;
    const skin = store.viewModel.SkinList[store.viewModel.skin]
    return <div className={`legions-pro-layout pro-content logo ${(skin && skin.logoSkin) || ''}`}>
      {this.props.store.viewModel.skin === '2' ? <Icon
        className="trigger"
        style={{ marginLeft: `${store.viewModel.collapsed ? '10%' : '30%'}`,fontSize: '18px' }}
        type={store.viewModel.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={this.handleToggle}
      /> : this.props.logo && <img src={this.props.logo} width={`${store.viewModel.logoWidth}px`}
        onClick={this.props.onLogoClick} />}
    </div>
  }
  renderMenuNodesElement() {
    const { store } = this.props;
    const skin = store.viewModel.getSkinInfos()
    const renderMenuNode = <Menu
      inlineIndent={12}
      {...this.props}
      mode="inline"
      theme={skin.theme}
      openKeys={store.openKeys}
      className={(skin && skin.skin) || ''}
      style={{ ...{ color: 'hsla(0,0%,100%,.65)' },...this.props.style }}
      selectedKeys={[store.context.TabPaneApp.activeKey]}
      defaultSelectedKeys={[store.context.TabPaneApp.activeKey]}
      defaultOpenKeys={this.props.defaultOpenKeys || []}
      inlineCollapsed={store.viewModel.collapsed}
      onSelect={this.onSelect}
      onOpenChange={this.onOpenChange}
      onClick={this.onClick}
    >
      {store.obMenuList.isResolved && this.renderRecursiveCallsMenu(store.obMenuList.value.result)}
    </Menu>
    if (this.props.fixedLayoutPosition==='fixedSiderHeader') {
      return <div style={this.computedMenuParentElementStyles()} className='scroll_firefox_content'>
        {renderMenuNode}
      </div>
    }
    return renderMenuNode
  }
  renderSiderElement() {
    const { store } = this.props;
    const skin = store.viewModel.getSkinInfos()
    const rednerSider =(style:React.CSSProperties,classValue:string)=> <Sider
      className={`${(skin && skin.skin) || ''} ${classValue}`}
      ref='siderContainer'
      breakpoint="lg"
      collapsedWidth="500"
      trigger={null}
      collapsed={store.viewModel.collapsed}
      /* collapsible */
      width={skin.width}
      style={!store.viewModel.collapsed ? { overflow: 'auto',...style } : { ...style }}
    >
      {this.renderLogoElement()}
      {this.renderMenuNodesElement()}
    </Sider>
    if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
      let classValue = store.viewModel.fixedSiderMenu ? 'ant-pro-sider ant-pro-sider-fixed' : ''
      let collapsedStyle: React.CSSProperties = {}
      if (store.viewModel.collapsed) {
        collapsedStyle = {overflow:'inherit'}
      }
      return <aside>
        {store.viewModel.fixedSiderMenu &&
          <div className={this.computedMenuPlaceholderNodesClass()} style={this.computedMenuPlaceholderNodesStyles()}></div>
        }
        {rednerSider({...collapsedStyle},classValue)}
      </aside>
    }
    return rednerSider({height: '100vh'},'')
  }
  computedMenuParentElementStyles() {
    const { store } = this.props;
    let menuStyles: React.CSSProperties = {}
    if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
      if (!store.viewModel.collapsed) {
        menuStyles = { ...menuStyles,flex: '1 1 0%',overflow: 'auto' }
      }
    }
    return menuStyles;
  }
  /** 计算在固定侧边菜单栏区域占位节点样式信息 */
  computedMenuPlaceholderNodesStyles() {
    const { store } = this.props;
    const skin = this.props.store.viewModel.getSkinInfos()
    let fixedStyles: React.CSSProperties = {}
    if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
      if (store.viewModel.fixedSiderMenu && !store.viewModel.collapsed) {
        fixedStyles = { ...fixedStyles,width: `${skin.width}px`,overflow: 'hidden',flex: `0 0 ${skin.width}px`,maxWidth: `${skin.width}px`,minWidth: `${skin.width}px` }
      }
    }
    return fixedStyles;
  }
  computedMenuPlaceholderNodesClass() {
    let fixedClass = '';
    const { store } = this.props;
    if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
      if (store.viewModel.fixedSiderMenu && store.viewModel.collapsed) {
        fixedClass = 'ant-layout-sider-collapsed';
      }
    }
    return fixedClass;
  }
  /**
   * 被选中时调用
   * 
   * @param {any} selected { item:'Menu.Item组件实例', key:'菜单序号', selectedKeys：‘当前选中的菜单项 key 数组’ }
   * @memberof MenuPart
   */
  onSelect(selected: SelectParam) {
    this.props.store.updateSelected(selected.selectedKeys)
  }
  /** 点击 MenuItem 调用此函数 */
  onClick = (selected: ClickParam) => {
    let store = this.props.store;
    const newItem = store.getMenuByKey(selected.key);
    const oldActiveKey = store.context.TabPaneApp.activeKey;
    //@ts-ignore
    store.context.TabPaneApp.addTabPanes(selected,store.getAllMenuList());
    if (newItem) {
      const path = newItem['path'] as string
      const index = this.props.router.findIndex((item) => item.path === path.replace('#',''))
      if (path.indexOf('#') > -1 && index > -1) {
        // window.location.href = `${this.props.domainUrl}${path.replace('','')}`
        this.props.store.history.push(`${path.replace('#','')}`)
      }
      else if (path.indexOf('#') > -1 && newItem.loadingMode === 'sandbox') {
        const _path = path.split('#');
        if (_path.length > 1) {
          const pane = store.context.TabPaneApp.panes.find((item) => item.key === selected['key'])
          const oldpane = store.context.TabPaneApp.panes.find((item) => item.key === oldActiveKey)
          store.context.TabPaneApp.proxySanbox.routerSanboxOpenMode = 'newOpenactiveTab';
          store.context.TabPaneApp.proxySanbox.openTabPaneSanbox(oldpane,pane);
        }
      }
    }
  }
  /**
   * SubMenu 展开/关闭的回调
   * 
   * @param {any} openKeys string[]
   * @memberof MenuPart
   */
  onOpenChange(openKeys: string[]) {
    const { store } = this.props
    const latestOpenKey = openKeys.find(key => store.openKeys.indexOf(key) === -1);
    let rootKeys = store.rootSubmenuKeys.map((item) => item.key)
    if (rootKeys.indexOf(latestOpenKey) === -1) {
      this.props.store.openChange(openKeys)
    }
    else {
      openKeys = latestOpenKey ? [latestOpenKey] : []
      this.props.store.openChange(openKeys)
    }
  }
  /** 菜单展开及收起 */
  handleToggle = () => {
    this.props.store.viewModel.collapsed = !this.props.store.viewModel.collapsed;
    this.props.store.triggerSyncCollapsedEvent({
      collapsed: this.props.store.viewModel.collapsed
    })
  }

  render() {
    return (
      this.renderSiderElement()
    )
  }
}