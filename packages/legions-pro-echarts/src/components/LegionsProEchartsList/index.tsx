/*
 * @Author: duanguang
 * @Date: 2020-12-11 10:42:01
 * @LastEditTime: 2020-12-18 16:48:44
 * @LastEditors: duanguang
 * @Description: 可视化界面容器盒子列表组件
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsBoxList/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import React from 'react';
import { Col,Row } from 'antd';
import './style/index.less';
import LegionsProLineOverflow from '../LegionsProLineOverflow';
import LegionsProEchartsProgress from '../LegionsProEchartsParts/progress';
interface ColumnProps<T> {
    title?: React.ReactNode;
    key?: string;
    dataIndex: string;
    render?: 'proportion' | ((text: any,record: T,index: number) => React.ReactNode);
    colSpan?: number;
    className?: string;
    children?: ColumnProps<T>[];
    tooltip?: boolean;
    offset?: number;
}
class IProps<T> {
    style?: React.CSSProperties = {};
    className?: string = '';
    dataSource: T[] = [];
    /** 容器内联样式 */
    boxStyle?: React.CSSProperties = {};
    /** 容器标题渲染
     *
     * 当不传时，默认渲染表格列展示形式
     *
     * 传入字符串，则绑定字符串信息
     *
     * 传入React.ReactNode 则以自定义展示
     */
    boxTitle?: string | ColumnProps<T>[] | React.ReactNode = null;
    columns: ColumnProps<T>[] = [];
    /**表格行 key 的取值，可以是字符串或一个函数
     *
     * 默认值key
     */
    rowKey: string | ((record: T, index: number) => string)='key';
    noContent?:string = '无数据';
}
const proLayoutPrefix = 'legions-pro-echarts';
/** 可视化界面容器盒子列表组件 */
export default class LegionsProEchartsList<T = {}> extends React.Component<IProps<T>> {
    //@ts-ignore
    static defaultProps: Readonly<IProps> = new IProps()
    renderContent() {
        const { dataSource,rowKey,noContent } = this.props;
        const renderRowKeys = (item:T,index) => {
            if (typeof rowKey === 'function') {
                return rowKey(item,index)
            }
            else if (typeof rowKey === 'string') {
                return item[rowKey];
            }
        }
        if(dataSource.length > 0 ){
            return dataSource.map((item,index) => {
                const hasOwnProperty = item['hasOwnProperty'];
                const renderCells = () => {
                    const cells: any[] = [];
                    Object.keys(item).forEach((keys) => {
                        const renderItems = this.props.columns.find((fitem) => hasOwnProperty && (keys === fitem.dataIndex || keys === fitem.key))
                        if (renderItems) {
                            if (renderItems.render === void 0) {
                                if(renderItems.tooltip){
                                    cells.push(
                                        <LegionsProLineOverflow text={item[keys]}>
                                            <Col span={renderItems.colSpan || 3}
                                                offset={renderItems.offset || 2}
                                                className={`box-lit-title-text-overflow  ${renderItems.className || 'box-lit-title'}`}>
                                                {item[keys]}
                                            </Col>
                                        </LegionsProLineOverflow>
                                    )
                                }else{
                                    cells.push(
                                        <Col span={renderItems.colSpan || 3}
                                            offset={renderItems.offset || 2}
                                            className={`${renderItems.className || 'box-lit-title'}`}>
                                            {item[keys]}
                                        </Col>
                                    )
                                }
                            }
                            else if (typeof renderItems.render === 'function') {
                                cells.push(<Col span={renderItems.colSpan || 3}
                                    offset={renderItems.offset || 2}
                                    className={`${renderItems.className}`}>
                                    {renderItems.render(keys,item,index)}
                                </Col>)
                            }
                            else if (renderItems.render === 'proportion') {
                                cells.push(<Col span={renderItems.colSpan || 3}
                                    offset={renderItems.offset || 2}
                                    style={{marginTop:-2}}
                                    className={`${renderItems.className}`}
                                >
                                    <LegionsProEchartsProgress percent={item[keys]}></LegionsProEchartsProgress>
                                </Col>)
                            }
                        }
                    })
                    return cells;
                }
                return <div className="box-lit-top-singleRowList" key={`${renderRowKeys(item,index)}`}><div className="box-lit-item">
                    <div className="box-lit-item-Top">
                        <Col span={2} className={'box-lit-serial-number'}
                            style={{ backgroundColor: index + 1 > 3 ? '#00E6FC' : '#db8848'}}
                        >
                            {index + 1}
                        </Col>
                        {renderCells()}
                    </div>
                </div>
                </div>
            })
        }else{
            return <div className="box-lit-top-singleRowList">
                <div className="box-lit-item">
                    <div className="box-lit-item-Top">
                        <Col span={24} style={{textAlign:'center',color:'#176279'}}>{noContent}</Col>
                    </div>
                </div>
            </div>
        }
    }
    renderProBoxTitle() {
        const { boxTitle,columns } = this.props;
        const ColumnProps = boxTitle || columns;
        if (Array.isArray(ColumnProps)) {
            const arr: ColumnProps<T>[] = ColumnProps as ColumnProps<T>[]
            return <Row>
                <Col span={2} style={{width:24}}></Col>
                {arr.map((item) => {
                    return <Col key={`${item.dataIndex}-${item.title}`}
                        span={item.colSpan || 3}
                        style={{color:'#fff',fontSize:'12px'}}
                        offset={(item.offset || 2)}> {item.title}</Col>
                })}
            </Row>
        }
        else {
            return boxTitle
        }
    }
    render() {
        const { style,className,boxStyle } = this.props;
        const newBoxStyle = {
            ...{ height: '33.33%',paddingBottom: 10,paddingTop: 5 },
            ...boxStyle
        }
        return (
                <div className={`${proLayoutPrefix}-box-list`}>
                   {this.renderContent()}
                </div>
        )
    }
}