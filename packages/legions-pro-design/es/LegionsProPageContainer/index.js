/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import './style/index.less';

/**  常规区块组件*/
var LegionsProPageContainer = function (props) {
    return (React.createElement("div", { className: "legions-pro-pagecontainer legions-pro-pagecontainer-pageWrap" },
        React.createElement("div", null,
            props.query && React.createElement("div", { className: 'ListPageQuery' }, props.query),
            props.operation && React.createElement("div", { className: "ListPageOperation", style: { margin: '0 13px' } }, props.operation),
            React.createElement("div", { className: "ListPageContent" }, props.content))));
};

export default LegionsProPageContainer;
