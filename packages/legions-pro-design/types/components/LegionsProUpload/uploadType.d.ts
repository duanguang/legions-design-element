export declare const UploadType: string[];
export declare const FileTypeList: {
    type: string;
    name: string;
}[];
export declare const UploadFileTypeName: readonly ["docx", "doc", "xlsx", "xls", "pdf", "zip", "bmp", "png", "jpeg", "jpg"];
export declare const XlsType: string;
export declare const XlsxType: string;
declare type SuitTuple = typeof UploadFileTypeName;
export declare type IAccept = SuitTuple[number];
export {};
