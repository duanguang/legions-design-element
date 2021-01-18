import { ColumnProps } from 'antd/lib/table/Column';
import { ViewModel } from 'brain-store-utils';
import React from 'react';
import { UploadChangeParam, UploadFile, UploadFileStatus } from '../interface/antd';
import { OpenConfirm } from 'legions-lunar/antd-toolkit';
import { IProTableProps } from '../LegionsProTable/interface';
import { IProUploadProps } from '../LegionsProUpload/interface';
declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
/** 公共导入组件按钮类型 */
export declare enum HLDataImportBtnEnum {
    /** 下载模板 */
    template = 0,
    /** 上传文件 */
    upload = 1,
    /** 覆盖导入 */
    cover = 2,
    /** 导入数据 */
    submit = 3,
    /** 删除错误数据 */
    delete = 4,
    /** 导入错误数据 */
    export = 5,
    /** 返回按钮 */
    goBack = 6
}
/** 公共导入组件数据格式 */
export interface HLDataImportRow {
    /** 标识本条数据是否错误 */
    isError: boolean;
    /** 标识本条数据是否有警告 */
    isWarn?: boolean;
}
/** 公共导入组件数据实体 */
export interface InstanceHLDataImport<TableRow = {}> {
    viewModel: ViewModel<HLDataImportViewModel<TableRow>> & Proxify<HLDataImportViewModel<TableRow>>;
}
/** 公共导入组件参数 */
export declare class HLDataImportProps<TableRow = {}, Model = {}> {
    /**
     * 表格配置项, 配置项参考是HLTable 不要配置data，表格data已被托管
     * @type {Partial<IHLTableProps<TableRow, Model>>}
     * @memberof HLDataImportProps
     */
    tableProps: Partial<IProTableProps<TableRow, Model>> & {
        uniqueKey: string;
    };
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
    uploadProps?: IProUploadProps;
    /**
     * 上传成功后的数据处理
     * @memberof HLDataImportProps
     */
    uploadDataTransform?: (reponse?: any, localData?: any[]) => TableRow[] | Promise<TableRow[]>;
    /**
     * 覆盖删除按钮弹窗配置
     * @type {ModalFuncProps}
     * @memberof HLDataImportProps
     */
    deleteModalProps?: Parameters<typeof OpenConfirm>[0];
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
    className?: string;
    /**
     * 可配置需要隐藏的按钮列表
     * @type {HLDataImportBtnEnum[]}
     * @memberof HLDataImportProps
     */
    hideBtnList?: HLDataImportBtnEnum[];
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
    errorFileName?: string;
    /**
     * 自定义导出错误数据的列配置，默认会使用表格的columns，在表格配置不满足导入需求时可用该属性代替
     * @type {ColumnProps<TableRow>[]}
     * @memberof HLDataImportProps
     */
    errorFileColumns?: ColumnProps<TableRow>[];
    /**
     * 提交按钮loading状态
     * @type {Boolean}
     * @memberof HLDataImportProps
     */
    submitBtnLoading?: boolean;
    /**
     * 提交
     * @memberof HLDataImportProps
     */
    onSubmit?: (data?: TableRow[]) => void;
    /**
     * 返回，默认window.history.back()
     * @memberof HLDataImportProps
     */
    onBack?: () => void;
    /**
     * 获取组件数据实体
     * @memberof HLDataImportProps
     */
    onReady?: (instance: InstanceHLDataImport<TableRow>) => void;
}
declare class HLDataImportViewModel<TableRow = {}> {
    /** 表格数据 */
    list: (HLDataImportRow & TableRow)[];
    /** 当前上传的文件 */
    file: Partial<UploadFile>;
    /** 文件上传状态 */
    fileStatus: UploadFileStatus;
    /** 是否覆盖导入 */
    isCover: boolean;
}
export default class LegionsProDataImport<TableRow = {}, Model = {}> extends React.Component<HLDataImportProps<HLDataImportRow & TableRow, Model>> {
    static defaultProps: Object;
    viewModel: ViewModel<HLDataImportViewModel<HLDataImportRow & TableRow>> & import("brain-store-utils").Proxify<HLDataImportViewModel<HLDataImportRow & TableRow>>;
    /** 正确数据 */
    get successList(): (HLDataImportRow & TableRow)[];
    /** 错误数据 */
    get errorList(): (HLDataImportRow & TableRow)[];
    /** 警告数据 */
    get warnList(): (HLDataImportRow & TableRow)[];
    componentWillMount(): void;
    /** 返回 */
    handleBack: () => void;
    /** 下载模板 */
    handleTemplate: () => void;
    /** 上传文件状态变化 */
    handleUploadChange: (info: UploadChangeParam) => void;
    /** 上传文件 */
    handleUpload: (info: UploadChangeParam, header?: string[], data?: any[]) => Promise<void>;
    /** 覆盖导入 */
    handleCover: () => void;
    /** 导入数据 */
    handleSubmit: () => void;
    /** 删除错误数据 */
    handleDelete: () => void;
    /** 导入错误数据 */
    handleExport: () => void;
    /** 清空文件，恢复初始状态 */
    reset: () => void;
    render(): JSX.Element;
}
export {};
