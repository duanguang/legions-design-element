/*
 * @Author: duanguang
 * @Date: 2018-05-13 23:32:29
 * @Last Modified by: duanguang
 * @Last Modified time: 2020-11-27 10:20:10
 */
import React from "react";
import { Tabs,Layout,Dropdown,Menu,message,Spin } from 'antd';
import { observer,bind } from "legions/store-react";
import LegionsStoreLayout from "../store";
import ReactDOM,{ findDOMNode } from "react-dom";
import { observableViewModel } from 'legions/store-utils'
import { debounce } from 'legions-utils-tool/debounce'
import styles from '../style/content.modules.less';
import classNames from 'classnames';
import { observable } from 'mobx';
import { shortHash } from 'legions-lunar/object-hash';
import { focusBind,focusUnbind } from 'legions-thirdparty-plugin/focus-outside'
import { LayoutContentUtils } from './layoutContentUtils';
import { legionsProLayoutInterface,legionsProLayoutProps } from "../interface";
const { Content } = Layout;
const TabPane = Tabs.TabPane;
class ViewModels {
  @observable iframeHeight = 500
  @observable contentHeight = 500
  @observable dropdown = observable.map<string,{ visible: boolean,uid: string,tabkey: string,isAddContextmenu: boolean }>()
}
interface IState{
}
@bind({ store: LegionsStoreLayout.TabPaneViewStore,menuStore: LegionsStoreLayout.MenuStore })
@observer
export default class ContentPart extends React.Component<legionsProLayoutProps['contentPart'],IState> {
  history = this.props.store.context._manage.history;
  viewModel = observableViewModel<ViewModels>(new ViewModels())
  setIframe = debounce(() => {
    this.updateConentMinHeight();
  },1000)
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    fixedLayoutPosition: 'fixedSider',
  }
  componentDidMount() {
    this.updateConentMinHeight()
    window.addEventListener('resize',() => {
      this.setIframe()
    })
    this.props.isEnabledTabs && this.addContextmenu()
    window.onhashchange=function(){}
  }
  componentWillUnmount() {
    this.removeAllContextmenu()
  }
  componentDidUpdate() {
    this.props.isEnabledTabs && this.addContextmenu()
    const pane = this.props.store.panes.find((item) => item.key === this.props.store.activeKey);
    LayoutContentUtils.loadMicroApp(pane,this,this.props.store.proxySanbox);
    this.updateConentMinHeight()
  }
  updateConentMinHeight() {
    const headerDoms = document.getElementsByClassName('ant-pro-fixed-header')
    const tabsBarDoms = document.getElementsByClassName('ant-tabs-bar')
    let headerHeight = 50;
    let tabsBarHeight = 31;
    if (headerDoms.length) {
      headerHeight = headerDoms[0].clientHeight||50;
    }
    if (tabsBarDoms.length) {
      tabsBarHeight = tabsBarDoms[0].clientHeight||31;
    }
    this.viewModel.contentHeight = document.body.clientHeight - headerHeight - tabsBarHeight
    this.viewModel.iframeHeight= this.viewModel.contentHeight
  }
  /** 添加页签悬浮窗 */
  addContextmenu() {
    const keys = this.viewModel.dropdown.keys();
    for (let item of keys) {
      const view = this.viewModel.dropdown.get(item)
      if (view) {
        const dropdownElm = ReactDOM.findDOMNode(this.refs[view.uid])
        if (dropdownElm) {
          const el = ReactDOM.findDOMNode(this.refs[`${view.uid}${view.tabkey}`])
          if (el && el.parentElement && el.parentElement.parentElement) {
            if (!view.isAddContextmenu) {
              el.parentElement.parentElement.removeEventListener('contextmenu',this.handleContextmenu.bind(this,el.id))
              el.parentElement.parentElement.addEventListener('contextmenu',this.handleContextmenu.bind(this,el.id))
              view.isAddContextmenu = true;
            }
            else {
              if (el.parentElement.parentElement.classList.toString().indexOf(styles.outSide) < 0) {
                el.parentElement.parentElement.className = `${el.parentElement.parentElement.className} ${styles.outSide}`
              }
            }
            focusBind(el.parentElement.parentElement,this.handleOutside.bind(this,item),styles.outSide)
          }

        }
      }
    }
  }
  /** 移除全部页签悬浮窗 */
  removeAllContextmenu() {
    const keys = this.viewModel.dropdown.keys();
    for (let item of keys) { 
      const view = this.viewModel.dropdown.get(item)
      if (view) {
        const dropdownElm = ReactDOM.findDOMNode(this.refs[view.uid])
        if (dropdownElm) {
          const el = ReactDOM.findDOMNode(this.refs[`${view.uid}${view.tabkey}`])
          if (el && el.parentElement && el.parentElement.parentElement) {
            el.parentElement.parentElement.removeEventListener('contextmenu',this.handleContextmenu.bind(this,el.id))
          }
          // @ts-ignore
          focusUnbind(el.parentElement.parentElement,this.handleOutside.bind(this,item),styles.outSide)
        }
      }
    }
  }
  /** 移除页签悬浮窗dom 元素 */
  removeContextmenu(itemKey) {
    const view = this.viewModel.dropdown.get(itemKey)
    if (view) {
      const dropdownElm = ReactDOM.findDOMNode(this.refs[view.uid])
      if (dropdownElm) {
        const el = ReactDOM.findDOMNode(this.refs[`${view.uid}${view.tabkey}`])
        if (el && el.parentElement && el.parentElement.parentElement) {
          el.parentElement.parentElement.removeEventListener('contextmenu',this.handleContextmenu.bind(this,el.id))
        }
        // @ts-ignore
        focusUnbind(el.parentElement.parentElement,this.handleOutside.bind(this,itemKey),styles.outSide)
      }
    }
  }
  handleContextmenu(tabkey,even) {
    even.preventDefault()
    this.viewModel.dispatchAction(() => {
      this.viewModel.dropdown.get(tabkey).visible = true;
      const keys = this.viewModel.dropdown.keys();
      for (let item of keys) {
        if (item !== tabkey) {
          this.viewModel.dropdown.get(item).visible = false
        }
      }
    })
  }
  /** 在页签元素之外单击关闭悬浮窗 */
  handleOutside(item) {
    const timeid = setTimeout(() => {
      this.viewModel.dispatchAction(() => {
        if (this.viewModel.dropdown.get(item)) {
          this.viewModel.dropdown.get(item).visible = false
        }
      })
      clearTimeout(timeid)
    },200)
  }
  handleDropMenuItemClick(tabkey: string,even) {
    const { key } = even;
    if (key === 'closeOther') {
      const keys = this.viewModel.dropdown.keys();
      const keysList: string[] = []
      for (let item of keys) {
        keysList.push(item)
      }
      const tabkeys = keysList.filter((item) => item !== tabkey)
      this.handleEdit(tabkeys,'remove')
    }
    else if (key === 'closeCurr') {
      if (this.viewModel.dropdown.size === 1) {
        message.warning('至少保留一个页签')
      }
      else {
        this.handleEdit(tabkey,'remove')
      }
    }
  }
  /** 渲染页签悬浮窗元素 */
  renderDropMenuElement(tabkey: string) {
    return (
      <Menu onClick={this.handleDropMenuItemClick.bind(this,tabkey)}>
        <Menu.Item key="closeOther">
          <span >关闭其他</span>
        </Menu.Item>
        <Menu.Item key="closeCurr">
          <span >关闭当前</span>
        </Menu.Item>
      </Menu>
    )
  }
  renderTabPaneElement() {
    const { store } = this.props;
   
    return store.panes.map((pane,index) => {
      let routerPath = store.proxySanbox.getRouterPath(pane);
      const appid=store.proxySanbox.createMicroAppId(pane)
      const keys = `${pane.sandbox.appName}-${appid}`
      return <TabPane
       data-id={`${keys}-legions`}
       data-service={keys}
       data-app={pane.sandbox.appName}
       data-page={`${pane.sandbox.appName}-${routerPath}`}
       data-mode={pane.loadingMode}
        style={{ outline: 'none' }}
        tab={this.renderTitleElement(pane.title,store.activeKey,pane.key)}
        key={`${pane.key}`}
        closable={pane.closable}
      >
        {this.renderContentElement(pane)}
      </TabPane>
    });
  }
  
  renderContentElement(pane: legionsProLayoutInterface['panes']) {
    //let regex = /^http|https:\/\/\w+\.\w+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if (typeof pane.path === "string") {
      return LayoutContentUtils.renderTabPaneContent(pane,this);
    }
  }
  /**
   * 渲染页签标题
   *
   * @param {any} title 标题名称
   * @param {any} activeKey 选中页签key
   * @param {any} currKey //当前页签key
   * @returns
   * @memberof ContentPart
   */
  renderTitleElement(title:string,activeKey:string,currKey:string) {
    if (!this.viewModel.dropdown.has(currKey)) {
      this.viewModel.dropdown.set(currKey,{ visible: false,tabkey: currKey,uid: `${shortHash(new Date().getTime())}`,isAddContextmenu: false })
    }
    let render = [];
    if (activeKey === currKey) {
      render.push(
        <span key={currKey} className={`${classNames({
          [styles['tag-dot-inner']]: true,
          [styles['tag-dot-innerblue']]: true,
        })}`} />
      );
    } else {
      render.push(<span key={currKey} className={styles['tag-dot-inner']} />);
    }
    render.push(
      <Dropdown trigger={['click']}
        ref={`${this.viewModel.dropdown.get(currKey).uid}`}
        overlay={this.renderDropMenuElement(currKey)}
        key={`dropdown${currKey}`}
        visible={this.viewModel.dropdown.get(currKey).visible}
        placement="bottomLeft"><span key={currKey}
          id={currKey}
          ref={`${this.viewModel.dropdown.get(currKey).uid}${this.viewModel.dropdown.get(currKey).tabkey}`}>{title}
        </span></Dropdown>);
    return <React.Fragment key={currKey}>
      {render}
    </React.Fragment>;
  }
  renderLayoutContentElement() {
    const { store } = this.props;
    const pane = this.props.store.panes.find(
      item => item.key === this.props.store.activeKey
    );
    if (this.props.userEntity !== void 0 && !this.props.userEntity.userUid) {
      return null;
    }
    if (this.props.isEnabledTabs) {
      return <Tabs
      className="legions-pro-layout-tabs"
        hideAdd
        tabPosition="top"
        animated={{ inkBar: false,tabPane: false }}
        type="editable-card"
        activeKey={store.activeKey}
        onEdit={this.handleEdit}
        onChange={this.handleChange}
        tabBarStyle={this.computedTabBarStyles()}
      >
        {this.renderTabPaneElement()}
      </Tabs>
    }
    else {
      return (
        <div id="micro-app-legions">
          {pane && this.renderContentElement(pane)}
        </div>
      )
    }
  }
  computedContentClassProps() {
    let classValue = {};
    if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
      if (this.props.menuStore.viewModel.fixedHeader) {
        classValue = {className:`legions-pro-layout-tabs-content-fixed ${this.props.isEnabledTabs?'':'legions-pro-layout-tabs-content-fixed-not-pane'}`}
       }
    }
    return classValue;
  }
  computedTabBarStyles() {
    let tabBarStyles: React.CSSProperties = { marginBottom: '0px',backgroundColor: '#fff' };
    if (this.props.fixedLayoutPosition === 'fixedSiderHeader') {
      if (this.props.menuStore.viewModel.fixedHeader) {
        tabBarStyles={...tabBarStyles,position:'fixed',top:'50px',zIndex:19,width:'90%'}
      }
    }
    return tabBarStyles;
  }
  /**
   * 修改页签活动状态
   *
   * @param {*} activeKey
   * @memberof ContentPart
   */
  handleChange = (activeKey: string) => {
    const { store } = this.props;
    const pane = store.panes.find((item) => item.key === activeKey);
    const oldpane = store.panes.find((item) => item.key === store.activeKey);
    store.setActiveKey(activeKey);
    store.proxySanbox.switchTabPaneSanboxMicroApp(oldpane,pane);
    this.props.menuStore.triggerSetBreadCrumbsEven(this.props.router);
  }

  /**
   *
   * 页签编辑行为
   * @param {*} targetKey
   * @param {*} action
   * @memberof ContentPart
   */
  handleEdit = (targetKey: string | string[],action: string) => {
    const { store } = this.props;
    const oldpane = store.panes.find((item) => item.key === targetKey as string);
    store.update(targetKey,action);
    const pane = store.panes.find((item) => item.key === store.activeKey);
    if (action === 'remove') {
      if (typeof targetKey === 'string') {
        this.removeContextmenu(targetKey)
        this.viewModel.dropdown.delete(targetKey)
      }
      else if (targetKey && Array.isArray(targetKey)) {
        targetKey.map((item) => {
          this.removeContextmenu(item)
          this.viewModel.dropdown.delete(item)
        })
      }
    }
    this.props.menuStore.triggerSetBreadCrumbsEven()
    store.proxySanbox.switchTabPaneSanboxMicroApp(oldpane,pane);
  }
  render() {
    let loading = true;
    if (this.props.userEntity && this.props.userEntity.userUid) {
      loading = false
    }
    return (
      <Content {...this.computedContentClassProps()}>
        {
            /** 菜单数据加载完毕之后再渲染content区域 */
            this.props.menuStore._ob_menu_request.isResolved && (
                /** 更具用户信息判断时候暂时loading状态 */
                this.props.userEntity !== void 0 ? <Spin tip="Loading..." spinning={loading}>
                {this.renderLayoutContentElement()}
                </Spin> : this.renderLayoutContentElement()
            )
        }
      </Content>
    );
  }
}
