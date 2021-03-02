import React from 'react';
import { UploadChangeParam, UploadFile } from '../interface/antd';
import './style/index.less';
import { IProUploadProps } from './interface';
interface IState {
    fileList?: UploadFile[];
    uploadLoading?: boolean;
    progressPercent?: number;
}
export default class LegionsProUpload extends React.Component<IProUploadProps, IState> {
    static defaultProps: {
        listType: string;
        label: string;
        name: string;
        maxFileCount: number;
        accept: string;
        maxFileSize: number;
        showFileList: boolean;
        showFileListGroup: number;
        dataTransform: (info: UploadChangeParam) => UploadChangeParam;
    };
    timeid: any;
    constructor(props: IProUploadProps);
    componentWillReceiveProps(nextProps: IProUploadProps): void;
    getFileSize(fileByte: number): number;
    readFile(file: any, fileList: UploadFile[]): void;
    handlePreview: (file: UploadFile) => void;
    onRemove: (file: UploadFile) => boolean | void;
    filterAccept(): string;
    onChange(info: UploadChangeParam): void;
    beforeUpload: (file: UploadFile, fileList: UploadFile[]) => boolean | PromiseLike<any>;
    /** 文件列表预览, fileList必须要有thumbUrl或者url才可实现预览 */
    fileListPreview: (url: string) => void;
    /** 文件列表删除 */
    fileListDelete: (file: UploadFile) => void;
    /** 渲染文件列表 */
    renderFileList: () => JSX.Element;
    render(): JSX.Element;
}
export {};
