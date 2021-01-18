import React from 'react'
import './style/index.less';
interface IProps{

   /**
    *
    * 搜索条件
    * @type {React.ReactNode}
    * @memberof IProps
    */
   query?:React.ReactNode|null;

   /**
    * 操作区域组件
    *
    * @type {(React.ReactNode|null)}
    * @memberof IProps
    */
   operation?:React.ReactNode|null;


   /**
    * 内容区域
    *
    * @type {(React.ReactNode|null)}
    * @memberof IProps
    */
   content?:React.ReactNode|null;
}
/**  常规区块组件*/
const LegionsProPageContainer = (props:IProps) => {
    return(
        <div className={`legions-pro-pagecontainer legions-pro-pagecontainer-pageWrap`}>
            <div>
                {props.query&&<div className={'ListPageQuery'}>
                    {props.query}
                </div>}
                {props.operation&&<div className={`ListPageOperation`} style={{margin: '0 13px'}}>
                    {props.operation}
                </div>}
                <div className={`ListPageContent`}>
                    {props.content}
                </div>
            </div>
        </div>
    )
}
export default LegionsProPageContainer