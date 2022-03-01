/**
  *  legions-pro-design v0.0.21
  * (c) 2022 duanguang
  * @license MIT
  */
import { JsonProperty, MapperEntity } from 'json-mapper-object';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var TableListColumns = /** @class */ (function () {
    function TableListColumns() {
        this.dataIndex = '';
        this.title = '';
    }
    __decorate([
        JsonProperty('dataIndex'),
        __metadata("design:type", String)
    ], TableListColumns.prototype, "dataIndex", void 0);
    __decorate([
        JsonProperty('title'),
        __metadata("design:type", String)
    ], TableListColumns.prototype, "title", void 0);
    return TableListColumns;
}());
var TableColumnsEntity = /** @class */ (function () {
    function TableColumnsEntity() {
        /**
         * 模块UID
         *
         * @memberof UserEntity
         */
        this.modulesUid = '';
        /**
         * 自定义列信息
         *
         * @memberof MenuEntity
         */
        this.customColumns = [];
    }
    __decorate([
        JsonProperty('modulesUid'),
        __metadata("design:type", Object)
    ], TableColumnsEntity.prototype, "modulesUid", void 0);
    __decorate([
        JsonProperty({ clazz: TableListColumns, name: 'customColumns' }),
        __metadata("design:type", Object)
    ], TableColumnsEntity.prototype, "customColumns", void 0);
    return TableColumnsEntity;
}());
var TableColumnsContainerEntity = /** @class */ (function () {
    function TableColumnsContainerEntity(fromJson) {
        /** *操作结果
           * @type {boolean}
           */
        this.success = true;
        /**
         * 描述信息
         *
         * @type {string}
         * @memberof BaseEntity
         */
        this.message = '';
        /**  提示信息编码
         * @type {(string|number)}
         */
        this.code = '';
        /**  返回数据信息
         * @type {T}
         * @memberof BaseEntity
         */
        this.result = null;
        if (fromJson) {
            this.message = fromJson.message || '操作成功';
            this.success = fromJson.success || true;
            this.code = fromJson.status || '';
            var data = fromJson.data;
            if (fromJson && data) {
                //@ts-ignore
                this.result = this.transformRow(data, TableColumnsEntity);
            }
        }
    }
    TableColumnsContainerEntity.prototype.transformArray = function (rows, mapEntity) {
        var _this = this;
        return (rows || []).map(function (row) {
            return _this.transformRow(row, mapEntity);
        });
    };
    TableColumnsContainerEntity.prototype.transformRows = function (rows, mapEntity) {
        var _this = this;
        return (rows || []).map(function (row) {
            return _this.transformRow(row, mapEntity);
        });
    };
    TableColumnsContainerEntity.prototype.transformRow = function (row, mapEntity) {
        return MapperEntity(mapEntity, row);
    };
    return TableColumnsContainerEntity;
}());

var KeyValue = /** @class */ (function () {
    function KeyValue() {
        this.key = void 0;
        this.value = void 0;
        this.label = void 0;
        this.title = void 0;
        this.keyValue = void 0;
        this.extendedField = void 0;
    }
    __decorate([
        JsonProperty('key'),
        __metadata("design:type", Object)
    ], KeyValue.prototype, "key", void 0);
    __decorate([
        JsonProperty('value'),
        __metadata("design:type", Object)
    ], KeyValue.prototype, "value", void 0);
    __decorate([
        JsonProperty('label'),
        __metadata("design:type", Object)
    ], KeyValue.prototype, "label", void 0);
    __decorate([
        JsonProperty('title'),
        __metadata("design:type", Object)
    ], KeyValue.prototype, "title", void 0);
    __decorate([
        JsonProperty('keyValue'),
        __metadata("design:type", Object)
    ], KeyValue.prototype, "keyValue", void 0);
    __decorate([
        JsonProperty('extendedField'),
        __metadata("design:type", Object)
    ], KeyValue.prototype, "extendedField", void 0);
    return KeyValue;
}());
/** 下拉列表数据模型*/
var SelectKeyValue = /** @class */ (function () {
    function SelectKeyValue(options) {
        this.total = 0;
        this.current = 1;
        this.pageSize = 10;
        /** *操作结果
          * @type {boolean}
          */
        this.success = true;
        /**
         * 描述信息
         *
         * @type {string}
         * @memberof BaseEntity
         */
        this.message = '';
        /**  提示信息编码
         * @type {(string|number)}
         */
        this.code = '';
        /**  返回数据信息
         * @type {T}
         * @memberof BaseEntity
         */
        this.result = null;
        this.result = [];
        if (options && typeof options.responseData === 'object') {
            this.message = options.responseData.msg || '查询成功';
            this.success = options.responseData.ok ? true : false;
            this.code = options.responseData.status || '';
            this.total = options.responseData.total || 0;
            this.current = options.responseData.current || 1;
            this.pageSize = options.responseData.pageSize || 10;
            if (options.mappingEntity &&
                typeof options.mappingEntity === 'function') {
                var result = options.mappingEntity(this, options.responseData);
                this.result = this.transformRows(result, KeyValue);
            }
        }
    }
    SelectKeyValue.prototype.transformArray = function (rows, mapEntity) {
        var _this = this;
        return (rows || []).map(function (row) {
            return _this.transformRow(row, mapEntity);
        });
    };
    SelectKeyValue.prototype.transformRows = function (rows, mapEntity) {
        var _this = this;
        return (rows || []).map(function (row) {
            return _this.transformRow(row, mapEntity);
        });
    };
    SelectKeyValue.prototype.transformRow = function (row, mapEntity) {
        return MapperEntity(mapEntity, row);
    };
    return SelectKeyValue;
}());

/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:58:22
 * @LastEditTime: 2022-02-28 18:02:11
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsModels/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var LegionsModels = {
    TableColumnsContainerEntity: TableColumnsContainerEntity,
    TableListColumns: TableListColumns,
    TableColumnsEntity: TableColumnsEntity,
    SelectKeyValue: SelectKeyValue,
    KeyValue: KeyValue,
};

export default LegionsModels;
