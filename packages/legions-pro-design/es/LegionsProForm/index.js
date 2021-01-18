/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import { Tooltip, Input, Row, Form, Icon, message, DatePicker, Select, InputNumber, Switch, Radio, Checkbox, Anchor, Col, Dropdown, Menu, Affix } from 'antd';
import LegionsProSelect, { AbstractSelect } from '../LegionsProSelect';
import { getStringLen } from 'legions-utils-tool/format.string';
import { debounce } from 'legions-utils-tool/debounce';
import { shortHash } from 'legions-lunar/object-hash';
import { ProFormStore } from '../store/pro.form';
import { bind, observer } from 'legions/store-react';
import { findDOMNode } from 'react-dom';
import LegionsProErrorReportShow from '../LegionsProErrorReportShow';
import Styles from './style/index.modules.less';
import classNames from 'classnames';
import LegionsProUpload from '../LegionsProUpload';
import { off, on } from 'legions-utils-tool/dom';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import './style/index.less';
import { toJS, runInAction } from 'mobx';
import LegionsProDragger from '../LegionsProDragger';
import get from 'lodash/get';
import { HlLabeledValue } from 'legions-lunar/model';
import { LoggerManager } from 'legions-lunar/legion.plugin.sdk';
import { getInjector } from 'legions/store';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var AbstractForm = /** @class */ (function (_super) {
    __extends(AbstractForm, _super);
    function AbstractForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractForm.prototype.isFormHasError = function (getFieldsError) {
        var error = getFieldsError && getFieldsError();
        var has = false;
        for (var key in error) {
            if (error[key]) {
                has = true;
                break;
            }
        }
        return has;
    };
    return AbstractForm;
}(Component));
var AbstractSelectForm = /** @class */ (function (_super) {
    __extends(AbstractSelectForm, _super);
    function AbstractSelectForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractSelectForm.prototype.isFormHasError = function (getFieldsError) {
        var error = getFieldsError && getFieldsError();
        var has = false;
        for (var key in error) {
            if (error[key]) {
                has = true;
                break;
            }
        }
        return has;
    };
    return AbstractSelectForm;
}(AbstractSelect));

function formatNumber(value) {
    value += '';
    var list = value.split('.');
    var prefix = list[0].charAt(0) === '-' ? '-' : '';
    var num = prefix ? list[0].slice(1) : list[0];
    var result = '';
    while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return "" + prefix + result + (list[1] ? "." + list[1] : '');
}
var LegionsProNumericInput = /** @class */ (function (_super) {
    __extends(LegionsProNumericInput, _super);
    function LegionsProNumericInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (e) {
            var value = e.target.value;
            _this.handleChange(e, value);
        };
        _this.onBlur = function (e) {
            var _a = _this.props, value = _a.value, onBlur = _a.onBlur;
            if (value && value.toString().charAt(value.length - 1) === '.' || value === '-') {
                _this.handleChange(e, value.slice(0, -1));
            }
            onBlur && onBlur(e);
        };
        return _this;
    }
    LegionsProNumericInput.prototype.handleChange = function (even, value) {
        var reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            // @ts-ignore
            this.props.onChange(even, value);
        }
    };
    LegionsProNumericInput.prototype.render = function () {
        var value = this.props.value;
        var title = value ? (React.createElement("span", { className: "numeric-input-title" }, value !== '-' ? formatNumber(value) : '-')) : '请输入数字';
        return (React.createElement(Tooltip, { trigger: 'focus', title: title, placement: "topLeft", overlayClassName: "numeric-input" },
            React.createElement(Input, __assign({ maxLength: "25" }, this.props, { onChange: this.onChange, onBlur: this.onBlur, placeholder: "" + (this.props.placeholder || '请输入数字') }))));
    };
    return LegionsProNumericInput;
}(Component));

var KeydownEnum;
(function (KeydownEnum) {
    /**
     * 键盘向上键
     */
    KeydownEnum[KeydownEnum["up"] = 38] = "up";
    /**
     * 键盘向下键
     */
    KeydownEnum[KeydownEnum["next"] = 40] = "next";
    /**
     * 回车键
     */
    KeydownEnum[KeydownEnum["enter"] = 13] = "enter";
})(KeydownEnum || (KeydownEnum = {}));
/**
 * 如果元素需要回车，或者上下键切换焦点，则一定要用此组件包裹
 *
 * @export
 * @class FormElement
 * @extends {AbstractForm<IFormElementProps>}
 */
var FormElement = /** @class */ (function (_super) {
    __extends(FormElement, _super);
    function FormElement(props) {
        var _this = _super.call(this, props) || this;
        _this.timeId = new Date().getTime();
        _this.uid = '';
        /**  注册元素键盘行为代理事件*/
        _this.onLoadingKeyDown = null;
        /**  处理重复注册代理事件行为，已经注册过的代理事件,不重复注册*/
        _this.onkeyDownProxy = function () {
            var isLoaded = false;
            return function () {
                if (!isLoaded && _this.formStore && _this.formStore.enableEnterSwitch) {
                    var selectSelectionDom = _this.querySelectDom();
                    if (selectSelectionDom) {
                        selectSelectionDom.addEventListener('keydown', _this.onKeyDownSelect.bind(_this));
                    }
                    var selectSelectionMultipleDom = _this.querySelectDom('ant-select-selection--multiple');
                    if (selectSelectionMultipleDom) {
                        selectSelectionMultipleDom.addEventListener('keydown', _this.onkeyDownSelelctMultiple.bind(_this));
                    }
                    isLoaded = true;
                }
            };
        };
        _this.uid = "element" + _this.props.elementKey + shortHash(_this.timeId);
        return _this;
    }
    FormElement.prototype.componentWillMount = function () {
        this.props.onReady && this.props.onReady({ store: this.props.store, uid: this.uid });
    };
    Object.defineProperty(FormElement.prototype, "formStore", {
        get: function () {
            return this.props.store.get(this.props.formUid);
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     *  查询下拉单选dom
     * @returns
     * @memberof FormElement
     */
    FormElement.prototype.querySelectDom = function (type) {
        if (type === void 0) { type = 'ant-select-selection--single'; }
        var selectDom = document.querySelector("." + this.uid);
        if (selectDom) {
            var selectSelectionDom = selectDom.getElementsByClassName(type);
            if (selectSelectionDom && selectSelectionDom.length) {
                return selectSelectionDom[0];
            }
            return null;
        }
        return null;
    };
    FormElement.prototype.componentDidMount = function () {
        this.addElement();
        /**  只对下拉框键盘事件进行代理*/
        if (this.querySelectDom('ant-select-selection--multiple') || this.querySelectDom()) {
            if (!this.onLoadingKeyDown) {
                this.onLoadingKeyDown = this.onkeyDownProxy();
            }
            this.onLoadingKeyDown();
        }
    };
    FormElement.prototype.componentDidUpdate = function () {
        this.addElement();
        /**  只对下拉框键盘事件进行代理*/
        if (this.querySelectDom('ant-select-selection--multiple') || this.querySelectDom()) {
            this.onLoadingKeyDown();
        }
    };
    FormElement.prototype.componentWillUnmount = function () {
        var formStore = this.props.store.get(this.props.formUid);
        if (formStore) {
            formStore.elementList.delete(this.uid);
        }
        var selectSelectionDom = this.querySelectDom();
        if (selectSelectionDom) {
            selectSelectionDom.removeEventListener('keydown', this.onKeyDownSelect.bind(this));
        }
        var selectSelectionMultipleDom = this.querySelectDom('ant-select-selection--multiple');
        if (selectSelectionMultipleDom) {
            selectSelectionMultipleDom.removeEventListener('keydown', this.onkeyDownSelelctMultiple.bind(this));
        }
    };
    FormElement.prototype.onkeyDownSelelctMultiple = function (even) {
        var _this = this;
        var keyCode = even.keyCode;
        if (keyCode === 40) { // 下键
            var selectDom = document.querySelector("." + this.uid);
            if (selectDom) {
                var selectSelectionDom = selectDom.getElementsByClassName('ant-select-open');
                var controlsOptiosn = [];
                if (this.formStore) {
                    var controls = this.formStore.controls.find(function (item) { return item.iAntdProps.name === _this.props.elementKey; });
                    if (controls && controls.iFormWithSelect) {
                        controlsOptiosn = controls.iFormWithSelect.options || [];
                    }
                }
                if (selectSelectionDom && selectSelectionDom.length <= 0) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为
                    even.stopPropagation();
                    even.preventDefault(); // 当下拉选项没有展开时，回车直接跳转下一个组件
                    this.props.store.nextElement(this.uid, this.props.formUid);
                }
                else {
                    even.preventDefault();
                }
            }
        }
    };
    /**
     *  下拉单选 键盘事件拦截
     *
     * @param {*} even
     * @memberof FormElement
     */
    FormElement.prototype.onKeyDownSelect = function (even) {
        var _this = this;
        var keyCode = even.keyCode;
        if (keyCode === 13) { // 回车键
            var selectDom = document.querySelector("." + this.uid);
            if (selectDom) {
                var selectSelectionDom = selectDom.getElementsByClassName('ant-select-open');
                var controlsOptiosn = [];
                if (this.formStore) {
                    var controls = this.formStore.controls.find(function (item) { return item.iAntdProps.name === _this.props.elementKey; });
                    if (controls && controls.iFormWithSelect) {
                        controlsOptiosn = controls.iFormWithSelect.options || [];
                    }
                }
                if (selectSelectionDom && selectSelectionDom.length) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为，回车选中数据
                    even.preventDefault();
                    setTimeout(function () {
                        _this.props.store.nextElement(_this.uid, _this.props.formUid);
                    }, 100);
                }
                else {
                    even.stopPropagation();
                    even.preventDefault(); // 当下拉选项没有展开时，回车直接跳转下一个组件
                    this.props.store.nextElement(this.uid, this.props.formUid);
                }
            }
        }
        if (keyCode === 40) { // 下键
            var selectDom = document.querySelector("." + this.uid);
            if (selectDom) {
                var selectSelectionDom = selectDom.getElementsByClassName('ant-select-open');
                if (selectSelectionDom && selectSelectionDom.length <= 0) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为
                    even.stopPropagation();
                    even.preventDefault(); // 当下拉选项没有展开时，回车直接跳转下一个组件
                    this.props.store.nextElement(this.uid, this.props.formUid);
                }
                else {
                    even.preventDefault();
                }
            }
        }
    };
    FormElement.prototype.addElement = function () {
        var formStore = this.props.store.get(this.props.formUid);
        if (formStore) {
            formStore.addAllElementKeys(this.props.elementKey);
            if (!formStore.elementList.has(this.uid)) {
                var el = document.querySelector("." + this.uid);
                if (el && this.props.elType) {
                    var elChildren = el.getElementsByTagName(this.props.elType);
                    var elementTabindex = null;
                    var antSSelectSelection = el.getElementsByClassName('ant-select-selection--single');
                    if (antSSelectSelection && antSSelectSelection instanceof HTMLCollection && antSSelectSelection.length) {
                        if (findDOMNode(antSSelectSelection[0]).getAttribute('tabindex') !== null) { // 如果下拉列表自身设置了获取焦点方法，则抓取元素用于获取焦点
                            // @ts-ignore
                            elementTabindex = antSSelectSelection;
                        }
                    }
                    // @ts-ignore
                    if (elChildren && el && elChildren instanceof HTMLCollection && elChildren.length && !elChildren[0].disabled) {
                        formStore.elementList.set(this.uid, {
                            elementKey: this.props.elementKey,
                            elementTabindex: elementTabindex,
                            element: elChildren,
                            nextElementKey: this.props.nextElementKey
                        });
                    }
                }
            }
        }
    };
    FormElement.prototype.render = function () {
        var _a = this.props, form = _a.form, elementKey = _a.elementKey, children = _a.children;
        /* const { getFieldDecorator,getFieldsError } = form; */
        return (React.createElement(Row, { className: this.uid }, children));
    };
    FormElement.defaultProps = {
        elType: 'input',
        nextElementKey: '',
    };
    FormElement = __decorate([
        bind({ store: ProFormStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], FormElement);
    return FormElement;
}(AbstractForm));

var FormItem = Form.Item;
var TextArea = Input.TextArea;
var LabelWithInputModel = /** @class */ (function () {
    function LabelWithInputModel(iAntdProps, iFormInput, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormInput = iFormInput;
        this.rules = rules;
    }
    return LabelWithInputModel;
}());
var TooltipInput = /** @class */ (function (_super) {
    __extends(TooltipInput, _super);
    function TooltipInput(props) {
        var _this = _super.call(this, props) || this;
        /* onChanges = (() => {
            let updb = this.props.onChange;
            if (200 >= 0) {
                updb = debounces((even,value) => {
                    const event =
                    even.target = {value}
                console.log(even,value,even.target)
                this.props.onChange&&this.props.onChange(value);
              }, 200);
            }
            return updb;
        })(); */
        _this.onChanges = debounce(function (even, value) {
            // @ts-ignore
            _this.props.onChange && _this.props.onChange(value);
        }, 200);
        _this.state = {
            value: _this.props.form.getFieldValue(_this.props.formItemName),
        };
        return _this;
    }
    TooltipInput.prototype.handleOnChange = function (even) {
        var value = even.target.value;
        this.setState({ value: value });
        //@ts-ignore
        this.onChanges(even, value);
    };
    TooltipInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.value !== nextProps.value && typeof nextProps.value !== 'object') {
            this.setState({ value: nextProps.value });
        }
    };
    TooltipInput.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, form = _b.form, name = _b.name, valueLen = _b.valueLen, FormInputRef = _b.FormInputRef, inputType = _b.inputType, type = _b.type, props = __rest(_b, ["form", "name", "valueLen", "FormInputRef", "inputType", "type"]);
        var isShowErrorView = false;
        if (FormInputRef && this.props.formUid) {
            var viewStore = FormInputRef.store.get(this.props.formUid);
            if (viewStore.computedErrorReactNodeList.has(this.props.formItemName)) {
                var uid = viewStore.computedErrorReactNodeList.get(this.props.formItemName).uid;
                isShowErrorView = viewStore.errorListView.has(uid);
            }
        }
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError, setFieldsValue = form.setFieldsValue;
        var iconStyle = {};
        isShowErrorView && (iconStyle = { marginRight: '18px' });
        var theProps = __assign(__assign({}, props), this.state);
        theProps.onChange = this.handleOnChange.bind(this);
        var maxlen = parseInt(this.props.maxLength);
        return (React.createElement(LegionsProErrorReportShow, { code: this.props.formItemName, formUid: this.props.formUid, onIgnoreError: this.props.onIgnoreError, errorClassName: classNames((_a = {},
                _a["" + Styles.tipIconInput] = true,
                _a["" + Styles['tipIcon-right-0']] = (this.state.value && !this.props.disabled) ? true : false,
                _a)) }, this.props.inputType === 'number' ? React.createElement(LegionsProNumericInput, __assign({}, theProps)) : React.createElement(Tooltip
        /* trigger={'click'} */
        , { 
            /* trigger={'click'} */
            mouseEnterDelay: 1, title: valueLen >= maxlen - 10 ? this.state.value : '', placement: "topLeft", overlayStyle: { wordWrap: 'break-word' } },
            React.createElement(Input, __assign({}, theProps, { type: type, suffix: (React.createElement("div", null, (this.state.value && !this.props.disabled) && React.createElement(Icon, { style: iconStyle, type: "close-circle", onClick: function () {
                        _this.setState({
                            value: '',
                        });
                        var fileName = {};
                        fileName[_this.props.formItemName] = '';
                        setFieldsValue(fileName);
                        form.validateFields([_this.props.formItemName], { force: true }, function () { return void 0; });
                    } }))) })))));
    };
    return TooltipInput;
}(React.Component));
var FormInput = /** @class */ (function (_super) {
    __extends(FormInput, _super);
    function FormInput(props) {
        var _this = _super.call(this, props) || this;
        _this.FormInputRef = null;
        return _this;
    }
    Object.defineProperty(FormInput.prototype, "store", {
        get: function () {
            if (this.props.formStore) {
                return this.props.formStore.store.get(this.props.formStore.uid);
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    FormInput.prototype.onChange = function (even) {
        var value = typeof even === 'object' ? even.target.value : even;
        this.props.iFormInput.onChange && this.props.iFormInput.onChange(value);
        if (this.FormInputRef && this.props.formUid) {
            var viewStore = this.FormInputRef.store.get(this.props.formUid);
            var view = viewStore.computedErrorReactNodeList.get(this.props.iAntdProps.name);
            if (view) {
                view.validateStatus = '';
            }
        }
    };
    FormInput.prototype.onPressEnter = function (even) {
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormInput = _a.iFormInput, children = _a.children, rules = _a.rules;
        iFormInput && iFormInput.onPressEnter && iFormInput.onPressEnter(even);
    };
    FormInput.prototype.onFocus = function (e) {
        var store = this.FormInputRef.store.get(this.props.formUid);
        if (store) {
            store.focusUid = this.FormInputRef.uid;
        }
        /* const el = document.querySelector(`.${this.FormInputRef.uid}`); */
        var even = e.target;
        even.select();
        this.props.iFormInput && this.props.iFormInput.onFocus && this.props.iFormInput.onFocus(e);
    };
    FormInput.prototype.onBlur = function (even) {
        if (this.props.form && this.store && this.store.styleSize === 'table') {
            var error = this.props.form.getFieldError(this.props.iAntdProps.name);
            error && message.error(error, 5);
        }
        this.props.iFormInput.onBlur && this.props.iFormInput.onBlur(even);
    };
    FormInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormInput = _a.iFormInput, children = _a.children, rules = _a.rules;
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError, setFieldsValue = form.setFieldsValue;
        var disabled = iFormInput && iFormInput.disabled;
        var addonAfter = iFormInput && iFormInput.addonAfter;
        var addonBefore = iFormInput && iFormInput.addonBefore;
        var label = iFormInput.label, labelCol = iFormInput.labelCol, wrapperCol = iFormInput.wrapperCol, render = iFormInput.render, props = __rest(iFormInput, ["label", "labelCol", "wrapperCol", "render"]);
        var valueLen = getStringLen(form.getFieldValue(iAntdProps.name));
        var maxLength = iFormInput.maxLength ? parseInt(iFormInput.maxLength) : 50;
        var placeholder = iAntdProps.placeholder || '';
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormInputRef = value;
            }, elType: iFormInput.type === 'textarea' ? 'textarea' : 'input', elementKey: iAntdProps.name, nextElementKey: iAntdProps.nextElementKey, formUid: this.props.formUid },
            React.createElement(FormItem, __assign({}, formItemProps, { extra: iFormInput.extra, className: iAntdProps.className, label: iFormInput.label, labelCol: iFormInput.labelCol, wrapperCol: iFormInput.wrapperCol }),
                getFieldDecorator(iAntdProps.name, {
                    rules: rules,
                    normalize: function (value, prevValue, allValues) {
                        return value && value.toString();
                    },
                })(iFormInput.type === 'textarea' ?
                    // @ts-ignore
                    React.createElement(TextArea, __assign({}, props, { autosize: iFormInput.autosize === void 0 ? { minRows: 1, maxRows: 2 } : iFormInput.autosize, onPressEnter: this.onPressEnter.bind(this), title: form.getFieldValue(iAntdProps.name), onFocus: this.onFocus.bind(this), maxLength: iFormInput.maxLength ? parseInt(iFormInput.maxLength) : 200, placeholder: iFormInput.disabled ? '' : placeholder })) :
                    React.createElement(TooltipInput, __assign({ type: iAntdProps.type }, props, { onIgnoreError: this.props.formStore && this.props.formStore.onIgnoreError, formUid: this.props.formUid, FormInputRef: this.FormInputRef, value: form.getFieldValue(iAntdProps.name), maxLength: maxLength.toString(), valueLen: valueLen, formItemName: iAntdProps.name, form: form, inputType: iFormInput.type, onPressEnter: this.onPressEnter.bind(this), disabled: disabled, placeholder: iFormInput.disabled ? '' : placeholder, onFocus: this.onFocus.bind(this), onChange: this.onChange.bind(this), addonAfter: addonAfter, onBlur: this.onBlur.bind(this), addonBefore: addonBefore }))),
                children)));
    };
    return FormInput;
}(AbstractForm));

/**
 * 使用Render模型自定义组件时，需要要主动用FormItem 包裹住自定义的组件
 *
 * @export
 * @class LabelWithRenderModel
 */
var LabelWithRenderModel = /** @class */ (function () {
    /**
     * 使用Render模型自定义组件时，需要要主动用FormItem 包裹住自定义的组件
     *  示例：<HLFormItem {...IAntdProps} {...IFormRenderProps} form={form} rules={IAntdRule}  itemName={IAntdProps.name}  >
                   <自定义组件 values={value.value}></自定义组件>
               </HLFormItem>
     * @param {IAntdProps} iAntdProps
     * @param {IFormRenderProps} [iFormRender]
     * @param {IAntdRule[]} [rules]
     * @memberof LabelWithRenderModel
     */
    function LabelWithRenderModel(iAntdProps, iFormRender, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormRender = iFormRender;
        this.rules = rules;
    }
    return LabelWithRenderModel;
}());
var FormRender = /** @class */ (function (_super) {
    __extends(FormRender, _super);
    function FormRender(props) {
        return _super.call(this, props) || this;
    }
    FormRender.prototype.render = function () {
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormRender = _a.iFormRender, children = _a.children, rules = _a.rules;
        var getFieldDecorator = form.getFieldDecorator;
        return iFormRender.render(form, iAntdProps, rules, this.props.formRef);
    };
    return FormRender;
}(React.Component));

var FormItem$1 = Form.Item;
var LabelWithDatePickerModel = /** @class */ (function () {
    function LabelWithDatePickerModel(iAntdProps, iFormDatePicker, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormDatePicker = iFormDatePicker;
        this.rules = rules;
    }
    return LabelWithDatePickerModel;
}());
var FormDatePicker = /** @class */ (function (_super) {
    __extends(FormDatePicker, _super);
    function FormDatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.FormDatePickerRef = null;
        return _this;
    }
    FormDatePicker.prototype.onOpenChange = function (status) {
        var store = this.FormDatePickerRef.store.get(this.props.formUid);
        if (store) {
            store.focusUid = this.FormDatePickerRef.uid;
            if (!status && store.enableEnterSwitch) {
                this.FormDatePickerRef.store.nextElement(this.FormDatePickerRef.uid, this.props.formUid);
            }
        }
        this.props.iFormDatePicker && this.props.iFormDatePicker.onOpenChange && this.props.iFormDatePicker.onOpenChange(status);
    };
    FormDatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormDatePicker = _a.iFormDatePicker, children = _a.children, rules = _a.rules, formUid = _a.formUid;
        var getFieldError = form.getFieldError, isFieldValidating = form.isFieldValidating, getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError;
        var label = iFormDatePicker.label, labelCol = iFormDatePicker.labelCol, wrapperCol = iFormDatePicker.wrapperCol, props = __rest(iFormDatePicker, ["label", "labelCol", "wrapperCol"]);
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, elementKey: iAntdProps.name, nextElementKey: iAntdProps.nextElementKey, elType: 'input', onReady: function (value) {
                _this.FormDatePickerRef = value;
            }, formUid: formUid },
            React.createElement(FormItem$1, __assign({}, formItemProps, { extra: iFormDatePicker.extra, className: iAntdProps.className, label: iFormDatePicker.label, labelCol: iFormDatePicker.labelCol, wrapperCol: iFormDatePicker.wrapperCol }), getFieldDecorator(iAntdProps.name, {
                rules: rules,
            })(React.createElement(DatePicker, __assign({ style: { width: '100%' } }, props, { onOpenChange: this.onOpenChange.bind(this), placeholder: iAntdProps.placeholder, format: iFormDatePicker.format }))))));
    };
    return FormDatePicker;
}(AbstractForm));

var FormItem$2 = Form.Item;
var MonthPicker = DatePicker.MonthPicker;
var LabelWithMonthPickerModel = /** @class */ (function () {
    function LabelWithMonthPickerModel(iAntdProps, iFormMonthPicker, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormMonthPicker = iFormMonthPicker;
        this.rules = rules;
    }
    return LabelWithMonthPickerModel;
}());
var FormMonthPicker = /** @class */ (function (_super) {
    __extends(FormMonthPicker, _super);
    function FormMonthPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.FormMonthPickerRef = null;
        return _this;
    }
    FormMonthPicker.prototype.onOpenChange = function (status) {
        var store = this.FormMonthPickerRef.store.get(this.props.formUid);
        if (store) {
            store.focusUid = this.FormMonthPickerRef.uid;
        }
        this.props.iFormMonthPicker && this.props.iFormMonthPicker.onOpenChange && this.props.iFormMonthPicker.onOpenChange(status);
    };
    FormMonthPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormMonthPicker = _a.iFormMonthPicker, children = _a.children, rules = _a.rules;
        var getFieldError = form.getFieldError, isFieldValidating = form.isFieldValidating, getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError;
        var label = iFormMonthPicker.label, labelCol = iFormMonthPicker.labelCol, wrapperCol = iFormMonthPicker.wrapperCol, props = __rest(iFormMonthPicker, ["label", "labelCol", "wrapperCol"]);
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormMonthPickerRef = value;
            }, nextElementKey: iAntdProps.nextElementKey, elementKey: iAntdProps.name, elType: 'input', formUid: this.props.formUid },
            React.createElement(FormItem$2, __assign({}, formItemProps, { extra: iFormMonthPicker.extra, className: iAntdProps.className, label: iFormMonthPicker.label, labelCol: iFormMonthPicker.labelCol, wrapperCol: iFormMonthPicker.wrapperCol }), getFieldDecorator(iAntdProps.name, {
                rules: rules,
            })(React.createElement(MonthPicker, __assign({}, props, { onOpenChange: this.onOpenChange.bind(this), placeholder: iAntdProps.placeholder, format: iFormMonthPicker.format }))))));
    };
    return FormMonthPicker;
}(AbstractForm));

var FormItem$3 = Form.Item;
var RangePicker = DatePicker.RangePicker;
var LabelWithRangePickerModel = /** @class */ (function () {
    function LabelWithRangePickerModel(iAntdProps, iFormRangePicker, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormRangePicker = iFormRangePicker;
        this.rules = rules;
    }
    return LabelWithRangePickerModel;
}());
var FormRangePicker = /** @class */ (function (_super) {
    __extends(FormRangePicker, _super);
    function FormRangePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.FormRangePickerRef = null;
        return _this;
    }
    FormRangePicker.prototype.onOpenChange = function (status) {
        var store = this.FormRangePickerRef.store.get(this.props.formUid);
        if (store) {
            store.focusUid = this.FormRangePickerRef.uid;
        }
        this.props.iFormRangePicker && this.props.iFormRangePicker.onOpenChange && this.props.iFormRangePicker.onOpenChange(status);
    };
    FormRangePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormRangePicker = _a.iFormRangePicker, children = _a.children, rules = _a.rules;
        var getFieldsError = form.getFieldsError, isFieldValidating = form.isFieldValidating, getFieldDecorator = form.getFieldDecorator;
        var label = iFormRangePicker.label, labelCol = iFormRangePicker.labelCol, wrapperCol = iFormRangePicker.wrapperCol, props = __rest(iFormRangePicker, ["label", "labelCol", "wrapperCol"]);
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormRangePickerRef = value;
            }, elementKey: iAntdProps.name, nextElementKey: iAntdProps.nextElementKey, formUid: this.props.formUid },
            React.createElement(FormItem$3, __assign({}, formItemProps, { extra: iFormRangePicker.extra, className: iAntdProps.className, label: iFormRangePicker.label, labelCol: iFormRangePicker.labelCol, wrapperCol: iFormRangePicker.wrapperCol }), getFieldDecorator(iAntdProps.name, {
                rules: rules,
            })(React.createElement(RangePicker, __assign({}, props, { onOpenChange: this.onOpenChange.bind(this), format: iFormRangePicker.format }))))));
    };
    return FormRangePicker;
}(AbstractForm));

var FormItem$4 = Form.Item;
var LabelWithUploadModel = /** @class */ (function () {
    function LabelWithUploadModel(iAntdProps, iFormWithUpload, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormWithUpload = iFormWithUpload;
        this.rules = rules;
    }
    return LabelWithUploadModel;
}());
var FormUpload = /** @class */ (function (_super) {
    __extends(FormUpload, _super);
    function FormUpload(props) {
        var _this = _super.call(this, props) || this;
        _this.FormUploadRef = null;
        _this.handlePreview = function (file) {
        };
        _this.state = {
            previewImage: '',
            fileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }]
        };
        return _this;
    }
    FormUpload.prototype.draggerThem = function () {
    };
    FormUpload.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormWithUpload = _a.iFormWithUpload, children = _a.children, rules = _a.rules;
        var getFieldsError = form.getFieldsError, getFieldDecorator = form.getFieldDecorator;
        var label = iFormWithUpload.label, labelCol = iFormWithUpload.labelCol, wrapperCol = iFormWithUpload.wrapperCol, props = __rest(iFormWithUpload, ["label", "labelCol", "wrapperCol"]);
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormUploadRef = value;
            }, elType: "", nextElementKey: iAntdProps.nextElementKey, elementKey: iAntdProps.name, formUid: this.props.formUid },
            React.createElement(FormItem$4, __assign({}, formItemProps, { className: iAntdProps.className, label: label, labelCol: labelCol, wrapperCol: wrapperCol }),
                getFieldDecorator(iAntdProps.name, {
                    rules: rules,
                })(React.createElement(LegionsProUpload, __assign({}, props))),
                children)));
    };
    return FormUpload;
}(AbstractForm));

var FormItem$5 = Form.Item;
var Option = Select.Option;
var OptGroup = Select.OptGroup;
var HLSelectWrapError = /** @class */ (function (_super) {
    __extends(HLSelectWrapError, _super);
    function HLSelectWrapError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HLSelectWrapError.prototype.render = function () {
        var _a = this.props, formItemName = _a.formItemName, formHLSelectRef = _a.formHLSelectRef, formUid = _a.formUid, props = __rest(_a, ["formItemName", "formHLSelectRef", "formUid"]);
        var isShowErrorView = false;
        if (formHLSelectRef && this.props.formUid) {
            var viewStore = formHLSelectRef.store.get(this.props.formUid);
            if (viewStore.computedErrorReactNodeList.has(this.props.formItemName)) {
                var uid = viewStore.computedErrorReactNodeList.get(this.props.formItemName).uid;
                isShowErrorView = viewStore.errorListView.has(uid);
            }
        }
        return (React.createElement(LegionsProErrorReportShow, { formUid: this.props.formUid, code: this.props.formItemName, errorClassName: Styles.tipIcon, onIgnoreError: this.props.onIgnoreError, className: isShowErrorView ? 'errorView' : '' },
            React.createElement(LegionsProSelect, __assign({ style: { width: '100%' }, placeholder: this.props.placeholder }, props))));
    };
    return HLSelectWrapError;
}(React.Component));
var FormHLSelect = /** @class */ (function (_super) {
    __extends(FormHLSelect, _super);
    function FormHLSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.FormHLSelectRef = null;
        _this.onClear = function () {
            /** 启用了远程搜索才会在清除输入触发时调用搜索接口 */
            if (_this.props.formStore && _this.props.formStore.localViewModel && _this.props.iFormWithSelect.remote) {
                var view = _this.props.formStore.localViewModel.selectView.get(_this.props.iAntdProps.name);
                if (view && view.autoQuery) {
                    _this.props.formStore.localViewModel.dispatchRequest(_this.props.iAntdProps.name, view.autoQuery, {
                        pageIndex: 1,
                        pageSize: view.pageSize,
                        keyWords: '',
                    });
                }
            }
            _this.props.iFormWithSelect && _this.props.iFormWithSelect.onClear && _this.props.iFormWithSelect.onClear();
        };
        _this.onPagingQuery = function (pageIndex, pageSize, value) {
            if (_this.props.formStore && _this.props.formStore.localViewModel) {
                var view = _this.props.formStore.localViewModel.selectView.get(_this.props.iAntdProps.name);
                if (view && view.autoQuery) {
                    _this.props.formStore.localViewModel.dispatchRequest(_this.props.iAntdProps.name, view.autoQuery, {
                        pageIndex: pageIndex,
                        pageSize: view.pageSize,
                        keyWords: value,
                    });
                }
            }
            _this.props.iFormWithSelect.onPagingQuery && _this.props.iFormWithSelect.onPagingQuery(pageIndex, pageSize, value);
        };
        _this.state = {
            open: _this.props.iFormWithSelect.open || false,
        };
        return _this;
    }
    /**
     *
     * 开启labelInValue 时检测当value 为空字符串或者null 时自动进行转换，防止select解析对象报错
     * @returns
     * @memberof FormHLSelect
     */
    FormHLSelect.prototype.checkSelectValue = function () {
        if (this.props.iFormWithSelect.labelInValue) {
            var value = this.props.form.getFieldValue(this.props.iAntdProps.name);
            if (value) {
                return;
            }
            if (typeof value === 'object' && value) {
                return;
            }
            var fileName = {};
            if (this.props.iFormWithSelect.mode === 'multiple') {
                fileName[this.props.iAntdProps.name] = [];
            }
            else {
                fileName[this.props.iAntdProps.name] = { value: {} };
            }
            this.props.form.setFields(fileName);
            console.error(this.props.iAntdProps.name + ": \u4E0B\u62C9\u6846\u542F\u7528labelInValue\uFF0Cform value should object,\u5BF9\u4E8E\u7A7A\u503C\uFF0C\u7A7A\u5B57\u7B26\u4E32\u5E94\u8BE5\u8F6C\u6362\u4E3A\u5BF9\u8C61\u7ED3\u6784");
        }
    };
    FormHLSelect.prototype.translabelInValue = function (value, options) {
        if (options === void 0) { options = this.props.iFormWithSelect.options; }
        // @ts-ignore
        return this.transformlabelInValue(value, this.props.iFormWithSelect, options);
    };
    FormHLSelect.prototype.componentDidMount = function () {
        this.bindCopyKeydown();
    };
    FormHLSelect.prototype.componentWillUnmount = function () {
        var el = document.querySelector("." + this.FormHLSelectRef.uid);
        if (el) {
            var selectDom = el.querySelector(".ant-select-selection--single");
            if (selectDom) {
                off(selectDom, 'keydown', this.handleCopyKeydown.bind(this));
            }
        }
    };
    FormHLSelect.prototype.bindCopyKeydown = function () {
        var el = document.querySelector("." + this.FormHLSelectRef.uid);
        if (el) {
            var selectDom = el.querySelector(".ant-select-selection--single");
            if (selectDom) {
                on(selectDom, 'keydown', this.handleCopyKeydown.bind(this));
            }
        }
    };
    FormHLSelect.prototype.handleCopyKeydown = function (event) {
        var _this = this;
        if (event.keyCode == 67 && this.state.styleClassFocus) {
            var value = this.props.form.getFieldValue(this.props.iAntdProps.name);
            var values = this.translabelInValue(value, this.props.iFormWithSelect.options);
            if (!Array.isArray(values) && values && values['label']) {
                if (!legionsThirdpartyPlugin.plugins.clipboard) {
                    message.warning('Plugin is not ready to clipboard');
                }
                else {
                    legionsThirdpartyPlugin.plugins.clipboard.copyText(values['label']).then(function (res) {
                        var el = document.querySelector("." + _this.FormHLSelectRef.uid);
                        if (el) {
                            var selectDom = el.querySelector(".ant-select-selection--single");
                            if (selectDom) {
                                // @ts-ignore
                                selectDom.focus && selectDom.focus();
                            }
                        }
                    });
                }
            }
        }
    };
    FormHLSelect.prototype.onFocus = function () {
        var store = this.FormHLSelectRef.store.get(this.props.formUid);
        if (store) {
            store.focusUid = this.FormHLSelectRef.uid;
            if (store.enableEnterSwitch && (this.props.iFormWithSelect.mode === 'default' || this.props.iFormWithSelect.mode === void 0)) {
                this.setState({ styleClassFocus: 'hool-select-focus-style' });
            }
        }
        var el = document.querySelector("." + this.FormHLSelectRef.uid);
        if (el && this.props.iFormWithSelect.mode === 'combobox') { // 只能做到对combobox类型聚点，全选文字，下拉多选，tag及普通模式由于实现方式不同，所以暂时做不到
            /* const selectedDom = el.getElementsByClassName('ant-select-selection-selected-value')
            if (selectedDom && selectedDom.length) {
                const range = document.createRange()
                range.selectNodeContents(selectedDom[0].firstChild);
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
            } */
            var inputSelect = el.getElementsByTagName('input');
            if (inputSelect && inputSelect.length) {
                inputSelect[0].select();
            }
        }
        /* if (store&&store.enableEnterSwitch&&this.props.iFormWithSelect.options && this.props.iFormWithSelect.options.length) {
            this.setState({
                open:true
            })
        } */
        this.props.iFormWithSelect && this.props.iFormWithSelect.onFocus && this.props.iFormWithSelect.onFocus();
    };
    FormHLSelect.prototype.onBlur = function () {
        if (this.state.open) {
            this.setState({
                open: false
            });
        }
        if (this.state.styleClassFocus) {
            this.setState({ styleClassFocus: '' });
        }
        this.props.iFormWithSelect && this.props.iFormWithSelect.onBlur && this.props.iFormWithSelect.onBlur();
    };
    FormHLSelect.prototype.onSelect = function (value, option) {
        this.props.iFormWithSelect && this.props.iFormWithSelect.onSelect && this.props.iFormWithSelect.onSelect(value, option);
    };
    FormHLSelect.prototype.onSearch = function (value) {
        if (this.FormHLSelectRef && this.props.formUid) {
            var viewStore = this.FormHLSelectRef.store.get(this.props.formUid);
            var view = viewStore.computedErrorReactNodeList.get(this.props.iAntdProps.name);
            if (view && view.validateStatus !== '') {
                view.validateStatus = '';
            }
        }
        /** 启用了远程搜索才会在搜索输入触发时调用 */
        if (this.props.formStore && this.props.formStore.localViewModel && this.props.iFormWithSelect.remote) {
            var view = this.props.formStore.localViewModel.selectView.get(this.props.iAntdProps.name);
            if (view && view.autoQuery) {
                this.props.formStore.localViewModel.dispatchRequest(this.props.iAntdProps.name, view.autoQuery, {
                    pageIndex: 1,
                    pageSize: view.pageSize,
                    keyWords: value,
                });
            }
        }
        if (this.state.styleClassFocus) {
            this.setState({ styleClassFocus: '' });
        }
        this.props.iFormWithSelect && this.props.iFormWithSelect.onSearch && this.props.iFormWithSelect.onSearch(value);
    };
    FormHLSelect.prototype.onChange = function (even) {
        this.props.iFormWithSelect.onChange && this.props.iFormWithSelect.onChange(even);
        if (this.FormHLSelectRef && this.props.formUid) {
            var viewStore = this.FormHLSelectRef.store.get(this.props.formUid);
            var view = viewStore.computedErrorReactNodeList.get(this.props.iAntdProps.name);
            if (view) {
                view.validateStatus = '';
            }
        }
        if (this.state.styleClassFocus) {
            this.setState({ styleClassFocus: '' });
        }
    };
    FormHLSelect.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormWithSelect = _a.iFormWithSelect, children = _a.children, rules = _a.rules, formUid = _a.formUid;
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError;
        var label = iFormWithSelect.label, labelCol = iFormWithSelect.labelCol, wrapperCol = iFormWithSelect.wrapperCol, props = __rest(iFormWithSelect, ["label", "labelCol", "wrapperCol"]);
        var mode = iFormWithSelect.mode || 'default';
        var options = props.options;
        var total = props.total;
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, elType: 'input', onReady: function (value) {
                _this.FormHLSelectRef = value;
            }, elementKey: iAntdProps.name, nextElementKey: iAntdProps.nextElementKey, formUid: formUid },
            React.createElement(FormItem$5, __assign({}, formItemProps, { extra: iFormWithSelect.extra, className: iAntdProps.className, label: iFormWithSelect.label, labelCol: iFormWithSelect.labelCol, wrapperCol: iFormWithSelect.wrapperCol }),
                getFieldDecorator(iAntdProps.name, {
                    rules: rules,
                })(React.createElement(HLSelectWrapError
                /* size="default" */
                , __assign({}, props, { selectAllClass: this.state.styleClassFocus, options: options, onPagingQuery: this.onPagingQuery, total: total, open: this.state.open, onIgnoreError: this.props.formStore && this.props.formStore.onIgnoreError, formUid: this.props.formUid, formHLSelectRef: this.FormHLSelectRef, formItemName: iAntdProps.name, placeholder: iAntdProps.placeholder, onClear: this.onClear, onSelect: this.onSelect.bind(this), onBlur: this.onBlur.bind(this), onSearch: this.onSearch.bind(this), onChange: this.onChange.bind(this), onFocus: this.onFocus.bind(this) }))),
                children)));
    };
    return FormHLSelect;
}(AbstractSelectForm));

var FormItem$6 = Form.Item;
var LabelWithInputNumberModel = /** @class */ (function () {
    function LabelWithInputNumberModel(iAntdProps, iFormInput, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormInput = iFormInput;
        this.rules = rules;
    }
    return LabelWithInputNumberModel;
}());
var FormInputNumber = /** @class */ (function (_super) {
    __extends(FormInputNumber, _super);
    function FormInputNumber(props) {
        var _this = _super.call(this, props) || this;
        _this.FormInputNumberRef = null;
        return _this;
    }
    FormInputNumber.prototype.onFocus = function (e) {
        var store = this.FormInputNumberRef.store.get(this.props.formUid);
        if (store) {
            store.focusUid = this.FormInputNumberRef.uid;
        }
        this.props.iFormInput && this.props.iFormInput.onFocus && this.props.iFormInput.onFocus(e);
    };
    FormInputNumber.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormInput = _a.iFormInput, children = _a.children, rules = _a.rules;
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError;
        var label = iFormInput.label, labelCol = iFormInput.labelCol, wrapperCol = iFormInput.wrapperCol, render = iFormInput.render, props = __rest(iFormInput, ["label", "labelCol", "wrapperCol", "render"]);
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormInputNumberRef = value;
            }, elementKey: iAntdProps.name, nextElementKey: iAntdProps.nextElementKey, elType: 'input', formUid: this.props.formUid },
            React.createElement(FormItem$6, __assign({}, formItemProps, { extra: iFormInput.extra, className: iAntdProps.className, label: iFormInput.label, labelCol: iFormInput.labelCol, wrapperCol: iFormInput.wrapperCol }),
                getFieldDecorator(iAntdProps.name, {
                    rules: rules,
                    normalize: function (value, prevValue, allValues) {
                        if (value !== void 0 && value !== null) {
                            return value.toString();
                        }
                        return value;
                    },
                })(
                // @ts-ignore
                React.createElement(InputNumber, __assign({ style: { width: '100%' }, placeholder: iAntdProps.placeholder }, props, { 
                    //@ts-ignore
                    onFocus: this.onFocus.bind(this) }))),
                children)));
    };
    return FormInputNumber;
}(AbstractForm));

var FormItem$7 = Form.Item;
var LabelWithSwitchModel = /** @class */ (function () {
    function LabelWithSwitchModel(iAntdProps, iFormWithSwitch, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormWithSwitch = iFormWithSwitch;
        this.rules = rules;
    }
    return LabelWithSwitchModel;
}());
var FormSwitch = /** @class */ (function (_super) {
    __extends(FormSwitch, _super);
    function FormSwitch(props) {
        var _this = _super.call(this, props) || this;
        _this.FormUploadRef = null;
        _this.state = {};
        return _this;
    }
    FormSwitch.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormWithSwitch = _a.iFormWithSwitch, children = _a.children, rules = _a.rules;
        var getFieldsError = form.getFieldsError, getFieldDecorator = form.getFieldDecorator;
        var label = iFormWithSwitch.label, labelCol = iFormWithSwitch.labelCol, wrapperCol = iFormWithSwitch.wrapperCol, props = __rest(iFormWithSwitch, ["label", "labelCol", "wrapperCol"]);
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormUploadRef = value;
            }, nextElementKey: iAntdProps.nextElementKey, elType: "button", elementKey: iAntdProps.name, formUid: this.props.formUid },
            React.createElement(FormItem$7, __assign({}, formItemProps, { className: iAntdProps.className, label: label, labelCol: labelCol, wrapperCol: wrapperCol }),
                getFieldDecorator(iAntdProps.name, {
                    rules: rules,
                    valuePropName: 'checked',
                })(React.createElement(Switch, __assign({}, props))),
                children)));
    };
    return FormSwitch;
}(AbstractForm));

var FormItem$8 = Form.Item;
var RadioButton = Radio.Button;
var RadioGroup = Radio.Group;
var LabelWithRadioButtonModel = /** @class */ (function () {
    function LabelWithRadioButtonModel(iAntdProps, iFormWithRadioButton, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormWithRadioButton = iFormWithRadioButton;
        this.rules = rules;
    }
    return LabelWithRadioButtonModel;
}());
var FormRadioButton = /** @class */ (function (_super) {
    __extends(FormRadioButton, _super);
    function FormRadioButton(props) {
        var _this = _super.call(this, props) || this;
        _this.FormUploadRef = null;
        _this.state = {};
        return _this;
    }
    FormRadioButton.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormWithRadioButton = _a.iFormWithRadioButton, children = _a.children, rules = _a.rules;
        var getFieldsError = form.getFieldsError, getFieldDecorator = form.getFieldDecorator;
        var label = iFormWithRadioButton.label, labelCol = iFormWithRadioButton.labelCol, wrapperCol = iFormWithRadioButton.wrapperCol, radioGroup = iFormWithRadioButton.radioGroup, radioButton = iFormWithRadioButton.radioButton, radio = iFormWithRadioButton.radio, props = __rest(iFormWithRadioButton, ["label", "labelCol", "wrapperCol", "radioGroup", "radioButton", "radio"]);
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormUploadRef = value;
            }, elType: "input", nextElementKey: iAntdProps.nextElementKey, elementKey: iAntdProps.name, formUid: this.props.formUid },
            React.createElement(FormItem$8, __assign({}, formItemProps, { className: iAntdProps.className, label: label, labelCol: labelCol, wrapperCol: wrapperCol }),
                getFieldDecorator(iAntdProps.name, {
                    rules: rules,
                })(React.createElement(RadioGroup, __assign({}, radioGroup),
                    radioButton && radioButton.options.map(function (item, index) {
                        return React.createElement(RadioButton, __assign({ key: "" + item.value + index, value: item.value }, item), item.label);
                    }),
                    radio && radio.options.map(function (item, index) {
                        return React.createElement(Radio, __assign({}, item, { key: "" + item.value + index, value: item.value }), item.label);
                    }))),
                children)));
    };
    return FormRadioButton;
}(AbstractForm));

var FormItem$9 = Form.Item;
/* import { debounce as debounces } from 'lodash' */
var LabelWithTextModel = /** @class */ (function () {
    function LabelWithTextModel(iAntdProps, iFormText, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormText = iFormText;
        this.rules = rules;
    }
    return LabelWithTextModel;
}());
var TooltipText = /** @class */ (function (_super) {
    __extends(TooltipText, _super);
    function TooltipText(props) {
        return _super.call(this, props) || this;
    }
    TooltipText.prototype.render = function () {
        var _a;
        var _b = this.props, form = _b.form, FormTextRef = _b.FormTextRef, inputType = _b.inputType, props = __rest(_b, ["form", "FormTextRef", "inputType"]);
        var isShowErrorView = false;
        if (FormTextRef && this.props.formUid) {
            var viewStore = FormTextRef.store.get(this.props.formUid);
            if (viewStore.computedErrorReactNodeList.has(this.props.formItemName)) {
                var uid = viewStore.computedErrorReactNodeList.get(this.props.formItemName).uid;
                isShowErrorView = viewStore.errorListView.has(uid);
            }
        }
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError, setFieldsValue = form.setFieldsValue;
        return (React.createElement(LegionsProErrorReportShow, { code: this.props.formItemName, formUid: this.props.formUid, errorClassName: classNames((_a = {},
                _a["" + Styles.tipIconInput] = true,
                _a["" + Styles['tipIcon-right-0']] = (this.props.value) ? true : false,
                _a)) },
            React.createElement(Tooltip, { trigger: 'click', title: this.props.value, placement: "topLeft", overlayStyle: { wordWrap: 'break-word' } },
                React.createElement("span", { style: {
                        overflow: 'hidden', width: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block'
                    } }, this.props.value))));
    };
    return TooltipText;
}(React.Component));
var FormText = /** @class */ (function (_super) {
    __extends(FormText, _super);
    function FormText(props) {
        var _this = _super.call(this, props) || this;
        _this.FormTextRef = null;
        return _this;
    }
    FormText.prototype.render = function () {
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormText = _a.iFormText, children = _a.children, rules = _a.rules;
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError, setFieldsValue = form.setFieldsValue;
        var label = iFormText.label, labelCol = iFormText.labelCol, wrapperCol = iFormText.wrapperCol, props = __rest(iFormText, ["label", "labelCol", "wrapperCol"]);
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormItem$9, __assign({}, formItemProps, { extra: iFormText.extra, className: iAntdProps.className, label: iFormText.label, labelCol: iFormText.labelCol, wrapperCol: iFormText.wrapperCol }),
            getFieldDecorator(iAntdProps.name, {
                rules: rules,
                normalize: function (value, prevValue, allValues) {
                    return value && value.toString();
                },
            })(React.createElement(TooltipText, __assign({}, props, { formUid: this.props.formUid, FormTextRef: this.FormTextRef, value: form.getFieldValue(iAntdProps.name), formItemName: iAntdProps.name, form: form, inputType: 'span' }))),
            children));
    };
    return FormText;
}(AbstractForm));

var FormItem$a = Form.Item;
var LabelWithCheckboxModel = /** @class */ (function () {
    function LabelWithCheckboxModel(iAntdProps, iFormWithCheckbox, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormWithCheckbox = iFormWithCheckbox;
        this.rules = rules;
    }
    return LabelWithCheckboxModel;
}());
var FormCheckbox = /** @class */ (function (_super) {
    __extends(FormCheckbox, _super);
    function FormCheckbox(props) {
        var _this = _super.call(this, props) || this;
        _this.FormCheckboxRef = null;
        _this.state = {};
        return _this;
    }
    FormCheckbox.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormWithCheckbox = _a.iFormWithCheckbox, children = _a.children, rules = _a.rules;
        var getFieldsError = form.getFieldsError, getFieldDecorator = form.getFieldDecorator;
        var label = iFormWithCheckbox.label, labelCol = iFormWithCheckbox.labelCol, wrapperCol = iFormWithCheckbox.wrapperCol, options = iFormWithCheckbox.options, props = __rest(iFormWithCheckbox, ["label", "labelCol", "wrapperCol", "options"]);
        var formItemProps = {};
        if ('colon' in props) {
            formItemProps['colon'] = props.colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormCheckboxRef = value;
            }, nextElementKey: iAntdProps.nextElementKey, elType: "button", elementKey: iAntdProps.name, formUid: this.props.formUid },
            React.createElement(FormItem$a, __assign({}, formItemProps, { className: iAntdProps.className, label: label, labelCol: labelCol, wrapperCol: wrapperCol }), getFieldDecorator(iAntdProps.name, {
                rules: rules,
            })(React.createElement(Checkbox.Group, __assign({}, props), options.map(function (item) {
                var disabled = {};
                if ('disabled' in item) {
                    disabled['disabled'] = item.disabled;
                }
                return React.createElement(Checkbox, __assign({}, disabled, { value: item.value }), item.label);
            }))))));
    };
    return FormCheckbox;
}(AbstractForm));

var CreateForm = /** @class */ (function (_super) {
    __extends(CreateForm, _super);
    function CreateForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateForm.prototype.createFormInput = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, iFormInput = control.iFormInput, rules = control.rules;
        return (React.createElement(FormInput, { iAntdProps: iAntdProps, form: form, key: key, rules: rules, formUid: formUid, formStore: formRef, iFormInput: iFormInput }));
    };
    CreateForm.prototype.createFormInputNumber = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, iFormInput = control.iFormInput, rules = control.rules;
        return (React.createElement(FormInputNumber, { iAntdProps: iAntdProps, form: form, key: key, rules: rules, formUid: formUid, iFormInput: iFormInput }));
    };
    CreateForm.prototype.createFormSelect = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormWithSelect = control.iFormWithSelect;
        return (React.createElement(FormHLSelect, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formStore: formRef, formUid: formUid, iFormWithSelect: iFormWithSelect }));
    };
    CreateForm.prototype.createFormRender = function (key, control, form, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormRender = control.iFormRender;
        return (React.createElement(FormRender, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formRef: formRef, iFormRender: iFormRender }));
    };
    CreateForm.prototype.createFormDatePicker = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormDatePicker = control.iFormDatePicker;
        return (React.createElement(FormDatePicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormDatePicker: iFormDatePicker }));
    };
    CreateForm.prototype.createFormMonthPicker = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormMonthPicker = control.iFormMonthPicker;
        return (React.createElement(FormMonthPicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormMonthPicker: iFormMonthPicker }));
    };
    CreateForm.prototype.createFormRangePicker = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormRangePicker = control.iFormRangePicker;
        return (React.createElement(FormRangePicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormRangePicker: iFormRangePicker }));
    };
    CreateForm.prototype.createFormUpload = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormWithUpload = control.iFormWithUpload;
        return (React.createElement(FormUpload, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithUpload: iFormWithUpload }));
    };
    CreateForm.prototype.createFormSwitch = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormWithSwitch = control.iFormWithSwitch;
        return (React.createElement(FormSwitch, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithSwitch: iFormWithSwitch }));
    };
    CreateForm.prototype.createFormRadioButton = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormWithRadioButton = control.iFormWithRadioButton;
        return (React.createElement(FormRadioButton, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithRadioButton: iFormWithRadioButton }));
    };
    CreateForm.prototype.createFormText = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormText = control.iFormText;
        return (React.createElement(FormText, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormText: iFormText }));
    };
    /* protected createFormHlTable(key:number,control:LabelWithHLTableModel,form:WrappedFormUtils,formUid:string){
        let {iAntdProps,rules,iFormWithTable}=control;
        return(
            <FormHLTable
                iAntdProps={iAntdProps}
                form={form}
                rules={rules}
                key={key}
                formUid={formUid}
                iFormWithTable={iFormWithTable}
            >

            </FormHLTable>
        )
    } */
    CreateForm.prototype.createFormCheckbox = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormWithCheckbox = control.iFormWithCheckbox;
        return (React.createElement(FormCheckbox, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithCheckbox: iFormWithCheckbox }));
    };
    return CreateForm;
}(React.Component));

var LabelWithHLSelectModel = /** @class */ (function () {
    function LabelWithHLSelectModel(iAntdProps, iFormWithSelect, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormWithSelect = iFormWithSelect;
        this.rules = rules;
    }
    return LabelWithHLSelectModel;
}());

var FormItem$b = Form.Item;
var Option$1 = Select.Option;
var OptGroup$1 = Select.OptGroup;
var LabelWithSelectModel = /** @class */ (function () {
    function LabelWithSelectModel(iAntdProps, iFormWithSelect, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormWithSelect = iFormWithSelect;
        this.rules = rules;
    }
    return LabelWithSelectModel;
}());
var FormSelect = /** @class */ (function (_super) {
    __extends(FormSelect, _super);
    function FormSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.FormSelectRef = null;
        return _this;
    }
    FormSelect.prototype.renderOption = function () {
        var _a = this.props.iFormWithSelect, optGroups = _a.optGroups, options = _a.options;
        if (optGroups) {
            return optGroups.map(function (item, index) {
                var option = options.filter(function (entity) { return entity.group === item.label; });
                return React.createElement(OptGroup$1, { label: item.label, key: "" + item.label + index }, option.map(function (option, key) {
                    React.createElement(Option$1, __assign({}, option, { value: option.key, disabled: option.disabled, key: "" + key.toString() + option.value }), option.value);
                }));
            });
        }
        return options.map(function (option, key) {
            return React.createElement(Option$1, __assign({}, option, { disabled: option.disabled, value: option.key, key: "" + key.toString() + option.value }), option.value);
        });
    };
    FormSelect.prototype.onFocus = function () {
        var store = this.FormSelectRef.store.get(this.props.formUid);
        if (store) {
            store.focusUid = this.FormSelectRef.uid;
        }
        this.props.iFormWithSelect && this.props.iFormWithSelect.onFocus && this.props.iFormWithSelect.onFocus();
    };
    FormSelect.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormWithSelect = _a.iFormWithSelect, children = _a.children, rules = _a.rules;
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError;
        var label = iFormWithSelect.label, labelCol = iFormWithSelect.labelCol, wrapperCol = iFormWithSelect.wrapperCol, props = __rest(iFormWithSelect, ["label", "labelCol", "wrapperCol"]);
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormSelectRef = value;
            }, nextElementKey: iAntdProps.nextElementKey, elementKey: iAntdProps.name, formUid: this.props.formUid },
            React.createElement(FormItem$b, { extra: iFormWithSelect.extra, className: iAntdProps.className, label: iFormWithSelect.label, labelCol: iFormWithSelect.labelCol, wrapperCol: iFormWithSelect.wrapperCol },
                getFieldDecorator(iAntdProps.name, {
                    rules: rules,
                })(React.createElement(Select, __assign({ size: "small" }, props, { onFocus: this.onFocus.bind(this) }), this.renderOption())),
                children)));
    };
    return FormSelect;
}(AbstractForm));

var ProFormUtils = /** @class */ (function () {
    function ProFormUtils(options) {
        this.global = null;
        this.mobxStore = null;
        // super()
        if (options) {
            if (options.global) {
                this.global = options.global;
            }
            if (options.store) ;
            if (typeof options.store === 'function' && options.store.meta) {
                var stores = getInjector();
                this.mobxStore = stores.getState(options.store);
            }
        }
    }
    ProFormUtils.prototype.createAntdProps = function (name, groupId, placeholder, params) {
        if (placeholder === void 0) { placeholder = ''; }
        return __assign({ id: name, name: name, placeholder: placeholder || '', groupId: groupId }, params);
    };
    ProFormUtils.prototype.createLayout = function (label, labelCol, wrapperCol, params) {
        return __assign({ label: label, labelCol: {
                span: labelCol
            }, wrapperCol: {
                span: wrapperCol
            } }, params);
    };
    ProFormUtils.prototype.getFormConfig = function (componentConfigKey) {
        return this[componentConfigKey];
    };
    ProFormUtils.prototype.chkRenderConfig = function (key) {
        if (this[key]) ;
    };
    ProFormUtils.prototype.renderSelectConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        this[options.iAntdProps.id] = new LabelWithHLSelectModel(options.iAntdProps, options.iFormProps, options.rules || []);
        return this[options.iAntdProps.id];
    };
    ProFormUtils.prototype.renderInputConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        return this[options.iAntdProps.id] = new LabelWithInputModel(options.iAntdProps, options.iFormProps, options.rules || []);
    };
    ProFormUtils.prototype.renderTextConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        this[options.iAntdProps.id] = new LabelWithTextModel(options.iAntdProps, options.iFormProps, options.rules || []);
        return this[options.iAntdProps.id];
    };
    ProFormUtils.prototype.renderDatePickerConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        this[options.iAntdProps.id] = new LabelWithDatePickerModel(options.iAntdProps, options.iFormProps, options.rules || []);
        return this[options.iAntdProps.id];
    };
    ProFormUtils.prototype.renderMonthPickerConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        return this[options.iAntdProps.id] = new LabelWithMonthPickerModel(options.iAntdProps, options.iFormProps, options.rules || []);
    };
    ProFormUtils.prototype.renderRangePickerConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        return this[options.iAntdProps.id] = new LabelWithRangePickerModel(options.iAntdProps, options.iFormProps, options.rules || []);
    };
    ProFormUtils.prototype.renderInputNumberConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        return this[options.iAntdProps.id] = new LabelWithInputNumberModel(options.iAntdProps, options.iFormProps, options.rules || []);
    };
    ProFormUtils.prototype.renderRadioButtonConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        return this[options.iAntdProps.id] = new LabelWithRadioButtonModel(options.iAntdProps, options.iFormProps, options.rules || []);
    };
    ProFormUtils.prototype.renderSwitchConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        return this[options.iAntdProps.id] = new LabelWithSwitchModel(options.iAntdProps, options.iFormProps, options.rules || []);
    };
    ProFormUtils.prototype.renderUploadConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        return this[options.iAntdProps.id] = new LabelWithUploadModel(options.iAntdProps, options.iFormProps, options.rules || []);
    };
    /**
     * 自定义组件
     *
     * @template T
     * @param {(IRenderComponentParams<IFormUploadProps & T>)} options
     * @memberof HLFormUtils
     */
    ProFormUtils.prototype.renderCustomConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        return this[options.iAntdProps.id] = new LabelWithRenderModel(options.iAntdProps, options.iFormProps, options.rules || []);
    };
    ProFormUtils.prototype.renderCheckboxConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        return this[options.iAntdProps.id] = new LabelWithCheckboxModel(options.iAntdProps, options.iFormProps, options.rules || []);
    };
    /**
     * 生成一个表单基础组件
     * 应用场景一般自定义组件由很多比如input,select等组成，可以通过此方法快速创建一个组件
     *
     * @param {IHLFormUtils['componentModel']} control
     * @param {WrappedFormUtils} form
     * @param {string} formUid
     * @param {InstanceForm} formRef
     * @param {(string|number)} [key]
     * @returns
     * @memberof HLFormUtils
     */
    ProFormUtils.prototype.createFormComponent = function (control, form, formUid, formRef, key) {
        if (key === void 0) {
            key = control.iAntdProps.id;
        }
        if (control instanceof LabelWithInputModel) {
            var iAntdProps = control.iAntdProps, iFormInput = control.iFormInput, rules = control.rules;
            return (React.createElement(FormInput, { iAntdProps: iAntdProps, form: form, key: key, rules: rules, formUid: formUid, formStore: formRef, iFormInput: iFormInput }));
        }
        else if (control instanceof LabelWithInputNumberModel) {
            var iAntdProps = control.iAntdProps, iFormInput = control.iFormInput, rules = control.rules;
            return (React.createElement(FormInputNumber, { iAntdProps: iAntdProps, form: form, key: key, rules: rules, formUid: formUid, iFormInput: iFormInput }));
        }
        else if (control instanceof LabelWithHLSelectModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormWithSelect = control.iFormWithSelect;
            return (React.createElement(FormHLSelect, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formStore: formRef, formUid: formUid, iFormWithSelect: iFormWithSelect }));
        }
        else if (control instanceof LabelWithDatePickerModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormDatePicker = control.iFormDatePicker;
            return (React.createElement(FormDatePicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormDatePicker: iFormDatePicker }));
        }
        else if (control instanceof LabelWithMonthPickerModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormMonthPicker = control.iFormMonthPicker;
            return (React.createElement(FormMonthPicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormMonthPicker: iFormMonthPicker }));
        }
        else if (control instanceof LabelWithRangePickerModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormRangePicker = control.iFormRangePicker;
            return (React.createElement(FormRangePicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormRangePicker: iFormRangePicker }));
        }
        else if (control instanceof LabelWithUploadModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormWithUpload = control.iFormWithUpload;
            return (React.createElement(FormUpload, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithUpload: iFormWithUpload }));
        }
        else if (control instanceof LabelWithSwitchModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormWithSwitch = control.iFormWithSwitch;
            return (React.createElement(FormSwitch, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithSwitch: iFormWithSwitch }));
        }
        else if (control instanceof LabelWithRadioButtonModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormWithRadioButton = control.iFormWithRadioButton;
            return (React.createElement(FormRadioButton, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithRadioButton: iFormWithRadioButton }));
        }
        else if (control instanceof LabelWithTextModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormText = control.iFormText;
            return (React.createElement(FormText, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormText: iFormText }));
        }
        else {
            throw new Error("HLFormUtils: Unknown control. control = " + JSON.stringify(control));
        }
    };
    return ProFormUtils;
}());

var Link = Anchor.Link;
var FormItem$c = Form.Item;
var baseCls = "legions-pro-form";
var COMPONENT_TYPE = ['iFormInput', 'iFormText', 'iFormWithSelect', 'iFormDatePicker', 'iFormMonthPicker', 'iFormRangePicker', 'iFormWithRadioButton', 'iFormWithSwitch',];
var KeydownEnum$1;
(function (KeydownEnum) {
    /**键盘向上键 */
    KeydownEnum[KeydownEnum["up"] = 38] = "up";
    /** 键盘向下键 */
    KeydownEnum[KeydownEnum["next"] = 40] = "next";
    /** 回车键 */
    KeydownEnum[KeydownEnum["enter"] = 13] = "enter";
})(KeydownEnum$1 || (KeydownEnum$1 = {}));
var size = {
    'default': {
        formItemLayOut: 'form-item-default',
    }, 'small': {
        formItemLayOut: 'form-item-small',
    }, 'table': {
        formItemLayOut: 'form-item-table',
    }
};
var HLForm = /** @class */ (function (_super) {
    __extends(HLForm, _super);
    function HLForm(props) {
        var _this = _super.call(this, props) || this;
        _this.timer = null;
        _this.timeId = new Date().getTime();
        /** 根据时间戳生成，每次初始化表单组件都会产生新的值*/
        _this.uid = '';
        /** uid 的值绝对唯一，且每次初始生成表单都是相同值 */
        _this.freezeUid = '';
        /** 未加密的freezeUid 值 */
        _this.decryptionFreezeUid = '';
        _this.subscription = null;
        _this.controlsLen = 0;
        /** 全链路监控跟踪id */
        _this.traceId = '';
        _this.watcher = function (n) {
            console.log(_this.storeView.InputDataModel, 'InputDataModel');
        };
        _this.state = {
            groupEntity: [],
            activeName: ''
        };
        _this.uid = _this.props['uid'];
        _this.uid = "form" + _this.props.store.HLFormContainer.size + shortHash("" + _this.timeId + _this.props.store.HLFormContainer.size);
        if (_this.props.store.HLFormContainer.has(_this.uid)) {
            _this.timeId = new Date().getTime();
            _this.uid = "form" + _this.props.store.HLFormContainer.size + shortHash("" + _this.timeId + _this.props.store.HLFormContainer.size);
        }
        _this.traceId = _this.uid;
        _this.props.store.add(_this.uid, __assign(__assign({}, _this.props.form), { validateFields: _this.validateFields.bind(_this) }), _this.props.InputDataModel);
        if (_this.props['uniqueUid']) {
            _this.decryptionFreezeUid = "" + _this.props['uniqueUid'] + (_this.props.uniqueKeys || '') + (process.env.environment === 'production' ? 'production' : '');
            _this.freezeUid = shortHash(_this.decryptionFreezeUid);
            if (!_this.props.store.HLFormLocalDataContainer.has(_this.freezeUid)) {
                _this.props.store.addLocalData(_this.freezeUid);
                _this.initSelectView();
            }
            _this.storeLocalView.setDragSort(_this.props.isDragSort);
            if (_this.storeLocalView.dragSortState) {
                _this.storeLocalView.updateControlsSort(_this.props.controls.map(function (item) { return item.iAntdProps.name; }));
            }
        }
        _this.storeView.updateStyleSize(_this.props.size);
        /* if (this.props.InputDataModel) {
            this.subscription = this.props.store.schedule([() => {
                const view = this.storeView.InputDataModel
            }])
        } */
        _this.initFromState();
        _this.setFormItemStateDisabled({
            props: _this.props
        });
        _this.consoleLog('hlFormContainer-constructor');
        return _this;
    }
    Object.defineProperty(HLForm.prototype, "storeView", {
        get: function () {
            return this.props.store.HLFormContainer.get(this.uid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HLForm.prototype, "storeLocalView", {
        get: function () {
            return this.props.store.HLFormLocalDataContainer.get(this.freezeUid);
        },
        enumerable: false,
        configurable: true
    });
    HLForm.prototype.consoleLog = function (type, logObj) {
        var obj = logObj || {};
        var logConent = __assign(__assign({ localView: __assign({}, this.storeLocalView) }, obj), { store: this.props.store, that: toJS(this), props: toJS(this.props), storeView: this.storeView });
        LoggerManager.consoleLog({
            type: type,
            logConent: logConent,
            methodsName: 'onHLFormCycle',
        });
    };
    HLForm.prototype.logger = function (type, logObj) {
        if (typeof this.props.onLogRecord === 'function') {
            var obj = logObj || {};
            var _a = this.props, store = _a.store, form = _a.form, props = __rest(_a, ["store", "form"]);
            var logConent = __assign(__assign({}, obj), { props: {
                    colCount: props.colCount,
                    size: props.size,
                } });
            LoggerManager.report({
                type: type,
                content: JSON.stringify(logConent),
                traceId: this.traceId,
                modulesPath: this.props['uniqueUid'],
            }, this.props.onLogRecord);
        }
    };
    HLForm.prototype.getFormItemState = function (name) {
        return this.storeView.computedFormState.get(name);
    };
    HLForm.prototype.initGroup = function (group) {
        if (group === void 0) { group = this.props.group; }
        if (this.state.groupEntity.length === 0 || (group && this.state.groupEntity.length !== group.length)) {
            var groupEntity_1 = [];
            group && group.map(function (item) {
                groupEntity_1.push({ name: item.name, active: item.active, isFolding: item.isFolding, id: item.id, isShowFormSizeIcon: item.isShowFormSizeIcon });
            });
            this.setState({
                groupEntity: groupEntity_1
            });
        }
    };
    /** 重写表单验证提交方法 */
    HLForm.prototype.validateFields = function () {
        var _a;
        var _this = this;
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        console.log(options);
        var callback = null;
        var newCallback = function (callbacks) { return function (error, values) {
            _this.logger('hlFormContainer-validateFields', { error: error, values: values, traceId: _this.traceId });
            callbacks(error, values);
        }; };
        if (options.length === 3) {
            if (typeof options[2] === 'function') {
                callback = options[2];
                options[2] = newCallback(callback);
            }
        }
        else if (options.length === 2) {
            if (typeof options[1] === 'function') {
                callback = options[1];
                options[1] = newCallback(callback);
            }
        }
        else if (options.length === 1 && typeof options[0] === 'function') {
            callback = options[0];
            options[0] = newCallback(callback);
        }
        // @ts-ignore
        (_a = this.props.form).validateFields.apply(_a, __spread(options));
    };
    HLForm.prototype.componentWillMount = function () {
        var _this = this;
        var group = this.props.group;
        var groupEntity = [];
        group && group.map(function (item) {
            groupEntity.push({ name: item.name, active: item.active, isFolding: item.isFolding, id: item.id, isShowFormSizeIcon: item.isShowFormSizeIcon });
        });
        this.setState({
            groupEntity: groupEntity
        });
        var view = this.props.store.HLFormContainer.get(this.uid);
        var localview = this.props.store.HLFormLocalDataContainer.get(this.freezeUid);
        view.controls = this.props.controls;
        this.props.onGetForm && this.props.onGetForm(__assign(__assign({}, this.props.form), { validateFields: this.validateFields.bind(this) }), {
            store: this.props.store,
            uid: this.uid,
            viewModel: view,
            localViewModel: localview,
            freezeUid: this.freezeUid,
            decryptionFreezeUid: this.decryptionFreezeUid,
            methods: {
                onSelectSearch: function (name, options) {
                    _this.onSelectSearch(name, options);
                },
                getQuerySelectOption: function (name, optionKey) {
                    var selectView = _this.storeLocalView.selectView.get(name);
                    var optionItem = new HlLabeledValue();
                    if (selectView && selectView.currValue) {
                        for (var i = 1; i <= selectView.currValue.data.size; i++) {
                            var option = selectView.currValue.data.get(i.toString()).find(function (item) { return item.key === optionKey; });
                            if (option) {
                                optionItem = __assign(__assign({}, optionItem), option);
                                break;
                            }
                        }
                    }
                    return {
                        option: optionItem,
                    };
                },
            },
            validateFields: function (callback) {
                view.form.validateFields(callback);
            }
        });
        this.consoleLog('hlFormContainer-componentWillMount');
        /* document.addEventListener('keydown',this.handleKeyDown.bind(this)) */
    };
    HLForm.prototype.componentDidMount = function () {
        var el = document.querySelector("." + this.uid);
        if (el) {
            el.addEventListener('keydown', this.handleKeyDown.bind(this));
        }
        this.controlsLen = this.props.controls.length;
        this.consoleLog('hlFormContainer-componentDidMount');
    };
    HLForm.prototype.componentWillReceiveProps = function (nextProps) {
        var store = this.props.store.HLFormContainer.get(this.uid);
        if (store.elementList.size !== store.nodeCount || store.elementList.size !== store.computedAllElementList.length) {
            store.nodeCount = store.elementList.size;
            this.props.store.clearAllElement(this.uid);
        }
        if (this.props.controls !== nextProps.controls) {
            this.setFormItemStateDisabled({
                props: this.props,
                nextProps: nextProps
            });
            this.storeView.controls = nextProps.controls;
            if (this.storeLocalView.dragSortState) {
                this.storeLocalView.updateControlsSort(nextProps.controls.map(function (item) { return item.iAntdProps.name; }));
            }
            if (this.props['uniqueUid']) {
                this.initSelectView(false, nextProps.controls);
            }
        }
        if (nextProps.size !== this.props.size) {
            this.storeView.updateStyleSize(nextProps.size);
        }
        if (this.props.group !== nextProps.group) {
            this.initGroup(nextProps.group);
        }
        this.consoleLog('hlFormContainer-componentWillReceiveProps');
    };
    HLForm.prototype.componentWillUnmount = function () {
        this.props.store.delete(this.uid);
        var el = document.querySelector("." + this.uid);
        if (el) {
            el.removeEventListener('keydown', this.handleKeyDown.bind(this));
        }
        this.consoleLog('hlFormContainer-componentWillUnmount');
        /* document.removeEventListener('keydown',this.handleKeyDown.bind(this)) */
    };
    HLForm.prototype.initFromState = function () {
        var _this = this;
        if (this.props.controls && Array.isArray(this.props.controls)) {
            this.props.controls.map(function (item) {
                _this.storeView.initFormState(item.iAntdProps.name);
            });
        }
    };
    /**
     * 初始化下拉框数据
     *
     * @param {boolean} [isDispatch=true]
     * @param {*} [controls=this.props.controls]
     * @memberof HLForm
     */
    HLForm.prototype.initSelectView = function (isDispatch, controls) {
        var _this = this;
        if (isDispatch === void 0) { isDispatch = true; }
        if (controls === void 0) { controls = this.props.controls; }
        if (controls && Array.isArray(this.props.controls)) {
            controls.map(function (item) {
                if (item instanceof LabelWithHLSelectModel && item.iFormWithSelect && item.iFormWithSelect.autoQuery)
                    runInAction(function () {
                        if (_this.storeLocalView && item.iAntdProps) {
                            var pageSize = item.iFormWithSelect.pageSize || 30;
                            var keywords = item.iFormWithSelect.autoQuery.params(1, pageSize, '').defaultKeyWords;
                            if (!_this.storeLocalView.selectView.has(item.iAntdProps.name)) {
                                _this.storeLocalView.initSelectView(item.iAntdProps.name, item.iFormWithSelect.autoQuery, {
                                    paging: item.iFormWithSelect.paging === void 0 ? false : item.iFormWithSelect.paging,
                                    remote: item.iFormWithSelect.remote === void 0 ? false : item.iFormWithSelect.remote,
                                    pageSize: pageSize,
                                    tableNameDb: "" + _this.freezeUid,
                                    keywords: item.iFormWithSelect.autoQuery.params(1, item.iFormWithSelect.pageSize || 30, '').defaultKeyWords
                                });
                            }
                            if (item.iFormWithSelect.autoQuery) {
                                if (!_this.storeLocalView.selectOptions.has(item.iAntdProps.name)) {
                                    _this.storeLocalView.initSelectOptions(item.iAntdProps.name, item.iFormWithSelect.autoQuery);
                                }
                                if (isDispatch) {
                                    _this.storeLocalView.dispatchRequest(item.iAntdProps.name, item.iFormWithSelect.autoQuery, {
                                        pageIndex: 1,
                                        pageSize: pageSize,
                                        keyWords: keywords,
                                    });
                                }
                            }
                        }
                    });
            });
        }
    };
    HLForm.prototype.onSelectSearch = function (name, options) {
        if (this.storeLocalView && this.storeLocalView.selectView.has(name)) {
            var item = this.storeLocalView.selectView.get(name);
            this.storeLocalView.dispatchRequest(name, item.autoQuery, __assign({ pageIndex: options.pageIndex, pageSize: item.pageSize, keyWords: options.keywords }, options));
        }
    };
    /** 设置表单选项禁用和启用值 */
    HLForm.prototype.setFormItemStateDisabled = function (options) {
        var _this = this;
        var nextProps = options.nextProps;
        var props = options.props || this.props;
        if (nextProps) {
            nextProps.controls.map(function (item) {
                var entity = props.controls.find(function (w) { return w.iAntdProps.name === item.iAntdProps.name; });
                if (entity) {
                    COMPONENT_TYPE.map(function (c) {
                        if (c === 'iFormWithRadioButton') {
                            var propsDisabled = get(entity, c + ".radioGroup.disabled");
                            var nextPropsDisabled = get(item, c + ".radioGroup.disabled");
                            if (propsDisabled !== void 0 && nextPropsDisabled !== void 0 && propsDisabled !== nextPropsDisabled) {
                                _this.storeView.setFormState(item.iAntdProps.name, { disabled: nextPropsDisabled });
                            }
                        }
                        else {
                            var propsDisabled = get(entity, c + ".disabled");
                            var nextPropsDisabled = get(item, c + ".disabled");
                            if (propsDisabled !== void 0 && nextPropsDisabled !== void 0) {
                                _this.storeView.setFormState(item.iAntdProps.name, { disabled: nextPropsDisabled });
                            }
                        }
                    });
                }
            });
        }
        else {
            props.controls.map(function (item) {
                COMPONENT_TYPE.map(function (c) {
                    if (c === 'iFormWithRadioButton') {
                        var propsDisabled = get(item, c + ".radioGroup.disabled");
                        if (propsDisabled !== void 0) {
                            _this.storeView.setFormState(item.iAntdProps.name, { disabled: propsDisabled });
                        }
                    }
                    else {
                        var propsDisabled = get(item, c + ".disabled");
                        if (propsDisabled !== void 0) {
                            _this.storeView.setFormState(item.iAntdProps.name, { disabled: propsDisabled });
                        }
                    }
                });
            });
        }
    };
    HLForm.prototype.queryElementItem = function (ElementKey) {
        var _this = this;
        if (this.storeView) {
            var keys = this.storeView.elementList.keys();
            var entitys_1 = null;
            keys.map(function (item) {
                var entity = _this.storeView.elementList.get(item);
                if (entity && entity.elementKey === ElementKey) {
                    entitys_1 = __assign(__assign({}, entity), { keys: item });
                }
            });
            return entitys_1;
        }
        return null;
    };
    /**
     * 跨表单跳转
     *
     * @param {{ formUid: string;nextElementKey:string}} elementItem
     * @returns {(IElementList & {keys:string})}
     * @memberof HLForm
     */
    HLForm.prototype.queryFormElementItem = function (elementItem) {
        var e_1, _a;
        var viewStore = this.props.store.HLFormContainer.get(elementItem.formUid);
        if (viewStore) {
            var keys = [];
            try {
                for (var _b = __values(viewStore.elementList.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    keys.push(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var entitys_2 = null;
            keys.map(function (item) {
                var entity = viewStore.elementList.get(item);
                if (entity && entity.elementKey === elementItem.nextElementKey) {
                    entitys_2 = __assign(__assign({}, entity), { keys: item, viewStore: viewStore });
                }
            });
            return entitys_2;
        }
        return null;
    };
    //@ts-ignore
    HLForm.prototype.handleKeyDown = function (e) {
        var formStore = this.props.store.get(this.uid);
        var keyCode = e.keyCode;
        if (formStore && formStore.enableEnterSwitch) {
            /* e.stopPropagation() */
            var keys = formStore.elementList.keys();
            if (keys.length > 0 && !formStore.focusUid) {
                formStore.focusUid = keys[0];
            }
            if (keyCode === KeydownEnum$1.next || keyCode === KeydownEnum$1.enter) {
                var _loop_1 = function (i) {
                    var index = keys.findIndex(function (item) { return item === formStore.focusUid; });
                    if (index > -1) {
                        var currUid = keys[index];
                        var nextIndex = index + 1;
                        var nextUid = keys[nextIndex];
                        var currElement = formStore.elementList.get(currUid);
                        if (currElement.nextElementKey) {
                            if (typeof currElement.nextElementKey === 'string') {
                                var nextElementItem = this_1.queryElementItem(currElement.nextElementKey);
                                if (nextElementItem) {
                                    nextUid = nextElementItem.keys;
                                }
                            }
                            if (typeof currElement.nextElementKey === 'object') {
                                var nextElementItem = this_1.queryFormElementItem(currElement.nextElementKey);
                                if (nextElementItem) {
                                    nextUid = nextElementItem.keys;
                                    formStore = nextElementItem.viewStore;
                                }
                            }
                        }
                        else {
                            if (nextIndex >= keys.length) { /**  当到达最后一个元素时，再次回车将回到第一个元素的焦点*/
                                nextIndex = 0;
                                nextUid = keys[nextIndex];
                            }
                        }
                        var el_1 = formStore.elementList.get(nextUid);
                        if (el_1) {
                            var result = el_1.element instanceof HTMLCollection;
                            if (result && el_1.element.length) {
                                var selectDom = document.querySelector("." + currUid);
                                if (selectDom) {
                                    var selectSelectionDom = selectDom.getElementsByClassName('ant-select-open');
                                    if (selectSelectionDom && selectSelectionDom.length) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为 不跳转下一个元素
                                        e.preventDefault();
                                        return { value: false };
                                    }
                                }
                                if (el_1.elementTabindex && el_1.elementTabindex instanceof HTMLCollection && el_1.elementTabindex.length) {
                                    // @ts-ignore
                                    el_1.elementTabindex[0].focus && el_1.elementTabindex[0].focus(); //主要用于解决select 框 聚焦后边框线无法高亮
                                }
                                /* const timeid= setTimeout(() => {
                                    el.element[0].focus && el.element[0].focus()
                                    formStore.focusUid = nextUid; // 与钩子列表组件自带回车事件错开任务队列执行
                                    clearTimeout(timeid)
                                }) */
                                var timeid_1 = setTimeout(function () {
                                    el_1.element[0].select();
                                    clearTimeout(timeid_1);
                                });
                                el_1.element[0].focus && el_1.element[0].focus();
                                formStore.focusUid = nextUid; // 与钩子列表组件自带回车事件错开任务队列执行
                                return { value: false };
                            }
                        }
                    }
                };
                var this_1 = this;
                for (var i = 0; i < keys.length; i++) {
                    var state_1 = _loop_1(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            if (keyCode === KeydownEnum$1.up) {
                var _loop_2 = function (i) {
                    var index = keys.findIndex(function (item) { return item === formStore.focusUid; });
                    if (index > -1) {
                        var preIndex = index - 1;
                        var nextUid = keys[preIndex];
                        if (preIndex < 0) { /**  当到达第一个一个元素时，再次按上键将回到最后一个元素的焦点*/
                            preIndex = keys.length - 1;
                            nextUid = keys[preIndex];
                        }
                        var el_2 = formStore.elementList.get(nextUid);
                        if (el_2) {
                            var result = el_2.element instanceof HTMLCollection;
                            if (result && el_2.element.length) {
                                var selectDom = document.querySelector("." + formStore.focusUid);
                                if (selectDom) {
                                    var selectSelectionDom = selectDom.getElementsByClassName('ant-select-open');
                                    if (selectSelectionDom && selectSelectionDom.length) { // 当下拉框展开选项数据时，不拦截默认下拉回车选中行为,不跳转下一个元素
                                        e.preventDefault();
                                        return { value: false };
                                    }
                                }
                                if (el_2.elementTabindex && el_2.elementTabindex instanceof HTMLCollection && el_2.elementTabindex.length) {
                                    // @ts-ignore
                                    el_2.elementTabindex[0].focus && el_2.elementTabindex[0].focus(); //主要用于解决select 框 聚焦后边框线无法高亮
                                }
                                var timeid_2 = setTimeout(function () {
                                    el_2.element[0].select();
                                    clearTimeout(timeid_2);
                                });
                                el_2.element[0].focus && el_2.element[0].focus();
                                formStore.focusUid = nextUid;
                                return { value: void 0 };
                            }
                        }
                    }
                };
                for (var i = 0; i < keys.length; i++) {
                    var state_2 = _loop_2(i);
                    if (typeof state_2 === "object")
                        return state_2.value;
                }
            }
        }
    };
    HLForm.prototype.handleToggle = function (name, even) {
        var key = even.target.id || name;
        var group = this.state.groupEntity;
        group.map(function (item) {
            if (item.name === key) {
                item.isFolding = !item.isFolding;
            }
        });
        this.setState({
            groupEntity: group
        });
    };
    HLForm.prototype.getAbsPos = function (obj) {
        var x = obj.offsetLeft;
        var y = obj.offsetTop;
        while (obj = obj.offsetParent) {
            x += obj.offsetLeft;
            y += obj.offsetTop;
        }
        return { "x": x, "y": y };
    };
    HLForm.prototype.componentDidUpdate = function () {
        var el = document.querySelector("." + this.uid);
        if (el && this.props.controls.length !== this.controlsLen) {
            /** 主要解决当key值发生变化时，导致组件卸载掉回车事件，重新绑定，否则回车会出现失效
             * 如果在上层组件设置key 值，则需要重新设置回车值
            */
            this.controlsLen = this.props.controls.length;
            el.removeEventListener('keydown', this.handleKeyDown.bind(this));
            el.addEventListener('keydown', this.handleKeyDown.bind(this));
        }
    };
    /**
     * 栏目快捷导航
     *
     * @memberof HLForm
     */
    HLForm.prototype.handlePositioning = function (name) {
        var target = document.querySelector('div[data-tab=' + name + ']');
        var targetScroll = this.getAbsPos(target).y;
        window.scrollTo(0, targetScroll);
        var group = this.state.groupEntity;
        group.map(function (item) {
            if (item.name === name) {
                item.active = true;
            }
            else {
                item.active = false;
            }
        });
        this.setState({
            groupEntity: group,
            activeName: name
        });
    };
    HLForm.prototype.isFormHasError = function (getFieldsError) {
        var error = getFieldsError && getFieldsError();
        var has = false;
        for (var key in error) {
            if (error[key]) {
                has = true;
                break;
            }
        }
        return has;
    };
    HLForm.prototype.renderControl = function (control, key) {
        var _this = this;
        var form = this.props.form;
        var hasError = this.isFormHasError(form.getFieldsError);
        var error = form.getFieldError(control.iAntdProps.id);
        var styleSize = this.storeView.styleSize;
        if (control.iAntdProps.className) {
            control.iAntdProps.className = control.iAntdProps.className.replace(size[styleSize]['formItemLayOut'], '');
        }
        COMPONENT_TYPE.map(function (item) {
            if (control[item]) {
                control[item].size = styleSize;
                if (item === 'iFormWithSelect' && control[item].options && control[item].options.length >= 50 && !control[item].paging) { // 当下拉数据超过50项自动开启分页
                    control[item].paging = true;
                }
                /* 防止表单动态增加的字段在表单状态集合中不存在而报错 */
                if (_this.storeView.computedFormState.has(control.iAntdProps.name)) { // 判断表单字段是否在表单状态数据集合中存在
                    if (item === 'iFormWithRadioButton' && control.iFormWithRadioButton['radioGroup']) {
                        control.iFormWithRadioButton['radioGroup']['disabled'] = _this.storeView.computedFormState.get(control.iAntdProps.name).disabled;
                    }
                    else {
                        control[item]['disabled'] = _this.storeView.computedFormState.get(control.iAntdProps.name).disabled;
                    }
                }
            }
        });
        if (control.iAntdProps.className) {
            control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['table'].formItemLayOut, '').replace('table-error', '').replace('table-not-error', '').replace('hlform-table-row-height', '');
            control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['small'].formItemLayOut, '').replace('hlform-table-row-height', '');
            control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['default'].formItemLayOut, '').replace('form-item-default-error', '');
        }
        if (styleSize === 'table') {
            control.iAntdProps.className = (control.iAntdProps.className || '') + " " + size[styleSize].formItemLayOut + " " + (error ? 'table-error' : 'table-not-error') + " hlform-table-row-height"; /**  表单间距调小*/
            COMPONENT_TYPE.map(function (item) {
                if (control[item]) {
                    control[item].size = 'small';
                }
            });
        }
        else if (styleSize === 'small') {
            control.iAntdProps.className = (control.iAntdProps.className || '') + " " + size[styleSize].formItemLayOut + " hlform-table-row-height";
        }
        else {
            control.iAntdProps.className = (control.iAntdProps.className || '') + " " + size[styleSize].formItemLayOut + " " + (hasError ? '' : size[styleSize].formItemLayOut) + " " + (error ? 'form-item-default-error' : ''); /**  表单间距调小*/
        }
        var view = this.props.store.HLFormContainer.get(this.uid);
        var localview = this.props.store.HLFormLocalDataContainer.get(this.freezeUid);
        var viewModel = {
            store: this.props.store,
            uid: this.uid,
            viewModel: view,
            localViewModel: localview,
            freezeUid: this.freezeUid,
            decryptionFreezeUid: this.decryptionFreezeUid
        };
        if (this.props.onIgnoreError) {
            viewModel = {
                store: this.props.store,
                uid: this.uid,
                viewModel: view,
                localViewModel: localview,
                freezeUid: this.freezeUid,
                decryptionFreezeUid: this.decryptionFreezeUid,
                onIgnoreError: this.props.onIgnoreError
            };
        }
        if (control instanceof LabelWithInputModel) {
            return _super.prototype.createFormInput.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithInputNumberModel) {
            return _super.prototype.createFormInputNumber.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithSelectModel || control instanceof LabelWithHLSelectModel) {
            if (control instanceof LabelWithHLSelectModel && control.iFormWithSelect.autoQuery) {
                var view_1 = localview.selectView.get(control.iAntdProps.name);
                if (view_1 && view_1.currValue) {
                    var options = [];
                    var total = 0;
                    if (view_1.currValue.data.get(view_1.pageIndex.toString())) {
                        options = view_1.currValue.data.get(view_1.pageIndex.toString());
                        total = view_1.currValue.total;
                    }
                    control.iFormWithSelect.options = options;
                    control.iFormWithSelect.total = total;
                }
            }
            return _super.prototype.createFormSelect.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithRenderModel) {
            return _super.prototype.createFormRender.call(this, key, control, form, viewModel);
        }
        else if (control instanceof LabelWithDatePickerModel) {
            return _super.prototype.createFormDatePicker.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithMonthPickerModel) {
            return _super.prototype.createFormMonthPicker.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithRangePickerModel) {
            return _super.prototype.createFormRangePicker.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithUploadModel) {
            return _super.prototype.createFormUpload.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithSwitchModel) {
            return _super.prototype.createFormSwitch.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithRadioButtonModel) {
            return _super.prototype.createFormRadioButton.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithTextModel) {
            return _super.prototype.createFormText.call(this, key, control, form, this.uid, viewModel);
        }
        else if (control instanceof LabelWithCheckboxModel) {
            return _super.prototype.createFormCheckbox.call(this, key, control, form, this.uid, viewModel);
        }
        else {
            throw new Error("ComponentClass: Unknown control. control = " + JSON.stringify(control));
        }
    };
    HLForm.prototype.renderControls = function (controls) {
        var _this = this;
        var colCount = this.props.colCount || 2;
        var form = this.props.form;
        var newcontrols = controls;
        if (this.storeLocalView.computedControlsSort.length) {
            newcontrols = [];
            this.storeLocalView.computedControlsSort.map(function (item) {
                var model = controls.find(function (m) { return m.iAntdProps.name === item; });
                if (model) {
                    newcontrols.push(model);
                }
            });
        }
        var rendercontrols = newcontrols.map(function (controls, key) {
            var span = controls.iAntdProps.span || (24 / colCount);
            var name = controls.iAntdProps.name;
            var keys = "col" + name;
            var formItemState = _this.getFormItemState(name);
            var visible = true;
            var display = true;
            if (formItemState) {
                if (formItemState.visible === false) {
                    visible = formItemState.visible;
                }
                if (formItemState.display === false) {
                    display = false;
                }
            }
            return ((visible) ? React.createElement(Col, { span: span, "data-id": name, key: "col" + keys, style: { display: "" + (display ? 'block' : 'none') } }, _this.renderControl(controls, "col" + keys)) : null);
        });
        return (this.storeLocalView.dragSortState ? React.createElement(LegionsProDragger, { options: {
                animation: 150,
                group: {
                    name: 'query',
                    pull: true,
                    put: true,
                }
            }, style: { width: '100%', display: 'contents' }, onChange: function (items, sort, evt) {
                _this.storeLocalView.updateControlsSort(items);
            } }, rendercontrols) : rendercontrols);
    };
    HLForm.prototype.renderGroup = function () {
        var _this = this;
        var group = this.props.group;
        var controls = this.props.controls;
        /* const controls = this.storeView.controls; */
        //@ts-ignore
        var groupComponent = group.map(function (item, index) {
            var groupFormItem = controls.filter(function (entity) { return entity.iAntdProps.groupId === item.id; });
            if (groupFormItem && groupFormItem.length) {
                var entity = _this.state.groupEntity.find(function (entity) { return entity.name === item.name; });
                return (React.createElement(Row, { className: !entity.isFolding ? "group toggle" : "group", key: index },
                    React.createElement("div", { className: "title " + (item.className || ''), "data-id": "form-floor", "data-tab": item.name },
                        React.createElement("span", { className: "span-left" }, item.name),
                        React.createElement("span", { className: "span-right" },
                            entity.isShowFormSizeIcon && React.createElement(Dropdown, { overlay: (React.createElement(Menu, { selectedKeys: [_this.storeView.styleSize], onClick: function (item) {
                                        var size = item.key;
                                        _this.storeView.updateStyleSize(size);
                                        _this.props.onUpdateStyleSize && _this.props.onUpdateStyleSize(size);
                                    } },
                                    React.createElement(Menu.Item, { key: "default" },
                                        React.createElement("span", null, "\u8212\u9002\u578B")),
                                    React.createElement(Menu.Item, { key: "small" },
                                        React.createElement("span", null, "\u8FF7\u4F60\u578B")),
                                    React.createElement(Menu.Item, { key: "table" },
                                        React.createElement("span", null, "\u7D27\u51D1\u578B")))), placement: "bottomCenter" },
                                React.createElement(Icon, { style: { fontSize: '16px' }, type: "bars" })),
                            !entity.isFolding ? React.createElement(Icon, { type: "plus", style: { fontSize: '16px' }, onClick: _this.handleToggle.bind(_this, item.name) }) : React.createElement(Icon, { type: "minus", style: { fontSize: '17px' }, onClick: _this.handleToggle.bind(_this, item.name) }))),
                    React.createElement("div", { className: !entity.isFolding ? "form-content hide" : "form-content" },
                        React.createElement(Row, { type: "flex" }, _this.renderControls(groupFormItem)))));
            }
        });
        return (React.createElement(Row, { className: "container" },
            React.createElement("div", { className: "left", style: { width: (this.state.groupEntity.length > 5 ? 87 : 100) + "%" } }, groupComponent),
            this.state.groupEntity.length > 6 && React.createElement("div", { className: "right" },
                React.createElement(Affix, null,
                    React.createElement("ul", null, this.state.groupEntity.map(function (entity, index) {
                        if (entity.active) {
                            return React.createElement("li", { key: index },
                                entity.active && React.createElement("img", { src: 'https://gitee.com/duanguang/figure-bed/raw/master/oss/u586.png' }),
                                React.createElement("span", { style: { paddingLeft: "10px", color: "rgb(39, 140, 222)" }, onClick: _this.handlePositioning.bind(_this, entity.name) }, entity.name));
                        }
                        return React.createElement("li", { key: index },
                            React.createElement("span", { style: { paddingLeft: "20px" }, onClick: _this.handlePositioning.bind(_this, entity.name) }, entity.name));
                    }))))));
    };
    HLForm.prototype.renderForm = function () {
        var group = this.props.group;
        var controls = this.props.controls;
        if (group && group instanceof Array && group.length) {
            return this.renderGroup();
        }
        return React.createElement(Row, { type: "flex" }, this.renderControls(controls));
    };
    HLForm.prototype.render = function () {
        var getFieldDecorator = this.props.form.getFieldDecorator;
        return (React.createElement(Form, { className: baseCls + " " + this.uid }, this.renderForm()));
    };
    HLForm.defaultProps = {
        size: 'default',
        isDragSort: false,
    };
    HLForm = __decorate([
        bind({ store: ProFormStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], HLForm);
    return HLForm;
}(CreateForm));
var debounceOnFieldsChange = debounce(function (props, changedFields) {
    props.onFieldsChange && props.onFieldsChange(props, changedFields);
}, 200);
var CustomizedForm = Form.create({
    mapPropsToFields: function (props) {
        return props.mapPropsToFields(props);
    },
    onFieldsChange: function (props, changedFields) {
        return props.onFieldsChange(props, changedFields);
        /* return debounceOnFieldsChange(props,changedFields) */
    },
    onValuesChange: function (props, values) {
        props.onValuesChange && props.onValuesChange(props, values);
    }
})(HLForm);
/* export const HLFormContainer = (props: IHLFormProps) => {
    return <CustomizedForm {...props} />
} */
function LegionsProForm(props) {
    return React.createElement(CustomizedForm, __assign({}, props));
}
LegionsProForm.CreateForm = CreateForm;
LegionsProForm.ProFormUtils = ProFormUtils;
LegionsProForm.LabelWithInputNumberModel = LabelWithInputNumberModel;
LegionsProForm.LabelWithSelectModel = LabelWithSelectModel;
LegionsProForm.LabelWithHLSelectModel = LabelWithHLSelectModel;
LegionsProForm.LabelWithRenderModel = LabelWithRenderModel;
LegionsProForm.LabelWithDatePickerModel = LabelWithDatePickerModel;
LegionsProForm.LabelWithMonthPickerModel = LabelWithMonthPickerModel;
LegionsProForm.LabelWithRangePickerModel = LabelWithRangePickerModel;
LegionsProForm.LabelWithUploadModel = LabelWithUploadModel;
LegionsProForm.LabelWithSwitchModel = LabelWithSwitchModel;
LegionsProForm.LabelWithRadioButtonModel = LabelWithRadioButtonModel;
LegionsProForm.LabelWithTextModel = LabelWithTextModel;
/* @bind({ store: HLFormStore })
@observer
export class HLFormContainer<mapProps = {}> extends React.Component<IHLFormProps<mapProps>>{
    timer = null
    timeId = new Date().getTime()
    uid = ''
    constructor(props) {
        super(props)
        this.uid = `form${this.props.store.HLFormContainer.size}${shortHash(`${this.timeId}${this.props.store.HLFormContainer.size}`)}`
    }
    @computed get storeView() {
        return this.props.store.HLFormContainer.get(this.uid)
    }
    render() {
        const formEntity = { uid: this.uid }
        let InputDataModel = {}
        if (this.storeView&&this.storeView.InputDataModel) {
            InputDataModel = this.storeView.InputDataModel
        }
        return <CustomizedForm {...this.props} {...formEntity} />
    }
} */

export default LegionsProForm;
