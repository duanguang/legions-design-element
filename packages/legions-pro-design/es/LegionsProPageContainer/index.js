/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import styles from './style/index.modules.less';

/**  常规区块组件*/
var LegionsProPageContainer = function (props) {
    return (React.createElement("div", { className: styles['ListPageContainer'] + " " + styles.pageWrap },
        React.createElement("div", null,
            props.query && React.createElement("div", { className: styles['ListPageQuery'] }, props.query),
            props.operation && React.createElement("div", { className: "" + styles['ListPageOperation'], style: { margin: '0 13px' } }, props.operation),
            React.createElement("div", { className: "" + styles['ListPageContent'] }, props.content))));
};

export default LegionsProPageContainer;
