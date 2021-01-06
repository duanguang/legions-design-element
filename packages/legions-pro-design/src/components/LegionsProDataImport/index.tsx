/*
 * @Author: linzeqin
 * @Date: 2020-02-27 10:24:33
 * @description: 全平台公共导入组件
 */
import { Button,Col,Icon,Row,message } from 'antd';
import { ColumnProps } from 'antd/lib/table/Column';
/* import download from 'hoolinks/download'; */
import { download } from 'legions-utils-tool/download'
import { observer } from 'legions/store-react';
import { observableViewModel, ViewModel } from 'brain-store-utils';
import { observable, toJS } from 'mobx';
import React from 'react';
import { UploadChangeParam,UploadFile,UploadFileStatus } from '../interface/antd';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { OpenConfirm } from 'legions-lunar/antd-toolkit';
import LegionsProTable from '../LegionsProTable';
import {IProTableProps} from '../LegionsProTable/interface';
import LegionsProUpload from '../LegionsProUpload';
import {IProUploadProps} from '../LegionsProUpload/interface'
import styles from './index.modules.less';


type Proxify<T> = {
    [P in keyof T]: T[P]
};

/** 公共导入组件按钮类型 */
export enum HLDataImportBtnEnum {
    /** 下载模板 */
    template,
    /** 上传文件 */
    upload,
    /** 覆盖导入 */
    cover,
    /** 导入数据 */
    submit,
    /** 删除错误数据 */
    delete,
    /** 导入错误数据 */
    export,
    /** 返回按钮 */
    goBack,
}

/** 公共导入组件数据格式 */
export interface HLDataImportRow {
    /** 标识本条数据是否错误 */
    isError: boolean;
    /** 标识本条数据是否有警告 */
    isWarn?: boolean;
};

/** 公共导入组件数据实体 */
export interface InstanceHLDataImport<TableRow={}> {
    viewModel: ViewModel<HLDataImportViewModel<TableRow>> & Proxify<HLDataImportViewModel<TableRow>>;
}

/** 公共导入组件参数 */
export class HLDataImportProps<TableRow = {},Model = {}> {
    /**
     * 表格配置项, 配置项参考是HLTable 不要配置data，表格data已被托管
     * @type {Partial<IHLTableProps<TableRow, Model>>}
     * @memberof HLDataImportProps
     */
    tableProps: Partial<IProTableProps<TableRow,Model>> & { uniqueKey: string } = { uniqueKey: '' };
    /**
     * 模板地址，不传递该参数，模板下载按钮将置灰
     * @type {string}
     * @memberof HLDataImportProps
     */
    templateUrl?: string;
    /**
     * 上传按钮配置项, 配置项参考是HLUpload，本地开发注意配置代理
     * @type {IHLUploadProps}
     * @memberof HLDataImportProps
     */
    uploadProps?: IProUploadProps = {};
    /**
     * 上传成功后的数据处理
     * @memberof HLDataImportProps
     */
    uploadDataTransform?: (reponse?: any,localData?: any[]) => TableRow[] | Promise<TableRow[]>;
    /**
     * 覆盖删除按钮弹窗配置
     * @type {ModalFuncProps}
     * @memberof HLDataImportProps
     */
    deleteModalProps?: Parameters<typeof OpenConfirm>[0] = {};
    /**
     * 容器样式
     * @type {React.CSSProperties}
     * @memberof HLDataImportProps
     */
    style?: React.CSSProperties;
    /**
     * 容器类名
     * @type {string}
     * @memberof HLDataImportProps
     */
    className?: string = '';
    /**
     * 可配置需要隐藏的按钮列表
     * @type {HLDataImportBtnEnum[]}
     * @memberof HLDataImportProps
     */
    hideBtnList?: HLDataImportBtnEnum[] = [];
    /**
     * 自定义添加其他按钮，会追加在所有操作按钮的最后面
     * @type {React.ReactNode}
     * @memberof HLDataImportProps
     */
    customBtn?: React.ReactNode;
    /**
     * 导出错误数据的文件名称，默认'错误数据'
     * @type {string}
     * @memberof HLDataImportProps
     */
    errorFileName?: string = '错误数据';
    /**
     * 自定义导出错误数据的列配置，默认会使用表格的columns，在表格配置不满足导入需求时可用该属性代替
     * @type {ColumnProps<TableRow>[]}
     * @memberof HLDataImportProps
     */
    errorFileColumns?: ColumnProps<TableRow>[] = [];
    /**
     * 提交按钮loading状态
     * @type {Boolean}
     * @memberof HLDataImportProps
     */
    submitBtnLoading?: boolean = false;
    /**
     * 提交
     * @memberof HLDataImportProps
     */
    onSubmit?: (data?: TableRow[]) => void;
    /**
     * 返回，默认window.history.back()
     * @memberof HLDataImportProps
     */
    onBack?: () => void = () => window.history.back();
    /**
     * 获取组件数据实体
     * @memberof HLDataImportProps
     */
    onReady?: (instance: InstanceHLDataImport<TableRow>) => void;
}

class HLDataImportViewModel<TableRow = {}> {
    /** 表格数据 */
    @observable list: (HLDataImportRow & TableRow)[] = []
    /** 当前上传的文件 */
    @observable file: Partial<UploadFile> = {};
    /** 文件上传状态 */
    @observable fileStatus: UploadFileStatus = 'done';
    /** 是否覆盖导入 */
    @observable isCover: boolean = false;
}

@observer
export default class LegionsProDataImport<TableRow = {},Model = {}> extends React.Component<HLDataImportProps<HLDataImportRow & TableRow,Model>> {
    static defaultProps = new HLDataImportProps as Object;
    viewModel = observableViewModel<HLDataImportViewModel<HLDataImportRow & TableRow>>(new HLDataImportViewModel());
    /** 正确数据 */
    get successList() {
        return this.viewModel.list.filter((item) => {
            return !item.isError && !item.isWarn
        })
    }
    /** 错误数据 */
    get errorList() {
        return this.viewModel.list.filter((item) => {
            return item.isError
        })
    }
    /** 警告数据 */
    get warnList() {
        return this.viewModel.list.filter((item) => {
            return item.isWarn
        })
    }

    componentWillMount() {
        this.props.onReady && this.props.onReady({
            viewModel: this.viewModel,
        })
    }

    /** 返回 */
    handleBack = () => {
        this.props.onBack && this.props.onBack();
    }
    /** 下载模板 */
    handleTemplate = () => {
        this.props.templateUrl && download([this.props.templateUrl]);
    }
    /** 上传文件状态变化 */
    handleUploadChange = (info: UploadChangeParam) => {
        this.viewModel.fileStatus = info.file.status;
    }
    /** 上传文件 */
    handleUpload = async (info: UploadChangeParam,header?: string[],data?: any[]) => {
        const res = this.props.uploadDataTransform && this.props.uploadDataTransform(info.file.response,data) || []
        /** 先重置当前状态 */
        this.reset();
        /** 开启异步处理的loading状态 */
        this.viewModel.fileStatus = 'uploading';
        /** 再赋值新数据 */
        this.viewModel.list = (await res).map((item) => ({
            ...item,
            className: item.isError ? styles.errorRow : item.isWarn ? styles.warnRow : '',
        }));
        this.viewModel.file = info.file;
        this.props.uploadProps && this.props.uploadProps.onSuccess && this.props.uploadProps.onSuccess(info,header,data);
        /** 关闭loading状态 */
        setTimeout(() => { this.viewModel.fileStatus = 'done'; })
    }
    /** 覆盖导入 */
    handleCover = () => {
        this.viewModel.isCover = !this.viewModel.isCover;
    }
    /** 导入数据 */
    handleSubmit = () => {
        this.props.onSubmit && this.props.onSubmit(toJS(this.viewModel.list));
    }
    /** 删除错误数据 */
    handleDelete = () => {
        const { hideBtnList,deleteModalProps } = this.props;
        const hasCoverBtn = !hideBtnList.includes(HLDataImportBtnEnum.cover);
        OpenConfirm({
            type: 'info',
            title: '删除提示',
            content: <div>
                <div>其中包含<span style={{ color: 'red' }}>{this.errorList.length}</span>条数据与系统数据重复，是否要删除？</div>
                {
                    hasCoverBtn && [
                        <div>不删除，支持覆盖导入：会用最新数据覆盖系统旧数据</div>,
                        <div>确定删除：删除重复数据</div>,
                    ]
                }
            </div>,
            okText: '确认删除',
            okType: 'primary',
            width: 800,
            cancelText: hasCoverBtn ? '不删除，支持覆盖导入' : '取消',
            onOk: () => {
                this.viewModel.list = this.viewModel.list.filter((item) => !item.isError)
            },
            onCancel: () => {
                if (hasCoverBtn) {
                    this.viewModel.isCover = true;
                }
            },
            ...deleteModalProps,
        })
    }
    /** 导入错误数据 */
    handleExport = () => {
        if (!legionsThirdpartyPlugin.plugins.excel) {
            message.warning('Plugin is not ready to excel, Please install at the entrance(legionsThirdpartyPlugin.use({name:"excel",url:"xxxx"}))');
            return;
        }
        const { errorFileColumns,tableProps } = this.props;
        const colums = errorFileColumns.length > 0 ? errorFileColumns : tableProps.columns;
        legionsThirdpartyPlugin.plugins.excel.exportJsonToExcel({
            data: this.errorList,
            //@ts-ignore
            columns: colums && colums.filter((item) => {
                return (item as any).isExport !== false
            }),
            filename: this.props.errorFileName,
            autoWidth: true
        })
    }
    /** 清空文件，恢复初始状态 */
    reset = () => {
        this.viewModel.reset()
    }

    render() {
        const { style,className,tableProps,templateUrl,hideBtnList,uploadProps,customBtn,submitBtnLoading } = this.props;
        const { list,file,isCover,fileStatus } = this.viewModel;

        return (
            <div style={style} className={`${styles.wrap} ${className}`}>
                <div className={styles.btnWrap}>
                    {}
                    <div className={styles.btnLeft}>
                        {!hideBtnList.includes(HLDataImportBtnEnum.goBack) && <Button onClick={this.handleBack}>返回</Button>}
                    </div>
                    <div className={styles.btnRight}>
                        {!hideBtnList.includes(HLDataImportBtnEnum.template) && (
                            <Button onClick={this.handleTemplate} disabled={!templateUrl} icon="download">
                                下载模板
                            </Button>
                        )}
                        {!hideBtnList.includes(HLDataImportBtnEnum.upload) && (
                            <LegionsProUpload
                                showUploadList={false}
                                accept="xlsx,xls"
                                maxFileCount={1000}
                                onChange={this.handleUploadChange}
                                {...uploadProps}
                                onSuccess={this.handleUpload}>
                                <Button icon="folder-open" disabled={!uploadProps} loading={fileStatus === 'uploading'}>
                                    {list.length > 0 ? '重新选择' : '选择文件'}
                                </Button>
                            </LegionsProUpload>
                        )}
                        {!hideBtnList.includes(HLDataImportBtnEnum.cover) && (
                            <Button onClick={this.handleCover} disabled={!(list.length > 0)}>
                                <Icon type="check-circle-o" style={{ color: isCover ? '#02A854' : '#ccc',fontWeight: 'bold' }} />
                                支持覆盖导入
                            </Button>
                        )}
                        {!hideBtnList.includes(HLDataImportBtnEnum.submit) && (
                            <Button
                                onClick={this.handleSubmit}
                                disabled={
                                    !(
                                        /** 列表有数据并且没有错误信息，或者列表有数据并且支持覆盖 */
                                        (
                                            (list.length > 0 && this.errorList.length === 0) ||
                                            (list.length > 0 && !hideBtnList.includes(HLDataImportBtnEnum.cover) && isCover)
                                        )
                                    )
                                }
                                loading={submitBtnLoading}
                                icon="upload">
                                导入数据
                            </Button>
                        )}
                        {!hideBtnList.includes(HLDataImportBtnEnum.delete) && (
                            <Button onClick={this.handleDelete} disabled={!(this.errorList.length > 0)} type="danger" icon="delete">
                                删除错误信息
                            </Button>
                        )}
                        {!hideBtnList.includes(HLDataImportBtnEnum.export) && (
                            <Button onClick={this.handleExport} disabled={!(this.errorList.length > 0)} icon="export">
                                导出错误数据
                            </Button>
                        )}
                        {customBtn}
                    </div>
                </div>
                <Row className={styles.tipWrap}>
                    <Col span={12} className={styles.tipLeft}>
                        <span>校验数据</span>
                        {file.name && (
                            <span className={styles.fileName}>
                                {file.name}
                                <Icon className={styles.fileDel} onClick={this.reset} type="close"></Icon>
                            </span>
                        )}
                    </Col>
                    {list.length > 0 && (
                        <Col span={12} className={styles.tipRight}>
                            <span className={styles.total}>
                                <b>{list.length}</b>条数据：
                            </span>
                            <span className={styles.success}>
                                校验通过<b>{this.successList.length}</b>
                            </span>
                            <span className={styles.error}>
                                校验不通过<b>{this.errorList.length}</b>
                            </span>
                            <span className={styles.warn}>
                                警告<b>{this.warnList.length}</b>
                            </span>
                        </Col>
                    )}
                </Row>
                <div className={styles.tableWrap}>
                    {
                        //@ts-ignore
                        <LegionsProTable
                            onPagingQuery={() => void 0}
                            pageSize={20}
                            locale={{ emptyText: <div className={styles.emptyText}>无数据，请点击【选择文件】导入数据</div> }}
                            columns={[]}
                            isOpenRowSelection={false}
                            isOpenRowChange={false}
                            {...tableProps}
                            data={list}
                        ></LegionsProTable>
                    }
                   
                </div>
            </div>
        );
    }
}
