/**
 *  使用 typescript 有时候需要重写一个库提供的 interface 的某个属性，但是重写 interface 有可能会导致冲突：
 *  原理是，将 类型 T 的所有 K 属性置为 any，
 然后自定义 K 属性的类型，
 由于任何类型都可以赋予 any，所以不会产生冲突
*/
export declare type Weaken<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? any : T[P];
};
export interface ClassOf<T> {
    new (...args: any[]): T;
}
/**
 * 移除 T 中的 U 属性

type A = Exclude<'a'|'b'|'c'|'d' ,'b'|'c'|'e' >  // 'a' | 'd'
*/
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
export declare type loggerType = 'proTable-constructor' | 'proTable-watchData' | 'proTable-componentWillMount' | 'proTable-componentWillUnmount' | 'proTable-componentDidMount' | 'proTable-componentDidUpdate' | 'proTable-componentWillReceiveProps' | 'proTable-render' | 'proForm-constructor' | 'proForm-watchData' | 'proForm-componentWillMount' | 'proForm-componentWillUnmount' | 'proForm-componentDidMount' | 'proForm-componentDidUpdate' | 'proForm-componentWillReceiveProps' | 'proForm-render' | 'proForm-validateFields' | 'uiStore';
export interface ILegionsPluginDataOrigin {
    /** 表格组件关键点函数埋点函数，如果需要调试各个节点输出信息，就请注入。 系统级别私有方法 */
    onHLTableCycle?: (value: Object, type: loggerType) => void;
    /** 表单组件关键点函数埋点函数，如果需要调试各个节点输出信息，就请注入。 系统级别私有方法 */
    onHLFormCycle?: (value: Object, type: loggerType) => void;
    /** 系统级别私有方法, 其他成员调用前先咨询 */
    openBrowserUpdateMessage?: () => void;
    /** 操作记录上报函数， 系统级别私有方法, 其他成员调用前先咨询 */
    loggerReport?: (value: Object, type: loggerType) => void;
    /** 获取用户信息, 请勿直接修改 */
    readonly sysUserInfos?: any;
}
