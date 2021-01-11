import React from 'react';
interface IProps {
    /**
     *
     * 搜索条件
     * @type {React.ReactNode}
     * @memberof IProps
     */
    query?: React.ReactNode | null;
    /**
     * 操作区域组件
     *
     * @type {(React.ReactNode|null)}
     * @memberof IProps
     */
    operation?: React.ReactNode | null;
    /**
     * 内容区域
     *
     * @type {(React.ReactNode|null)}
     * @memberof IProps
     */
    content?: React.ReactNode | null;
}
/**  常规区块组件*/
declare const LegionsProPageContainer: (props: IProps) => JSX.Element;
export default LegionsProPageContainer;
