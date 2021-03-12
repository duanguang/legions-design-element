import React,{ Component } from 'react'
import { bind,observer } from 'legions/store-react'
import LegionsStoreForm from '../LegionsStoreForm';
import { shortHash } from 'legions-lunar/object-hash';
import { Icon,Popover } from 'antd';
import styles from './style/index.modules.less'
import './style/index.less'
import { IErrorView } from '../LegionsStoreForm/interface';
import { runInAction } from 'mobx';
interface IProps {
    store?: InstanceType<typeof LegionsStoreForm>;
    errorClassName?: string;
    className?: string

    /**
     *
     * 用于关联业务错误信息的唯一编码
     * @type {string}
     * @memberof IProps
     */
    code: string;

    /**
     *
     * 表单uid
     * @type {string}
     * @memberof IProps
     */
    formUid: string;
    onIgnoreError?: (item: any) => void
}
interface IState {

}
@bind({ store: LegionsStoreForm })
@observer
export default class LegionsProErrorReportShow extends Component<IProps,IState> {
    timeId = new Date().getTime()
    uid = ''
    enumList = { 1: '已忽略',2: '忽略' }
    constructor(props) {
        super(props)
        this.uid = `error${this.props.code}${shortHash(this.timeId)}`
        if (this.props.formUid && this.viewForm) {
            this.viewForm._collectErrorReactNode(this.props.code,this.uid)
        }
        //this.props.store.addErrorListViewKeyValues(this.props.code,this.uid)
    }
    get viewForm() {
        return this.props.store.get(this.props.formUid)
    }
    handleIgnore(item: IErrorView) {
        if (item.status === 2) {
            runInAction(() => {
                item.status = 1;
                const canBeSubmit = this.viewForm && this.viewForm._errorListView.get(this.uid).every((item) => item.type === 'canBeSubmit' && item.status === 1)
                const has = this.viewForm._errorListView.get(this.uid).every((item) => item.status === 1)
                const view = this.viewForm.computedErrorReactNodeList.get(this.props.code)
                if (canBeSubmit && has) {
                    view.validateStatus = ''
                } else {
                    view.validateStatus = 'error'
                }
            })
        }
        this.props.onIgnoreError && this.props.onIgnoreError(item)
    }
    renderContent() {
        const data = this.viewForm && this.viewForm._errorListView.get(this.uid)
        const canBeSubmit = data.filter((item) => item.type === 'canBeSubmit')
        const doNotSubmit = data.filter((item) => item.type === 'doNotSubmit')
        return (
            <div className={styles['tip-alert-panel']}>
                {canBeSubmit.length > 0 && (<div>
                    <div className={styles['tip-alert-title']}>可提交</div>
                    {canBeSubmit.map((item) => {
                        return <div className={styles['tip-alert-panel-item']}>
                            <div className={`${styles['tip-alert-panel-item-content']} ${styles.canIgnore}`}>{item.title}</div>
                            <span className={`${styles.ignoreBtn} ${item.status === 1 ? styles.ignored : ''}`} onClick={this.handleIgnore.bind(this,item)}>{this.enumList[item.status]}</span>
                        </div>
                    })}
                </div>)

                }
                {doNotSubmit.length > 0 && (<div>
                    <div className={styles['tip-alert-title']}>不可提交</div>
                    {doNotSubmit.map((item) => {
                        return <div className={styles['tip-alert-panel-item']}>
                            <div className={`${styles['tip-alert-panel-item-content']}`}>{item.title}</div>

                        </div>
                    })}
                </div>)

                }
            </div>
        )
    }
    render() {
        const isShowErrorView = this.viewForm && this.viewForm._errorListView.has(this.uid)
        const view = this.viewForm && this.viewForm.computedErrorReactNodeList.get(this.props.code);

        return (
            <div className={`${this.props.className || ''} ${isShowErrorView && view.validateStatus === 'error' ? 'has-error' : ''}`}>
                {/* <div className={`${this.props.errorClassName || ''}`}>
                    <Icon type="exclamation-circle" style={{ fontSize: '14px' }} />
                </div> */}
                {isShowErrorView && <div className={`${this.props.errorClassName || ''} ${(view && view.validateStatus) === '' && styles.tipIconAllow}`}>
                    <Popover placement="bottom" title={''} content={this.renderContent()} trigger="click">
                        <Icon type="exclamation-circle" style={{ fontSize: '14px' }} />
                    </Popover>
                </div>}
                {this.props.children}
            </div>
        )
    }
}
