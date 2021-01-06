import { Button,Icon,message,Progress,Spin,Upload,Row,Col } from 'antd';
import React from 'react';
import { UploadChangeParam,UploadFile } from '../interface/antd';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { NProgress } from 'legions-nprogress';
import './style/index.less';
import { FileTypeList,XlsType,XlsxType } from './uploadType';
import { isNullOrUndefined } from 'util';
import { IProUploadProps } from './interface';
const Dragger = Upload.Dragger;

interface IState {
    fileList?: UploadFile[],
    uploadLoading?: boolean,
    progressPercent?: number,
}
export default class LegionsProUpload extends React.Component<IProUploadProps,IState>{
    static defaultProps = {
        listType: 'text',
        label: '上传',
        name: 'file',
        maxFileCount: 3,
        accept: 'png,jpeg,jpg',
        maxFileSize: 10,
        showFileList: false,
        showFileListGroup: 1,
        dataTransform: (info: UploadChangeParam) => info
    };
    timeid = null
    constructor(props: IProUploadProps) {
        super(props);
        /** 处理在表单中使用时，初始赋值问题 */
        const fileList = !isNullOrUndefined(props.value)
            ? (props.value.fileList || [])
            : (this.props.fileList || this.props.defaultFileList || [])
        this.state = {
            fileList,
            uploadLoading: false,
            progressPercent: 0,
        }
    }
    componentWillReceiveProps(nextProps: IProUploadProps) {
        if (!isNullOrUndefined(nextProps.value) && this.props.value !== nextProps.value) {
            if (nextProps.value && nextProps.value.fileList && nextProps.value.fileList.length <= this.props.maxFileCount) {
                this.setState({
                    fileList: nextProps.value.fileList || []
                })
            }
        } else if (this.props.fileList !== nextProps.fileList) {
            this.setState({
                fileList: [...nextProps.fileList]
            })
        }
    }
    getFileSize(fileByte: number) {
        let fileSizeByte = fileByte;
        let fileSizeMsg = '';
        if (fileSizeByte) {
            fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(3)
        }
        return parseFloat(fileSizeMsg);
    }
    readFile(file,fileList: UploadFile[]) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadstart = e => {
            this.setState({
                uploadLoading: true,
                progressPercent: 0,
            })
            NProgress.start();
        }
        reader.onprogress = e => {
            // const progressPercent = Math.round(e.loaded / e.total * 100)
            // this.setState({progressPercent})
        }
        reader.onerror = (e: ProgressEvent) => {
            this.setState({
                uploadLoading: false,
                fileList: [...fileList],
            })
            this.props.onError && this.props.onError({ file,fileList },e)
        }
        reader.onload = (e: ProgressEvent) => {
            if (!legionsThirdpartyPlugin.plugins.excel) {
                message.warning('Plugin is not ready to excel, Please install at the entrance(legionsThirdpartyPlugin.use({name:"excel",url:"xxxx"}))');
                return;
            }
            // @ts-ignore
            const data = e.target.result
            const { header,results } = legionsThirdpartyPlugin.plugins.excel.read(data,'array')
            NProgress.done();
            this.setState({
                uploadLoading: false,
                fileList: [...fileList],
            })
            /* const tableTitle = header.map(item => { return { title: item, key: item } }) */
            this.props.onSuccess && this.props.onSuccess({ file,fileList },header,results)
        }
    }
    handlePreview = (file: UploadFile) => {
        this.props.onPreview && this.props.onPreview(file)
    }
    onRemove = (file: UploadFile) => {
        if (this.props.onRemove) {
            return this.props.onRemove(file)
        }
        return true
    }
    filterAccept() {
        const accept = this.props.accept || ''
        const arr = accept.split(',')
        return arr.map((item) => {
            const model = FileTypeList.find((m) => m.name === item)
            if (model) {
                return model.type
            }
            return item
        }).join(',')
    }
    onChange(info: UploadChangeParam) {
        if (info.file.status === 'error') {
            this.props.onError && this.props.onError(info)
        }
        else if (info.file.status === 'done') {
            this.props.onSuccess && this.props.onSuccess(info)
        }
        const legaldata = [info.file].filter(v => this.filterAccept().includes(v['type']))
        const size = this.getFileSize(info.file.size)
        if (info.fileList && info.fileList.length <= this.props.maxFileCount && legaldata.length && size <= this.props.maxFileSize) {
            this.setState({
                fileList: [...info.fileList],
            });
        }
        this.props.onChange && this.props.onChange(this.props.dataTransform(info))
    }
    beforeUpload = (file: UploadFile,fileList: UploadFile[]) => {
        const legaldata = [file].filter(v => this.filterAccept().includes(v['type']))
        const len = this.state.fileList ? this.state.fileList.length + 1 : 0;
        const size = this.getFileSize(file.size)
        if (this.props.maxFileCount && this.props.maxFileCount > 0 && len > this.props.maxFileCount) {
            if (!this.timeid) {
                this.timeid = setTimeout(() => {
                    message.warning(`可上传最大数量:${this.props.maxFileCount}个`,8)
                    clearTimeout(this.timeid)
                    this.timeid = null
                },200);
            }
            return false;
        }
        else if (this.props.maxFileSize && this.props.maxFileSize > 0 && size > this.props.maxFileSize) {
            if (!this.timeid) {
                this.timeid = setTimeout(() => {
                    message.warning(`可上传最大文件大小不能超过${this.props.maxFileSize}MB`,4)
                    clearTimeout(this.timeid)
                    this.timeid = null
                },200);
            }
            return false;
        }
        else if (this.filterAccept() && !legaldata.length) {
            if (!this.timeid) {
                const unlegaldata = fileList.filter(v => !this.filterAccept().includes(v['type']))
                this.timeid = setTimeout(() => {
                    const error = unlegaldata.map((item) => item.name).join(',')
                    message.warning(`当前文件类型:${file['type']},允许文件类型(${this.props.accept})【不符合文件】:${error}`,4)
                    clearTimeout(this.timeid)
                    this.timeid = null
                },200);
            }
            return false;
        }
        else if (!this.props.action && !this.props.commonActionConfig && (file['type'] === XlsxType || file['type'] === XlsType)) { // 当action 为空，且文件为excel类型，改为本地读取
            this.readFile(file,fileList)
        }
        if (this.props.beforeUpload) {
            const upload = this.props.beforeUpload(file,fileList)
            return upload
        }
        return true
    }
    /** 文件列表预览, fileList必须要有thumbUrl或者url才可实现预览 */
    fileListPreview = (url: string) => {
        window.open(url,'_block')
    }
    /** 文件列表删除 */
    fileListDelete = (file: UploadFile) => {
        this.setState({
            fileList: this.state.fileList.filter((item) => item.uid !== file.uid)
        },() => {
            /** 触发表单onChange */
            this.props.onChange && this.props.onChange({
                file: file,
                fileList: this.state.fileList,
            })
        })
    }
    /** 渲染文件列表 */
    renderFileList = () => {
        const fileListDom = this.state.fileList.map((item) => {
            const fileName = item.thumbUrl || item.url || item.name;
            /** 文件后缀 */
            const suffix = fileName.substring(fileName.lastIndexOf(".") + 1,fileName.length)
            /** 可预览文件类型列表 */
            const previewFileTypeList = ['png','jpg','pdf']
            return <Col span={24 / this.props.showFileListGroup}>
                <div className="legions-pro-upload-file-list-item">
                    <span className="legions-pro-upload-file-list-icon" data-file-type={suffix}></span>
                    <span className="legions-pro-upload-file-list-name" title={item.name}>
                        {item.name}
                        <Progress
                            strokeWidth={2}
                            showInfo={false}
                            percent={item.status === 'error' ? 100 : item.percent}
                            status={item.status === 'error' ? 'exception' : 'success'}
                        ></Progress>
                    </span>
                    <span className="legions-pro-upload-file-list-btn">
                        {
                            previewFileTypeList.includes(suffix) &&
                            (item.thumbUrl || item.url) &&
                            <Icon type="eye" title="预览" onClick={() => this.fileListPreview(item.thumbUrl || item.url)}></Icon>
                        }
                        <Icon type="close" title="删除" onClick={() => this.fileListDelete(item)}></Icon>
                    </span>
                </div>
            </Col>
        })
        return <div className={`legions-pro-upload-file-list ${!this.props.isDragger ? 'legions-pro-upload-file-list-mini' : ''}`}>
            <Row gutter={20}>{fileListDom}</Row>
        </div>
    }
    render() {
        const { label,name,action,data,onSuccess,prompt,showFileList,commonActionConfig,...props } = this.props
        const { fileList } = this.state;
        const uploadProps = {
            name,
            action,
            /* action: commonActionConfig ? `${HttpConfig.fcService}?project=${commonActionConfig.project}&module=${commonActionConfig.module}` : action, */
            accept: this.filterAccept(),
            data,
            showUploadList: showFileList ? false : props.showUploadList,
        };
        return (
            <Spin spinning={this.state.uploadLoading} tip={`文件上传中...`}>
                {this.props.isDragger ? <Dragger
                    {...props}
                    {...uploadProps}
                    className={`legions-pro-upload-dragger`}
                    beforeUpload={this.beforeUpload}
                    customRequest={!uploadProps.action ? () => { // 自定义上传行为，暂定这样
                        this.props.customRequest && this.props.customRequest(this.state.fileList)
                    } : null}
                    fileList={this.state.fileList}
                    onChange={this.onChange.bind(this)}
                    onPreview={this.handlePreview}
                    onRemove={this.onRemove}
                >
                    {this.props.children ? this.props.children : <span>
                        {(!showFileList || fileList && fileList.length === 0) && <p className="ant-upload-drag-icon"></p>}
                        <p className="ant-upload-text">拖动图片到本窗口以上传，或者<span style={{ color: '#46a0ec' }}>点击上传</span></p>
                        {(prompt && typeof prompt === 'string') && <p className="ant-upload-hint">{prompt || '支持单个或者批量上传'}</p>}
                        {(prompt && typeof prompt === 'function') && prompt}
                        {(prompt && typeof prompt === 'object') && (prompt)}
                    </span>}
                </Dragger>
                    : <Upload
                        {...props}
                        {...uploadProps}
                        customRequest={!uploadProps.action ? () => {
                            this.props.customRequest && this.props.customRequest(this.state.fileList)
                        } : null}
                        beforeUpload={this.beforeUpload}
                        fileList={this.state.fileList}
                        onChange={this.onChange.bind(this)}
                        onPreview={this.handlePreview}
                        onRemove={this.onRemove}
                    >
                        {this.props.children ? this.props.children : <Button>
                            <Icon type="upload" /> {this.props.label}</Button>}
                    </Upload>}
                {/* 文件列表 */}
                {showFileList && this.renderFileList()}
            </Spin>
        )
    }
}
