/*
 * @Author: duanguang
 * @Date: 2020-12-26 23:22:02
 * @LastEditTime: 2020-12-26 23:22:38
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProPrint/interface.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
export interface ITriggerProps<T> {
    onClick: () => void;
    ref: (v: T) => void;
}
export interface IProPrintProps {
    /** 触发操作的节点 */
    trigger: <T>() => React.ReactElement<ITriggerProps<T>>;

    /** 需要打印的内容 */
    content: () => React.ReactInstance;

    /** 将样式复制到打印窗口中. default: true */
    copyStyles?: boolean;

    /** 打印前触发的回调函数 */
    onBeforePrint?: <P>() => void | Promise<P>;

    /** 打印后要触发的回调函数 */
    onAfterPrint?: () => void;

    /** 覆盖默认打印窗口样式 */
    pageStyle?: string;

    /** 要传递到打印窗口正文的className */
    bodyClass?: string;

    /** debug模式，可视化调整排版。default: false */
    debug?: boolean;
}