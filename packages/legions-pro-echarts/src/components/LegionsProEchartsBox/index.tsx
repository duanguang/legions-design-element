/*
 * @Author: duanguang
 * @Date: 2020-12-11 09:29:53
 * @LastEditTime: 2020-12-18 16:27:29
 * @LastEditors: duanguang
 * @Description: 可视化界面容器盒子占位块
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsBox/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import './style/index.less';
class IProps {
    style?: React.CSSProperties = {};
    className?: string = '';
    title?: React.ReactNode = null;
}
const proLayoutPrefix = 'legions-pro-echarts';
/** 可视化界面容器盒子占位块 */
export  class LegionsProEchartsBox extends React.Component<IProps> {
    static defaultProps: Readonly<IProps> = new IProps()

    render() {
        const {style, className, title} = this.props;
        const mStyle: React.CSSProperties = {
            height: '100%',
            ...style,
        }
        return (
            <div style={mStyle} className={className}>
                <div style={{height: '100%', paddingTop: title ? '36px' : void 0}} className={`${proLayoutPrefix}-box`}>
                    { title && <div className={'pro-box-title'}>{title}</div> }
                    <div className={'boxTopLeft'}></div>
                    <div className={'boxTopRight'}></div>
                    <div className={'boxBotLeft'}></div>
                    <div className={'boxBotRight'}></div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
