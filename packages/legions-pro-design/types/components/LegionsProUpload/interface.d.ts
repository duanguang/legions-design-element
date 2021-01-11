/// <reference types="react" />
import { UploadChangeParam, UploadProps } from '../interface/antd';
export interface IProUploadProps extends UploadProps {
    label?: string | React.ReactNode;
    /**
     * 是否启用拖拽上传
     *
     * @type {boolean}
     * @memberof IHLUploadProps
     */
    isDragger?: boolean;
    /**
     * 约束文件类型 'docx','doc','xlsx','xls','pdf','zip','bmp','png','jpeg','jpg'
     *
     * 默认 'png','jpeg','jpg'
     * @type {string}
     * @memberof IHLUploadProps
     */
    accept?: string;
    /**
     *
     * 上传成功回调地址,远程调用接口和本地上传读取excel类型文件触发
     * @memberof IHLUploadProps
     */
    onSuccess?: (info: UploadChangeParam, header?: string[], data?: any[]) => void;
    /**
     * 文件上传失败时执行的钩子,远程调用接口和本地上传读取excel类型文件触发
     *
     * @memberof IHLUploadProps
     */
    onError?: (info: UploadChangeParam, even?: ProgressEvent) => void;
    /**
     * 最大上传附件数量
     *
     * 默认最大值3
     * @type {number}
     * @memberof IHLUploadProps
     */
    maxFileCount?: number;
    /**
     *
     * 当action 为空， 且文件类型为excel 类型时，自动转为本地上传
     * @type {string}
     * @memberof IHLUploadProps
     */
    action?: string;
    /**
     * 最大文件大小
     *
     * 单位MB
     *
     * 默认10MB
     * @type {number}
     * @memberof IHLUploadProps
     */
    maxFileSize?: number;
    /**
     * Dragger 拖拽模式 提示信息
     *
     * @type {(React.ReactNode|string)}
     * @memberof IHLUploadProps
     */
    prompt?: React.ReactNode | string;
    /**
     * 是否展示文件列表，该属性为true时，会强制关闭showUploadList。
     * 要显示图片及pdf预览功能，必须给fileLis中的url属性或者thumbUrl属性赋值，否则不显示预览按钮。
     * @type {boolean}
     * @memberof IHLUploadProps
     */
    showFileList?: boolean;
    /**
     * 文件列表分组数量，默认1
     * @type {(1 | 2 | 3 | 4 | 6 | 12)}
     * @memberof IHLUploadProps
     */
    showFileListGroup?: 1 | 2 | 3 | 4 | 6;
    /**
     * 通用上传接口配置，无需配置action
     * @memberof IHLUploadProps
     */
    commonActionConfig?: {
        /** 系统简称，必须是以下选项，4pl, scm, jabil, lcm, scp等，该属性觉得文件将保存到哪个模块下 */
        project: string;
        /** 模块名称，可自行定义 */
        module: string;
    };
    /**
     * 仅在表单中使用时有该属性，其他地方勿用
     * @type {UploadChangeParam}
     * @memberof IHLUploadProps
     */
    readonly value?: UploadChangeParam;
    /**
     * 数据转化，使用该属性后，表单与上传组件的数据交流都为UploadFile[]类型
     * @memberof IHLUploadProps
     */
    dataTransform?: (info: UploadChangeParam) => UploadChangeParam;
}
