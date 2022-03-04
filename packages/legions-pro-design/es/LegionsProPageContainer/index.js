/**
  *  legions-pro-design v0.0.22
  * (c) 2022 duanguang
  * @license MIT
  */
import React from 'react';
import './style/index.less';

/**  常规区块组件*/
var LegionsProPageContainer = function (props) {
    return (React.createElement("div", { className: "legions-pro-pagecontainer" },
        React.createElement("div", null,
            props.query && React.createElement("div", { className: 'page-query' }, props.query),
            props.operation && React.createElement("div", { className: "page-operation" }, props.operation),
            React.createElement("div", { className: "page-content" }, props.content))));
};

export default LegionsProPageContainer;
