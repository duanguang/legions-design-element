/**
  *  legions-pro-design v0.0.7-beta.10
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import { Tooltip, Input, Row, Form, Icon, message, DatePicker, Select, InputNumber, Switch, Radio, Checkbox, Anchor, Col, Dropdown, Menu, Affix } from 'antd';
import { getStringLen } from 'legions-utils-tool/format.string';
import { shortHash } from 'legions-lunar/object-hash';
import { bind, observer } from 'legions/store-react';
import { findDOMNode } from 'react-dom';
import LegionsStoreForm from '../LegionsStoreForm';
import LegionsProErrorReportShow from '../LegionsProErrorReportShow';
import classNames from 'classnames';
import LegionsProUpload from '../LegionsProUpload';
import LegionsProSelect from '../LegionsProSelect';
import { off, on } from 'legions-utils-tool/dom';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import './style/index.less';
import { debounce } from 'legions-utils-tool/debounce';
import { toJS, runInAction } from 'mobx';
import LegionsProDragger from '../LegionsProDragger';
import { BaseFormFields, HlLabeledValue } from 'legions-lunar/model';
import { LoggerManager } from 'legions-lunar/legion.plugin.sdk';
import { getInjector } from 'legions/store';
import { createFormRule } from 'legions-decorator/async.validator';

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
    AbstractForm.prototype.didMountClearNodeQueue = function (formref, uid, eleId) {
        if (formref) {
            var viewStore = formref.store.get(uid);
            if (viewStore.renderNodeQueue.has(eleId)) {
                viewStore.renderNodeQueue.delete(eleId);
            }
        }
    };
    AbstractForm.prototype.isShouldComponentUpdate = function (formref, uid, eleId) {
        if (formref) {
            var viewStore = formref.store.get(uid);
            if (viewStore.renderNodeQueue.has(eleId)) {
                viewStore.renderNodeQueue.delete(eleId);
                return true;
            }
        }
        return false;
    };
    return AbstractForm;
}(Component));

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

var LabelWithSelectModel = /** @class */ (function () {
    function LabelWithSelectModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
        this.rules = rules;
    }
    return LabelWithSelectModel;
}());

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
var selectionSingleClass = 'ant-select-selection--single';
var selectionMultipleClass = 'ant-select-selection--multiple';
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
                    var selectSelectionMultipleDom = _this.querySelectDom(selectionMultipleClass);
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
        if (type === void 0) { type = selectionSingleClass; }
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
        if (this.querySelectDom(selectionMultipleClass) || this.querySelectDom()) {
            if (!this.onLoadingKeyDown) {
                this.onLoadingKeyDown = this.onkeyDownProxy();
            }
            this.onLoadingKeyDown();
        }
    };
    FormElement.prototype.componentDidUpdate = function () {
        this.addElement();
        /**  只对下拉框键盘事件进行代理*/
        if (this.querySelectDom(selectionMultipleClass) || this.querySelectDom()) {
            this.onLoadingKeyDown();
        }
    };
    FormElement.prototype.componentWillUnmount = function () {
        var formStore = this.props.store.get(this.props.formUid);
        if (formStore) {
            formStore._elementList.delete(this.uid);
        }
        var selectSelectionDom = this.querySelectDom();
        if (selectSelectionDom) {
            selectSelectionDom.removeEventListener('keydown', this.onKeyDownSelect.bind(this));
        }
        var selectSelectionMultipleDom = this.querySelectDom(selectionMultipleClass);
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
                if (this.formStore) {
                    var controls = this.formStore.computedFormFields.find(function (item) { return item.iAntdProps.name === _this.props.elementKey; });
                    if (controls && controls instanceof LabelWithSelectModel) {
                        controls.iFormProps.options || [];
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
                if (this.formStore) {
                    var controls = this.formStore.computedFormFields.find(function (item) { return item.iAntdProps.name === _this.props.elementKey; });
                    if (controls && controls instanceof LabelWithSelectModel) {
                        controls.iFormProps.options || [];
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
            formStore._addAllElementKeys(this.props.elementKey);
            if (!formStore._elementList.has(this.uid)) {
                var el = document.querySelector("." + this.uid);
                if (el && this.props.elType) {
                    var elChildren = el.getElementsByTagName(this.props.elType);
                    var elementTabindex = null;
                    var antSSelectSelection = el.getElementsByClassName(selectionSingleClass);
                    if (antSSelectSelection && antSSelectSelection instanceof HTMLCollection && antSSelectSelection.length) {
                        if (findDOMNode(antSSelectSelection[0]).getAttribute('tabindex') !== null) { // 如果下拉列表自身设置了获取焦点方法，则抓取元素用于获取焦点
                            // @ts-ignore
                            elementTabindex = antSSelectSelection;
                        }
                    }
                    // @ts-ignore
                    if (elChildren && el && elChildren instanceof HTMLCollection && elChildren.length && !elChildren[0].disabled) {
                        formStore._elementList.set(this.uid, {
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
        bind({ store: LegionsStoreForm }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], FormElement);
    return FormElement;
}(React.Component));

var FormItem = Form.Item;
var TextArea = Input.TextArea;
var LabelWithInputModel = /** @class */ (function () {
    function LabelWithInputModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
        this.rules = rules;
    }
    return LabelWithInputModel;
}());
var TooltipInput = /** @class */ (function (_super) {
    __extends(TooltipInput, _super);
    function TooltipInput(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(TooltipInput.prototype, "store", {
        get: function () {
            if (this.props.FormInputRef && this.props.formUid) {
                return this.props.FormInputRef.store.get(this.props.formUid);
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
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
    /* onChanges = debounce((even,value) => {
        // @ts-ignore
        this.props.onChange && this.props.onChange(value);
    },200); */
    TooltipInput.prototype.handleOnChange = function (even) {
        var value = even.target.value;
        this.props.onChange && this.props.onChange(even);
        //@ts-ignore
        /* this.onChanges(even,value); */
    };
    TooltipInput.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, form = _b.form, name = _b.name, valueLen = _b.valueLen, FormInputRef = _b.FormInputRef, inputType = _b.inputType, type = _b.type, formUid = _b.formUid, formItemName = _b.formItemName, onIgnoreError = _b.onIgnoreError, props = __rest(_b, ["form", "name", "valueLen", "FormInputRef", "inputType", "type", "formUid", "formItemName", "onIgnoreError"]);
        var isShowErrorView = false;
        if (FormInputRef && this.props.formUid) {
            var viewStore = FormInputRef.store.get(this.props.formUid);
            if (viewStore.computedErrorReactNodeList.has(this.props.formItemName)) {
                var uid = viewStore.computedErrorReactNodeList.get(this.props.formItemName).uid;
                isShowErrorView = viewStore._errorListView.has(uid);
            }
        }
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError, setFieldsValue = form.setFieldsValue;
        var iconStyle = {};
        isShowErrorView && (iconStyle = { marginRight: '18px' });
        var theProps = __assign({}, props);
        theProps.onChange = this.handleOnChange.bind(this);
        var maxlen = parseInt(this.props.maxLength);
        return (React.createElement(LegionsProErrorReportShow, { code: this.props.formItemName, formUid: this.props.formUid, onIgnoreError: this.props.onIgnoreError, errorClassName: classNames((_a = {},
                _a["tip-icon-input"] = true,
                _a["tip-icon-right-0"] = (this.props.value && !this.props.disabled) ? true : false,
                _a)) }, this.props.inputType === 'number' ? React.createElement(LegionsProNumericInput, __assign({}, theProps)) : React.createElement(Tooltip
        /* trigger={'click'} */
        , { 
            /* trigger={'click'} */
            mouseEnterDelay: 1, title: valueLen >= maxlen - 10 ? this.props.value : '', placement: "topLeft", overlayStyle: { wordWrap: 'break-word' } },
            React.createElement(Input, __assign({}, theProps, { type: type, suffix: (React.createElement("div", null, (this.props.value && !this.props.disabled) && React.createElement(Icon, { style: iconStyle, type: "close-circle", onClick: function () {
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
    FormInput.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormInputRef, this.props.formUid, this.props.iAntdProps.name);
    };
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
        if (this.props.form && this.store && this.store.computedFormSize === 'table') {
            var error = this.props.form.getFieldError(this.props.iAntdProps.name);
            error && message.error(error, 5);
        }
        this.props.iFormInput.onBlur && this.props.iFormInput.onBlur(even);
    };
    FormInput.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormInputRef, this.props.formUid, nextProps.iAntdProps.name);
    };
    FormInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormInput = _a.iFormInput, children = _a.children, rules = _a.rules;
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError, setFieldsValue = form.setFieldsValue;
        var disabled = iFormInput && iFormInput.disabled;
        var addonAfter = iFormInput && iFormInput.addonAfter;
        var addonBefore = iFormInput && iFormInput.addonBefore;
        var label = iFormInput.label, labelCol = iFormInput.labelCol, wrapperCol = iFormInput.wrapperCol, visible = iFormInput.visible, display = iFormInput.display, render = iFormInput.render, colon = iFormInput.colon, props = __rest(iFormInput, ["label", "labelCol", "wrapperCol", "visible", "display", "render", "colon"]);
        var valueLen = getStringLen(form.getFieldValue(iAntdProps.name));
        var maxLength = iFormInput.maxLength ? parseInt(iFormInput.maxLength) : 50;
        var placeholder = iAntdProps.placeholder || '';
        var formItemProps = {};
        if (colon) {
            formItemProps['colon'] = colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormInputRef = value;
            }, key: "FormElement" + iAntdProps.name, elType: iFormInput.type === 'textarea' ? 'textarea' : 'input', elementKey: iAntdProps.name, nextElementKey: iAntdProps.nextElementKey, formUid: this.props.formUid },
            React.createElement(FormItem, __assign({}, formItemProps, { extra: iFormInput.extra, className: iAntdProps.className, label: iFormInput.label, labelCol: iFormInput.labelCol, wrapperCol: iFormInput.wrapperCol }),
                getFieldDecorator(iAntdProps.name, {
                    rules: rules,
                    normalize: function (value, prevValue, allValues) {
                        return value && value.toString();
                    },
                })(iFormInput.type === 'textarea' ?
                    // @ts-ignore
                    React.createElement(TextArea, __assign({}, props, { key: iAntdProps.name, autosize: iFormInput.autosize === void 0 ? { minRows: 1, maxRows: 2 } : iFormInput.autosize, onPressEnter: this.onPressEnter.bind(this), title: form.getFieldValue(iAntdProps.name), onFocus: this.onFocus.bind(this), maxLength: iFormInput.maxLength ? parseInt(iFormInput.maxLength) : 200, placeholder: iFormInput.disabled ? '' : placeholder })) :
                    React.createElement(TooltipInput, __assign({}, props, { onIgnoreError: this.props.formStore && this.props.formStore.onIgnoreError, formUid: this.props.formUid, FormInputRef: this.FormInputRef, maxLength: maxLength.toString(), valueLen: valueLen, formItemName: iAntdProps.name, form: form, key: iAntdProps.name, inputType: iFormInput.type, onPressEnter: this.onPressEnter.bind(this), disabled: disabled, placeholder: iFormInput.disabled ? '' : placeholder, onFocus: this.onFocus.bind(this), onChange: this.onChange.bind(this), addonAfter: addonAfter, onBlur: this.onBlur.bind(this), addonBefore: addonBefore }))),
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
    function LabelWithRenderModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
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
    function LabelWithDatePickerModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
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
    FormDatePicker.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormDatePickerRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormDatePicker.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormDatePickerRef, this.props.formUid, nextProps.iAntdProps.name);
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
    function LabelWithMonthPickerModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
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
    FormMonthPicker.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormMonthPickerRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormMonthPicker.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormMonthPickerRef, this.props.formUid, nextProps.iAntdProps.name);
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
    function LabelWithRangePickerModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
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
    FormRangePicker.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormRangePickerRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormRangePicker.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormRangePickerRef, this.props.formUid, nextProps.iAntdProps.name);
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
    function LabelWithUploadModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
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
    FormUpload.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormUploadRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormUpload.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormUploadRef, this.props.formUid, nextProps.iAntdProps.name);
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
                isShowErrorView = viewStore._errorListView.has(uid);
            }
        }
        return (React.createElement(LegionsProErrorReportShow, { formUid: this.props.formUid, code: this.props.formItemName, errorClassName: 'tip-icon', onIgnoreError: this.props.onIgnoreError, className: isShowErrorView ? 'errorView' : '' },
            React.createElement(LegionsProSelect, __assign({ style: { width: '100%' }, placeholder: this.props.placeholder }, props))));
    };
    return HLSelectWrapError;
}(React.Component));
var FormSelect = /** @class */ (function (_super) {
    __extends(FormSelect, _super);
    function FormSelect(props) {
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
    FormSelect.prototype.translabelInValue = function (value, options) {
        if (options === void 0) { options = this.props.iFormWithSelect.options; }
        return LegionsProSelect.transformlabelInValue(value, 
        //@ts-ignore
        this.props.iFormWithSelect, options);
    };
    FormSelect.prototype.componentDidMount = function () {
        this.bindCopyKeydown();
        this.didMountClearNodeQueue(this.FormHLSelectRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormSelect.prototype.componentWillUnmount = function () {
        var el = document.querySelector("." + this.FormHLSelectRef.uid);
        if (el) {
            var selectDom = el.querySelector(".ant-select-selection--single");
            if (selectDom) {
                off(selectDom, 'keydown', this.handleCopyKeydown.bind(this));
            }
        }
    };
    FormSelect.prototype.bindCopyKeydown = function () {
        var el = document.querySelector("." + this.FormHLSelectRef.uid);
        if (el) {
            var selectDom = el.querySelector(".ant-select-selection--single");
            if (selectDom) {
                on(selectDom, 'keydown', this.handleCopyKeydown.bind(this));
            }
        }
    };
    FormSelect.prototype.handleCopyKeydown = function (event) {
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
    FormSelect.prototype.onFocus = function () {
        var store = this.FormHLSelectRef.store.get(this.props.formUid);
        if (store) {
            store.focusUid = this.FormHLSelectRef.uid;
            if (store.enableEnterSwitch && (this.props.iFormWithSelect.mode === 'default' || this.props.iFormWithSelect.mode === void 0)) {
                this.setState({ styleClassFocus: 'legions-pro-select-focus' });
            }
        }
        var el = document.querySelector("." + this.FormHLSelectRef.uid);
        if (el && this.props.iFormWithSelect.mode === 'combobox') { // 只能做到对combobox类型聚点，全选文字，下拉多选，tag及普通模式由于实现方式不同，所以暂时做不到
            var inputSelect = el.getElementsByTagName('input');
            if (inputSelect && inputSelect.length) {
                inputSelect[0].select();
            }
        }
        this.props.iFormWithSelect && this.props.iFormWithSelect.onFocus && this.props.iFormWithSelect.onFocus();
    };
    FormSelect.prototype.onBlur = function () {
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
    FormSelect.prototype.onSelect = function (value, option) {
        this.props.iFormWithSelect && this.props.iFormWithSelect.onSelect && this.props.iFormWithSelect.onSelect(value, option);
    };
    FormSelect.prototype.onSearch = function (value) {
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
    FormSelect.prototype.onChange = function (even) {
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
    FormSelect.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormHLSelectRef, this.props.formUid, nextProps.iAntdProps.name);
    };
    FormSelect.prototype.render = function () {
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
    return FormSelect;
}(AbstractForm));

var FormItem$6 = Form.Item;
var LabelWithInputNumberModel = /** @class */ (function () {
    function LabelWithInputNumberModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
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
    FormInputNumber.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormInputNumberRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormInputNumber.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormInputNumberRef, this.props.formUid, nextProps.iAntdProps.name);
    };
    FormInputNumber.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormInput = _a.iFormInput, children = _a.children, rules = _a.rules;
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError;
        var label = iFormInput.label, labelCol = iFormInput.labelCol, wrapperCol = iFormInput.wrapperCol, visible = iFormInput.visible, render = iFormInput.render, props = __rest(iFormInput, ["label", "labelCol", "wrapperCol", "visible", "render"]);
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
    function LabelWithSwitchModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
        this.rules = rules;
    }
    return LabelWithSwitchModel;
}());
var FormSwitch = /** @class */ (function (_super) {
    __extends(FormSwitch, _super);
    function FormSwitch(props) {
        var _this = _super.call(this, props) || this;
        _this.FormSwitchRef = null;
        _this.state = {};
        return _this;
    }
    FormSwitch.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormSwitchRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormSwitch.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormSwitchRef, this.props.formUid, nextProps.iAntdProps.name);
    };
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
                _this.FormSwitchRef = value;
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
    function LabelWithRadioButtonModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
        this.rules = rules;
    }
    return LabelWithRadioButtonModel;
}());
var FormRadioButton = /** @class */ (function (_super) {
    __extends(FormRadioButton, _super);
    function FormRadioButton(props) {
        var _this = _super.call(this, props) || this;
        _this.FormRadioButtonRef = null;
        _this.state = {};
        return _this;
    }
    FormRadioButton.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormRadioButtonRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormRadioButton.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormRadioButtonRef, this.props.formUid, nextProps.iAntdProps.name);
    };
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
                _this.FormRadioButtonRef = value;
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
    function LabelWithTextModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
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
        if (FormTextRef && this.props.formUid) {
            var viewStore = FormTextRef.store.get(this.props.formUid);
            if (viewStore.computedErrorReactNodeList.has(this.props.formItemName)) {
                var uid = viewStore.computedErrorReactNodeList.get(this.props.formItemName).uid;
                viewStore._errorListView.has(uid);
            }
        }
        return (React.createElement(LegionsProErrorReportShow, { code: this.props.formItemName, formUid: this.props.formUid, errorClassName: classNames((_a = {},
                _a["tip-icon-input"] = true,
                _a["tip-icon-right-0"] = (this.props.value) ? true : false,
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
    FormText.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormTextRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormText.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormTextRef, this.props.formUid, nextProps.iAntdProps.name);
    };
    FormText.prototype.render = function () {
        var _this = this;
        var _a = this.props, form = _a.form, iAntdProps = _a.iAntdProps, iFormText = _a.iFormText, children = _a.children, rules = _a.rules;
        var getFieldDecorator = form.getFieldDecorator, getFieldsError = form.getFieldsError, setFieldsValue = form.setFieldsValue;
        var label = iFormText.label, labelCol = iFormText.labelCol, wrapperCol = iFormText.wrapperCol, visible = iFormText.visible, display = iFormText.display, colon = iFormText.colon, props = __rest(iFormText, ["label", "labelCol", "wrapperCol", "visible", "display", "colon"]);
        var formItemProps = {};
        if (colon) {
            formItemProps['colon'] = colon;
        }
        return (React.createElement(FormElement, { form: form, onReady: function (value) {
                _this.FormTextRef = value;
            }, nextElementKey: iAntdProps.nextElementKey, elementKey: iAntdProps.name, formUid: this.props.formUid },
            React.createElement(FormItem$9, __assign({}, formItemProps, { extra: iFormText.extra, className: iAntdProps.className, label: iFormText.label, labelCol: iFormText.labelCol, wrapperCol: iFormText.wrapperCol }),
                getFieldDecorator(iAntdProps.name, {
                    rules: rules,
                    normalize: function (value, prevValue, allValues) {
                        return value && value.toString();
                    },
                })(
                //@ts-ignore
                React.createElement(TooltipText, __assign({}, props, { formUid: this.props.formUid, FormTextRef: this.FormTextRef, formItemName: iAntdProps.name, form: form, inputType: 'span' }))),
                children)));
    };
    return FormText;
}(AbstractForm));

var FormItem$a = Form.Item;
var LabelWithCheckboxModel = /** @class */ (function () {
    function LabelWithCheckboxModel(iAntdProps, iFormProps, rules) {
        this.iAntdProps = iAntdProps;
        this.iFormProps = iFormProps;
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
    FormCheckbox.prototype.componentDidMount = function () {
        this.didMountClearNodeQueue(this.FormCheckboxRef, this.props.formUid, this.props.iAntdProps.name);
    };
    FormCheckbox.prototype.shouldComponentUpdate = function (nextProps, nextState, context) {
        return this.isShouldComponentUpdate(this.FormCheckboxRef, this.props.formUid, nextProps.iAntdProps.name);
    };
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
        var iAntdProps = control.iAntdProps, iFormProps = control.iFormProps, rules = control.rules;
        return (React.createElement(FormInput, { iAntdProps: iAntdProps, form: form, key: key, rules: rules, formUid: formUid, formStore: formRef, iFormInput: iFormProps }));
    };
    CreateForm.prototype.createFormInputNumber = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, iFormProps = control.iFormProps, rules = control.rules;
        return (React.createElement(FormInputNumber, { iAntdProps: iAntdProps, form: form, key: key, rules: rules, formUid: formUid, iFormInput: iFormProps }));
    };
    CreateForm.prototype.createFormSelect = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormSelect, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formStore: formRef, formUid: formUid, iFormWithSelect: iFormProps }));
    };
    CreateForm.prototype.createFormRender = function (key, control, form, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormRender, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formRef: formRef, iFormRender: iFormProps }));
    };
    CreateForm.prototype.createFormDatePicker = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormDatePicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormDatePicker: iFormProps }));
    };
    CreateForm.prototype.createFormMonthPicker = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormMonthPicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormMonthPicker: iFormProps }));
    };
    CreateForm.prototype.createFormRangePicker = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormRangePicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormRangePicker: iFormProps }));
    };
    CreateForm.prototype.createFormUpload = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormUpload, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithUpload: iFormProps }));
    };
    CreateForm.prototype.createFormSwitch = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormSwitch, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithSwitch: iFormProps }));
    };
    CreateForm.prototype.createFormRadioButton = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormRadioButton, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithRadioButton: iFormProps }));
    };
    CreateForm.prototype.createFormText = function (key, control, form, formUid, formRef) {
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormText, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormText: iFormProps }));
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
        var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
        return (React.createElement(FormCheckbox, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithCheckbox: iFormProps }));
    };
    return CreateForm;
}(React.Component));

var size = {
    'default': {
        formItemLayOut: 'form-item-default',
    }, 'small': {
        formItemLayOut: 'form-item-small',
    }, 'table': {
        formItemLayOut: 'form-item-table',
    }
};
var formClasses = {
    itemRowHeight: "form-item-row-height",
    tableError: 'table-error',
    tableNotEror: 'table-not-error',
    itemDefaultError: 'form-item-default-error',
};
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
    ProFormUtils.isFormHasError = function (getFieldsError) {
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
    ProFormUtils.prototype.initFromState = function (key, formRef, iFormItemProps) {
        if (formRef && key) {
            var storeView = formRef.store.get(formRef.uid);
            storeView._initFormItemField(key, iFormItemProps, 'custom');
        }
    };
    ProFormUtils.prototype.renderSelectConfig = function (options) {
        this.chkRenderConfig(options.iAntdProps.id);
        this[options.iAntdProps.id] = new LabelWithSelectModel(options.iAntdProps, options.iFormProps, options.rules || []);
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
     * @param {(IRenderComponentParams<IFormUploadProps>)} options
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
    ProFormUtils.prototype.createFormComponent = function (controls, form, formUid, formRef, key) {
        var control = controls;
        if (key === void 0) {
            key = control.iAntdProps.id;
        }
        this.initFromState(control.iAntdProps.id, formRef, controls);
        if (formRef) {
            var storeView = formRef.store.get(formRef.uid);
            var item = storeView.getFormItemField(control.iAntdProps.id);
            if (item) {
                control = item.value;
            }
            var formSize = storeView.computedFormSize;
            var hasError = ProFormUtils.isFormHasError(form.getFieldsError);
            var error = form.getFieldError(control.iAntdProps.id);
            control['iFormProps']['size'] = formSize;
            if (control.iAntdProps.className) {
                control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['table'].formItemLayOut, '').replace(formClasses.tableError, '').replace(formClasses.tableNotEror, '').replace(formClasses.itemRowHeight, '');
                control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['small'].formItemLayOut, '').replace(formClasses.itemRowHeight, '');
                control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['default'].formItemLayOut, '').replace(formClasses.itemDefaultError, '');
            }
            if (formSize === 'table') {
                control.iAntdProps.className = (control.iAntdProps.className || '') + " " + size[formSize].formItemLayOut + " " + (error ? formClasses.tableError : formClasses.tableNotEror) + " " + formClasses.itemRowHeight; /**  表单间距调小*/
                control['iFormProps']['size'] = 'small';
            }
            else if (formSize === 'small') {
                control.iAntdProps.className = (control.iAntdProps.className || '') + " " + size[formSize].formItemLayOut + " " + formClasses.itemRowHeight;
            }
            else {
                control.iAntdProps.className = (control.iAntdProps.className || '') + " " + size[formSize].formItemLayOut + " " + (hasError ? '' : size[formSize].formItemLayOut) + " " + (error ? formClasses.itemDefaultError : ''); /**  表单间距调小*/
            }
        }
        /* console.log(control,'controlcus'); */
        if (control.iFormProps.visible === false) {
            return null;
        }
        if (control instanceof LabelWithInputModel) {
            var iAntdProps = control.iAntdProps, iFormProps = control.iFormProps, rules = control.rules;
            return (React.createElement(FormInput, { iAntdProps: iAntdProps, form: form, key: key, rules: rules, formUid: formUid, formStore: formRef, iFormInput: iFormProps }));
        }
        else if (control instanceof LabelWithInputNumberModel) {
            var iAntdProps = control.iAntdProps, iFormProps = control.iFormProps, rules = control.rules;
            return (React.createElement(FormInputNumber, { iAntdProps: iAntdProps, form: form, key: key, rules: rules, formUid: formUid, iFormInput: iFormProps }));
        }
        else if (control instanceof LabelWithSelectModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
            return (React.createElement(FormSelect, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formStore: formRef, formUid: formUid, iFormWithSelect: iFormProps }));
        }
        else if (control instanceof LabelWithDatePickerModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
            return (React.createElement(FormDatePicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormDatePicker: iFormProps }));
        }
        else if (control instanceof LabelWithMonthPickerModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
            return (React.createElement(FormMonthPicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormMonthPicker: iFormProps }));
        }
        else if (control instanceof LabelWithRangePickerModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
            return (React.createElement(FormRangePicker, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormRangePicker: iFormProps }));
        }
        else if (control instanceof LabelWithUploadModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
            return (React.createElement(FormUpload, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithUpload: iFormProps }));
        }
        else if (control instanceof LabelWithSwitchModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
            return (React.createElement(FormSwitch, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithSwitch: iFormProps }));
        }
        else if (control instanceof LabelWithRadioButtonModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
            return (React.createElement(FormRadioButton, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormWithRadioButton: iFormProps }));
        }
        else if (control instanceof LabelWithTextModel) {
            var iAntdProps = control.iAntdProps, rules = control.rules, iFormProps = control.iFormProps;
            return (React.createElement(FormText, { iAntdProps: iAntdProps, form: form, rules: rules, key: key, formUid: formUid, iFormText: iFormProps }));
        }
        else {
            throw new Error("HLFormUtils: Unknown control. control = " + JSON.stringify(control));
        }
    };
    ProFormUtils.LabelWithInputNumberModel = LabelWithInputNumberModel;
    ProFormUtils.LabelWithHLSelectModel = LabelWithSelectModel;
    ProFormUtils.LabelWithRenderModel = LabelWithRenderModel;
    ProFormUtils.LabelWithDatePickerModel = LabelWithDatePickerModel;
    ProFormUtils.LabelWithMonthPickerModel = LabelWithMonthPickerModel;
    ProFormUtils.LabelWithRangePickerModel = LabelWithRangePickerModel;
    ProFormUtils.LabelWithUploadModel = LabelWithUploadModel;
    ProFormUtils.LabelWithSwitchModel = LabelWithSwitchModel;
    ProFormUtils.LabelWithRadioButtonModel = LabelWithRadioButtonModel;
    ProFormUtils.LabelWithTextModel = LabelWithTextModel;
    ProFormUtils.LabelWithInputModel = LabelWithInputModel;
    return ProFormUtils;
}());
var ProFormFields = /** @class */ (function (_super) {
    __extends(ProFormFields, _super);
    function ProFormFields() {
        return _super.call(this) || this;
    }
    /** 初始化表单规则 */
    ProFormFields.initFormRules = function (FormFields, props) {
        //@ts-ignore
        return createFormRule(FormFields, new FormFields(), { props: props });
    };
    return ProFormFields;
}(BaseFormFields));

var Link = Anchor.Link;
var FormItem$b = Form.Item;
var baseCls = "legions-pro-form";
var KeydownEnum$1;
(function (KeydownEnum) {
    /**键盘向上键 */
    KeydownEnum[KeydownEnum["up"] = 38] = "up";
    /** 键盘向下键 */
    KeydownEnum[KeydownEnum["next"] = 40] = "next";
    /** 回车键 */
    KeydownEnum[KeydownEnum["enter"] = 13] = "enter";
})(KeydownEnum$1 || (KeydownEnum$1 = {}));
var ProForm = /** @class */ (function (_super) {
    __extends(ProForm, _super);
    function ProForm(props) {
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
        _this.traceId = _this.uid;
        _this.decryptionFreezeUid = _this.props['decryptionFreezeUid'];
        _this.freezeUid = _this.props['freezeUid'];
        if (_this.props.store.get(_this.uid)) {
            _this.props.store.get(_this.uid)['form'] = __assign(__assign({}, _this.props.form), { validateFields: _this.validateFields.bind(_this) });
        }
        if (_this.freezeUid) {
            if (!_this.props.store.HLFormLocalDataContainer.has(_this.freezeUid)) {
                _this.props.store.addLocalData(_this.freezeUid);
                _this.initSelectView();
            }
            _this.storeLocalView.setDragSort(_this.props.isDragSort);
            if (_this.storeLocalView.dragSortState) {
                _this.storeLocalView.updateControlsSort(_this.props.controls.map(function (item) { return item.iAntdProps.name; }));
            }
        }
        _this.storeView.updateFormSize(_this.props.size);
        _this.initFromState();
        _this.consoleLog('hlFormContainer-constructor');
        return _this;
    }
    Object.defineProperty(ProForm.prototype, "storeView", {
        get: function () {
            return this.props.store.HLFormContainer.get(this.uid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProForm.prototype, "storeLocalView", {
        get: function () {
            return this.props.store.HLFormLocalDataContainer.get(this.freezeUid);
        },
        enumerable: false,
        configurable: true
    });
    ProForm.prototype.consoleLog = function (type, logObj) {
        var obj = logObj || {};
        var logConent = __assign(__assign({ localView: __assign({}, this.storeLocalView) }, obj), { store: this.props.store, that: toJS(this), props: toJS(this.props), storeView: this.storeView });
        LoggerManager.consoleLog({
            type: type,
            logConent: logConent,
            methodsName: 'onHLFormCycle',
        });
    };
    ProForm.prototype.logger = function (type, logObj) {
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
    ProForm.prototype.initGroup = function (group) {
        if (group === void 0) { group = this.props.group; }
        if (this.state.groupEntity.length === 0 || (group && this.state.groupEntity.length !== group.length)) {
            var groupEntity_1 = [];
            group && group.map(function (item) {
                groupEntity_1.push({ name: item.name, active: item.active, isFolding: item.isFolding, id: item.id, isShowSizeIcon: item.isShowSizeIcon });
            });
            this.setState({
                groupEntity: groupEntity_1
            });
        }
    };
    /** 重写表单验证提交方法 */
    ProForm.prototype.validateFields = function () {
        var _a;
        var _this = this;
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
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
    ProForm.prototype.setFormStates = function (name, callback) {
        var _this = this;
        this.storeLocalView.dispatchAction(function () {
            var insertRenderEle = function () {
                if (!_this.storeView.renderNodeQueue.has(name)) {
                    _this.storeView.renderNodeQueue.set(name, name);
                }
            };
            var value = _this.storeView.getFormItemField(name);
            if (value) {
                if (value.type === 'normal') {
                    //@ts-ignore
                    callback && callback(value.value);
                    insertRenderEle();
                    _this.forceUpdate();
                }
                if (value.type === 'custom') {
                    //@ts-ignore
                    callback && callback(value.value);
                    insertRenderEle();
                    _this.forceUpdate();
                }
            }
        });
    };
    ProForm.prototype.componentWillMount = function () {
        var _this = this;
        var group = this.props.group;
        var groupEntity = [];
        group && group.map(function (item) {
            groupEntity.push({ name: item.name, active: item.active, isFolding: item.isFolding, id: item.id, isShowSizeIcon: item.isShowSizeIcon });
        });
        this.setState({
            groupEntity: groupEntity
        });
        var view = this.props.store.HLFormContainer.get(this.uid);
        var localview = this.props.store.HLFormLocalDataContainer.get(this.freezeUid);
        this.props.onReady && this.props.onReady(__assign(__assign({}, this.props.form), { validateFields: this.validateFields.bind(this) }), {
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
                            //@ts-ignore
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
                setFormStates: function (name, callback) {
                    _this.setFormStates(name, callback);
                }
            },
            validateFields: function (callback) {
                view.form.validateFields(callback);
            }
        });
        this.consoleLog('hlFormContainer-componentWillMount');
        /* document.addEventListener('keydown',this.handleKeyDown.bind(this)) */
    };
    ProForm.prototype.componentDidMount = function () {
        var el = document.querySelector("." + this.uid);
        if (el) {
            el.addEventListener('keydown', this.handleKeyDown.bind(this));
        }
        this.controlsLen = this.props.controls.length;
        this.consoleLog('hlFormContainer-componentDidMount');
    };
    ProForm.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.controls !== nextProps.controls) {
            /*  this.setFormItemStateDisabled({
                 props: this.props,nextProps
             }) */
            if (this.storeLocalView.dragSortState) {
                this.storeLocalView.updateControlsSort(nextProps.controls.map(function (item) { return item.iAntdProps.name; }));
            }
        }
        if (nextProps.size !== this.props.size) {
            this.storeView.updateFormSize(nextProps.size);
        }
        if (this.props.group !== nextProps.group) {
            this.initGroup(nextProps.group);
        }
        this.consoleLog('hlFormContainer-componentWillReceiveProps');
    };
    ProForm.prototype.componentWillUnmount = function () {
        if (!this.props['uniqueUid']) {
            this.props.store.delete(this.uid);
        }
        var el = document.querySelector("." + this.uid);
        if (el) {
            el.removeEventListener('keydown', this.handleKeyDown.bind(this));
        }
        this.consoleLog('hlFormContainer-componentWillUnmount');
        /* document.removeEventListener('keydown',this.handleKeyDown.bind(this)) */
    };
    ProForm.prototype.initFromState = function () {
        var _this = this;
        if (this.props.controls && Array.isArray(this.props.controls)) {
            this.props.controls.map(function (item) {
                var name = item['iAntdProps'].name;
                _this.storeView._initFormItemField(name, item);
                if (!_this.storeView.renderNodeQueue.has(name)) {
                    _this.storeView.renderNodeQueue.set(name, name);
                }
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
    ProForm.prototype.initSelectView = function (isDispatch, controls) {
        var _this = this;
        if (isDispatch === void 0) { isDispatch = true; }
        if (controls === void 0) { controls = this.props.controls; }
        if (controls && Array.isArray(this.props.controls)) {
            controls.map(function (item) {
                if (item instanceof LabelWithSelectModel && item.iFormProps && item.iFormProps.autoQuery)
                    runInAction(function () {
                        if (_this.storeLocalView && item.iAntdProps) {
                            var pageSize = item.iFormProps.pageSize || 30;
                            var keywords = item.iFormProps.autoQuery.params(1, pageSize, '').defaultKeyWords;
                            if (!_this.storeLocalView.selectView.has(item.iAntdProps.name)) {
                                _this.storeLocalView.initSelectView(item.iAntdProps.name, item.iFormProps.autoQuery, {
                                    paging: item.iFormProps.paging === void 0 ? false : item.iFormProps.paging,
                                    remote: item.iFormProps.remote === void 0 ? false : item.iFormProps.remote,
                                    pageSize: pageSize,
                                    tableNameDb: "" + _this.freezeUid,
                                    keywords: item.iFormProps.autoQuery.params(1, item.iFormProps.pageSize || 30, '').defaultKeyWords
                                });
                            }
                            if (item.iFormProps.autoQuery) {
                                if (!_this.storeLocalView.selectOptions.has(item.iAntdProps.name)) {
                                    _this.storeLocalView.initSelectOptions(item.iAntdProps.name, item.iFormProps.autoQuery);
                                }
                                if (isDispatch) {
                                    var name_1 = item.iAntdProps.name;
                                    _this.storeLocalView.dispatchRequest(item.iAntdProps.name, item.iFormProps.autoQuery, {
                                        pageIndex: 1,
                                        pageSize: pageSize,
                                        keyWords: keywords,
                                        callback: function (value) {
                                            if (!_this.storeView.renderNodeQueue.has(name_1)) {
                                                _this.storeView.renderNodeQueue.set(name_1, name_1);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
            });
        }
    };
    ProForm.prototype.onSelectSearch = function (name, options) {
        if (this.storeLocalView && this.storeLocalView.selectView.has(name)) {
            var item = this.storeLocalView.selectView.get(name);
            this.storeLocalView.dispatchRequest(name, item.autoQuery, __assign({ pageIndex: options.pageIndex, pageSize: item.pageSize, keyWords: options.keywords }, options));
        }
    };
    ProForm.prototype.queryElementItem = function (ElementKey) {
        var _this = this;
        if (this.storeView) {
            var keys = this.storeView._elementList.keys();
            var entitys_1 = null;
            //@ts-ignore
            keys.map(function (item) {
                var entity = _this.storeView._elementList.get(item);
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
    ProForm.prototype.queryFormElementItem = function (elementItem) {
        var e_1, _a;
        var viewStore = this.props.store.HLFormContainer.get(elementItem.formUid);
        if (viewStore) {
            var keys = [];
            try {
                for (var _b = __values(viewStore._elementList.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                var entity = viewStore._elementList.get(item);
                if (entity && entity.elementKey === elementItem.nextElementKey) {
                    entitys_2 = __assign(__assign({}, entity), { keys: item, viewStore: viewStore });
                }
            });
            return entitys_2;
        }
        return null;
    };
    //@ts-ignore
    ProForm.prototype.handleKeyDown = function (e) {
        var e_2, _a;
        var formStore = this.props.store.get(this.uid);
        var keyCode = e.keyCode;
        if (formStore && formStore.enableEnterSwitch) {
            /* e.stopPropagation() */
            var keysNext = formStore._elementList.keys();
            var keys = [];
            try {
                for (var keysNext_1 = __values(keysNext), keysNext_1_1 = keysNext_1.next(); !keysNext_1_1.done; keysNext_1_1 = keysNext_1.next()) {
                    var key = keysNext_1_1.value;
                    keys.push(key);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (keysNext_1_1 && !keysNext_1_1.done && (_a = keysNext_1.return)) _a.call(keysNext_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            //@ts-ignore
            if (keys.length > 0 && !formStore.focusUid) {
                formStore.focusUid = keys[0];
            }
            if (keyCode === KeydownEnum$1.next || keyCode === KeydownEnum$1.enter) {
                var _loop_1 = function (i) {
                    //@ts-ignore
                    var index = keys.findIndex(function (item) { return item === formStore.focusUid; });
                    if (index > -1) {
                        var currUid = keys[index];
                        var nextIndex = index + 1;
                        var nextUid = keys[nextIndex];
                        var currElement = formStore._elementList.get(currUid);
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
                            //@ts-ignore
                            if (nextIndex >= keys.length) { /**  当到达最后一个元素时，再次回车将回到第一个元素的焦点*/
                                nextIndex = 0;
                                nextUid = keys[nextIndex];
                            }
                        }
                        var el_1 = formStore._elementList.get(nextUid);
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
                //@ts-ignore
                for (var i = 0; i < keys.length; i++) {
                    var state_1 = _loop_1(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            if (keyCode === KeydownEnum$1.up) {
                var _loop_2 = function (i) {
                    //@ts-ignore
                    var index = keys.findIndex(function (item) { return item === formStore.focusUid; });
                    if (index > -1) {
                        var preIndex = index - 1;
                        var nextUid = keys[preIndex];
                        if (preIndex < 0) { /**  当到达第一个一个元素时，再次按上键将回到最后一个元素的焦点*/
                            //@ts-ignore
                            preIndex = keys.length - 1;
                            nextUid = keys[preIndex];
                        }
                        var el_2 = formStore._elementList.get(nextUid);
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
                //@ts-ignore
                for (var i = 0; i < keys.length; i++) {
                    var state_2 = _loop_2(i);
                    if (typeof state_2 === "object")
                        return state_2.value;
                }
            }
        }
    };
    ProForm.prototype.handleToggle = function (name, even) {
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
    ProForm.prototype.getAbsPos = function (obj) {
        var x = obj.offsetLeft;
        var y = obj.offsetTop;
        while (obj = obj.offsetParent) {
            x += obj.offsetLeft;
            y += obj.offsetTop;
        }
        return { "x": x, "y": y };
    };
    ProForm.prototype.componentDidUpdate = function () {
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
    ProForm.prototype.handlePositioning = function (name) {
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
    ProForm.prototype.isFormHasError = function (getFieldsError) {
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
    ProForm.prototype.renderControl = function (control, key) {
        var form = this.props.form;
        var hasError = this.isFormHasError(form.getFieldsError);
        var error = form.getFieldError(control.iAntdProps.id);
        var formSize = this.storeView.computedFormSize;
        if (control.iAntdProps.className) {
            control.iAntdProps.className = control.iAntdProps.className.replace(size[formSize]['formItemLayOut'], '');
        }
        var item = 'iFormProps';
        var formItemRowHeight = formClasses.itemRowHeight;
        if (!(control instanceof LegionsProForm.LabelWithRenderModel)) {
            //@ts-ignore
            control[item].size = formSize;
        }
        if (control instanceof LegionsProForm.LabelWithSelectModel) {
            if (control[item].options && control[item].options.length >= 50 && !control[item].paging) { // 当下拉数据超过50项自动开启分页
                control[item].paging = true;
            }
        }
        if (control.iAntdProps.className) {
            control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['table'].formItemLayOut, '').replace(formClasses.tableError, '').replace(formClasses.tableNotEror, '').replace(formItemRowHeight, '');
            control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['small'].formItemLayOut, '').replace(formItemRowHeight, '');
            control.iAntdProps.className = control.iAntdProps.className && control.iAntdProps.className.replace(size['default'].formItemLayOut, '').replace(formClasses.itemDefaultError, '');
        }
        if (formSize === 'table') {
            control.iAntdProps.className = (control.iAntdProps.className || '') + " " + size[formSize].formItemLayOut + " " + (error ? formClasses.tableError : formClasses.tableNotEror) + " " + formItemRowHeight; /**  表单间距调小*/
            if (!(control instanceof LegionsProForm.LabelWithRenderModel)) {
                //@ts-ignore
                control[item].size = 'small';
            }
        }
        else if (formSize === 'small') {
            control.iAntdProps.className = (control.iAntdProps.className || '') + " " + size[formSize].formItemLayOut + " " + formItemRowHeight;
        }
        else {
            control.iAntdProps.className = (control.iAntdProps.className || '') + " " + size[formSize].formItemLayOut + " " + (hasError ? '' : size[formSize].formItemLayOut) + " " + (error ? formClasses.itemDefaultError : ''); /**  表单间距调小*/
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
        else if (control instanceof LabelWithSelectModel) {
            if (control instanceof LabelWithSelectModel && control.iFormProps.autoQuery) {
                var view_1 = localview.selectView.get(control.iAntdProps.name);
                if (view_1 && view_1.currValue) {
                    var options = [];
                    var total = 0;
                    //@ts-ignore
                    if (view_1.currValue.data.get(view_1.pageIndex.toString())) {
                        //@ts-ignore
                        options = view_1.currValue.data.get(view_1.pageIndex.toString());
                        var name_2 = control.iAntdProps.name;
                        total = view_1.currValue.total;
                    }
                    control.iFormProps.options = options;
                    control.iFormProps.total = total;
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
    ProForm.prototype.renderControls = function (controls) {
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
            var visible = true;
            var display = true;
            if (controls.iFormProps.visible !== void 0) {
                visible = controls.iFormProps.visible;
            }
            if (controls.iFormProps.display !== void 0) {
                display = controls.iFormProps.display;
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
                console.log(items);
                _this.storeLocalView.updateControlsSort(items);
                _this.storeView._elementList.clear();
                _this.storeView.computedAllFormFields.map(function (w) {
                    var name = w.iAntdProps.name;
                    _this.storeView.renderNodeQueue.set(name, name);
                });
                _this.forceUpdate();
            } }, rendercontrols) : rendercontrols);
    };
    ProForm.prototype.renderGroup = function () {
        var _this = this;
        var group = this.props.group;
        /* const controls = this.props.controls; */
        var controls = this.storeView.computedFormFields;
        //@ts-ignore
        var groupComponent = group.map(function (item, index) {
            var groupFormItem = controls.filter(function (entity) { return entity.iAntdProps.groupId === item.id; });
            if (groupFormItem && groupFormItem.length) {
                var entity = _this.state.groupEntity.find(function (entity) { return entity.name === item.name; });
                return (React.createElement(Row, { className: !entity.isFolding ? "group-item toggle" : "group-item", key: index },
                    React.createElement("div", { className: "group-item-title " + (item.className || ''), "data-id": "form-floor", "data-tab": item.name },
                        React.createElement("span", { className: "group-item-title-left" }, item.name),
                        React.createElement("span", { className: "group-item-title-right" },
                            entity.isShowSizeIcon && React.createElement(Dropdown, { overlay: (React.createElement(Menu, { selectedKeys: [_this.storeView.computedFormSize], onClick: function (item) {
                                        var size = item.key;
                                        _this.storeView.updateFormSize(size);
                                        _this.props.onUpdateFormSize && _this.props.onUpdateFormSize(size);
                                    } },
                                    React.createElement(Menu.Item, { key: "default" },
                                        React.createElement("span", null, "\u8212\u9002\u578B")),
                                    React.createElement(Menu.Item, { key: "small" },
                                        React.createElement("span", null, "\u8FF7\u4F60\u578B")),
                                    React.createElement(Menu.Item, { key: "table" },
                                        React.createElement("span", null, "\u7D27\u51D1\u578B")))), placement: "bottomCenter" },
                                React.createElement(Icon, { style: { fontSize: '16px' }, type: "bars" })),
                            !entity.isFolding ? React.createElement(Icon, { type: "plus", style: { fontSize: '16px' }, onClick: _this.handleToggle.bind(_this, item.name) }) : React.createElement(Icon, { type: "minus", style: { fontSize: '17px' }, onClick: _this.handleToggle.bind(_this, item.name) }))),
                    React.createElement("div", { className: !entity.isFolding ? "group-item-form hide" : "group-item-form" },
                        React.createElement(Row, { type: "flex" }, _this.renderControls(groupFormItem)))));
            }
        });
        return (React.createElement(Row, { className: "form-group-wrapper" },
            React.createElement("div", { className: "form-group", style: { width: (this.state.groupEntity.length > 5 ? 87 : 100) + "%" } }, groupComponent),
            this.state.groupEntity.length > 5 && React.createElement("div", { className: "form-group-affix" },
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
    ProForm.prototype.renderForm = function () {
        var group = this.props.group;
        /* const controls = this.props.controls; */
        var controls = this.storeView.computedFormFields;
        if (group && group instanceof Array && group.length) {
            return this.renderGroup();
        }
        return React.createElement(Row, { type: "flex" }, this.renderControls(controls));
    };
    ProForm.prototype.render = function () {
        return (React.createElement(Form, { className: baseCls + " " + this.uid }, this.renderForm()));
    };
    ProForm.defaultProps = {
        size: 'default',
        isDragSort: false,
    };
    ProForm = __decorate([
        bind({ store: LegionsStoreForm }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], ProForm);
    return ProForm;
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
})(ProForm);
var LegionsProForm = /** @class */ (function (_super) {
    __extends(LegionsProForm, _super);
    function LegionsProForm(props) {
        var _this = _super.call(this, props) || this;
        /** 根据时间戳生成，每次初始化表单组件都会产生新的值*/
        _this.uid = '';
        _this.timeId = new Date().getTime();
        /** uid 的值绝对唯一，且每次初始生成表单都是相同值 */
        _this.freezeUid = '';
        /** 未加密的freezeUid 值 */
        _this.decryptionFreezeUid = '';
        if (_this.props['uniqueUid']) {
            _this.decryptionFreezeUid = "" + _this.props['uniqueUid'] + (_this.props.uniqueKeys || '') + (process.env.environment === 'production' ? 'production' : '');
            _this.freezeUid = "form" + shortHash(_this.decryptionFreezeUid);
            _this.uid = _this.freezeUid;
        }
        else {
            _this.uid = "form" + _this.props.store.HLFormContainer.size + shortHash("" + _this.timeId + _this.props.store.HLFormContainer.size);
            if (_this.props.store.HLFormContainer.has(_this.uid)) {
                _this.timeId = new Date().getTime();
                _this.uid = "form" + _this.props.store.HLFormContainer.size + shortHash("" + _this.timeId + _this.props.store.HLFormContainer.size);
            }
            _this.freezeUid = _this.uid;
            _this.decryptionFreezeUid = _this.uid;
        }
        _this.props.store.add(_this.uid, {
            InputDataModel: _this.props.InputDataModel,
            formRef: _this,
        });
        return _this;
    }
    Object.defineProperty(LegionsProForm.prototype, "storeView", {
        get: function () {
            return this.props.store.HLFormContainer.get(this.uid);
        },
        enumerable: false,
        configurable: true
    });
    LegionsProForm.prototype.render = function () {
        return React.createElement(CustomizedForm, __assign({}, this.props, this.storeView.InputDataModel, {
            uid: this.uid,
            freezeUid: this.freezeUid,
            decryptionFreezeUid: this.decryptionFreezeUid
        }));
    };
    LegionsProForm.CreateForm = CreateForm;
    LegionsProForm.ProFormUtils = ProFormUtils;
    LegionsProForm.LabelWithInputNumberModel = LabelWithInputNumberModel;
    LegionsProForm.LabelWithSelectModel = LabelWithSelectModel;
    LegionsProForm.LabelWithRenderModel = LabelWithRenderModel;
    LegionsProForm.LabelWithDatePickerModel = LabelWithDatePickerModel;
    LegionsProForm.LabelWithMonthPickerModel = LabelWithMonthPickerModel;
    LegionsProForm.LabelWithRangePickerModel = LabelWithRangePickerModel;
    LegionsProForm.LabelWithUploadModel = LabelWithUploadModel;
    LegionsProForm.LabelWithSwitchModel = LabelWithSwitchModel;
    LegionsProForm.LabelWithRadioButtonModel = LabelWithRadioButtonModel;
    LegionsProForm.LabelWithTextModel = LabelWithTextModel;
    LegionsProForm.LabelWithInputModel = LabelWithInputModel;
    LegionsProForm.BaseFormFields = BaseFormFields;
    LegionsProForm.ProFormFields = ProFormFields;
    LegionsProForm = __decorate([
        bind({ store: LegionsStoreForm }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProForm);
    return LegionsProForm;
}(React.Component));

export default LegionsProForm;
