/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var ExportTaskEntity = /** @class */ (function () {
    function ExportTaskEntity() {
        /**
         * 企业UID
         *
         * @memberof UserEntity
         */
        this.companyUid = '';
        this.id = 0;
        /**
         *创建人ID,
         *
         * @memberof MenuEntity
         */
        this.createrId = '';
        /**
         * 创建时间,
         *
         * @memberof MenuEntity
         */
        this.createTime = '';
        /**
         *导出名字
         *
         * @memberof MenuEntity
         */
        this.moduleName = '';
        /**
         *导出开始时间,
         *
         * @memberof MenuEntity
         */
        this.startTime = '';
        /**
         * 导出完成时间
         *
         * @memberof ExportTaskEntity
         */
        this.finishTime = '';
        this.createrName = '';
        /**
         *
         * 导出状态: 0:未导出;1:导出中;2:已导出;3:导出结果已删除;4:导出错误,
         * @memberof ExportTaskEntity
         */
        this.state = '';
        /**
         *
         * 导出结果地址,
         * @memberof ExportTaskEntity
         */
        this.filePath = '';
        /**
         *
         * 任务名称
         * @memberof ExportTaskEntity
         */
        this.taskName = '';
        this.version = '';
    }
    Object.defineProperty(ExportTaskEntity.prototype, "stateDesc", {
        get: function () {
            var enumObj = {
                0: '未导出',
                1: '导出中',
                2: '已导出',
                3: '导出结果已删除',
                4: '导出错误',
            };
            return enumObj[this.state];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExportTaskEntity.prototype, "stateUI", {
        get: function () {
            var enumObj = {
                0: 'default',
                1: 'processing',
                2: 'success',
                3: 'warning',
                4: 'error',
            };
            return enumObj[this.state];
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        JsonProperty('companyUid'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "companyUid", void 0);
    __decorate([
        JsonProperty('id'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "id", void 0);
    __decorate([
        JsonProperty('createrId'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "createrId", void 0);
    __decorate([
        JsonProperty('createTime'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "createTime", void 0);
    __decorate([
        JsonProperty('moduleName'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "moduleName", void 0);
    __decorate([
        JsonProperty('startTime'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "startTime", void 0);
    __decorate([
        JsonProperty('finishTime'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "finishTime", void 0);
    __decorate([
        JsonProperty('createrName'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "createrName", void 0);
    __decorate([
        JsonProperty('state'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "state", void 0);
    __decorate([
        JsonProperty('filePath'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "filePath", void 0);
    __decorate([
        JsonProperty('taskName'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "taskName", void 0);
    __decorate([
        JsonProperty('version'),
        __metadata("design:type", Object)
    ], ExportTaskEntity.prototype, "version", void 0);
    return ExportTaskEntity;
}());

var BaseEntity = /** @class */ (function () {
    function BaseEntity() {
        /**
         *操作结果
         *
         * @type {boolean}
         * @memberof BaseEntity
         */
        this.success = true;
        /**
         * 描述信息
         *
         * @type {string}
         * @memberof BaseEntity
         */
        this.message = '';
        /**
         * 提示信息编码
         *
         * @type {(string|number)}
         * @memberof BaseEntity
         */
        this.code = '';
        /**
         *返回数据信息
         *
         * @type {T}
         * @memberof BaseEntity
         */
        //@ts-ignore
        this.result = null;
    }
    BaseEntity.prototype.transformArray = function (rows, mapEntity) {
        var _this = this;
        return (rows || []).map(function (row) {
            return _this.transformRow(row, mapEntity);
        });
    };
    BaseEntity.prototype.transformRows = function (rows, mapEntity) {
        var _this = this;
        return (rows || []).map(function (row) {
            return _this.transformRow(row, mapEntity);
        });
    };
    BaseEntity.prototype.transformRow = function (row, mapEntity) {
        return MapperEntity(mapEntity, row);
    };
    return BaseEntity;
}());
var ContainerEntity = /** @class */ (function (_super) {
    __extends(ContainerEntity, _super);
    // tslint:disable-next-line: typedef
    function ContainerEntity(fromService) {
        var _this = _super.call(this) || this;
        if (fromService && typeof fromService === 'object') {
            _this.code = fromService.status || '';
            _this.message = fromService.msg || '';
            _this.result = fromService.data;
            _this.success = fromService.ok || false;
        }
        return _this;
    }
    return ContainerEntity;
}(BaseEntity));

var InterfaceMenuEntity = /** @class */ (function () {
    function InterfaceMenuEntity() {
    }
    return InterfaceMenuEntity;
}());
var MenuEntity = /** @class */ (function (_super) {
    __extends(MenuEntity, _super);
    function MenuEntity() {
        var _this = _super.call(this) || this;
        /**
         *键名
         *
         * @memberof UserEntity
         */
        _this.key = '';
        /**
         *菜单标题
         *
         * @memberof MenuEntity
         */
        _this.title = '';
        /**
         *内容区数据
         *
         * @memberof MenuEntity
         */
        _this.content = '';
        /**
         *
         * 菜单路径
         * @memberof MenuEntity
         */
        _this.path = '';
        /**
         *是否允许关闭
         *
         * @memberof MenuEntity
         */
        _this.closable = false;
        /**
         * 子菜单
         *
         * @type {Array<MenuEntity>}
         * @memberof MenuEntity
         */
        _this.children = [];
        _this.deep = [];
        _this.icon = '';
        _this.loadingMode = 'iframe';
        _this.sandbox = {
            appName: '',
            appEntiy: '',
            appRootId: '',
            experimentalStyleIsolation: true,
            isMerge: false,
        };
        return _this;
    }
    __decorate([
        JsonProperty('key'),
        __metadata("design:type", Object)
    ], MenuEntity.prototype, "key", void 0);
    __decorate([
        JsonProperty('title'),
        __metadata("design:type", Object)
    ], MenuEntity.prototype, "title", void 0);
    __decorate([
        JsonProperty('content'),
        __metadata("design:type", Object)
    ], MenuEntity.prototype, "content", void 0);
    __decorate([
        JsonProperty('path'),
        __metadata("design:type", Object)
    ], MenuEntity.prototype, "path", void 0);
    __decorate([
        JsonProperty('closable'),
        __metadata("design:type", Object)
    ], MenuEntity.prototype, "closable", void 0);
    __decorate([
        JsonProperty({ clazz: MenuEntity, name: 'child' }),
        __metadata("design:type", Array)
    ], MenuEntity.prototype, "children", void 0);
    __decorate([
        JsonProperty('deep'),
        __metadata("design:type", Array)
    ], MenuEntity.prototype, "deep", void 0);
    __decorate([
        JsonProperty('iconurl'),
        __metadata("design:type", String)
    ], MenuEntity.prototype, "icon", void 0);
    return MenuEntity;
}(InterfaceMenuEntity));
var MenuContainerEntity = /** @class */ (function (_super) {
    __extends(MenuContainerEntity, _super);
    /* transformRows(rows, mapEntity) {
      super.transformRows(rows, mapEntity)
    } */
    /**
     *Creates an instance of MenuContainerEntity.
     * @param {IMenuEntity} fromJson 服务端接口数据
     * @memberof MenuContainerEntity  VMdel?:ClassOf<InterfaceMenuEntity>
     */
    function MenuContainerEntity(fromJson) {
        var _this = _super.call(this) || this;
        _this.message = fromJson.msg || '查询成功';
        _this.success = fromJson.ok || true;
        _this.code = fromJson.status || '';
        var data = fromJson.data;
        if (fromJson && data) {
            _this.result = _super.prototype.transformRows.call(_this, data, MenuEntity);
        }
        else {
            _this.result = [];
        }
        return _this;
    }
    return MenuContainerEntity;
}(BaseEntity));

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
var TableColumnsContainerEntity = /** @class */ (function (_super) {
    __extends(TableColumnsContainerEntity, _super);
    function TableColumnsContainerEntity(fromJson) {
        var _this = _super.call(this) || this;
        if (fromJson) {
            _this.message = fromJson.message || '操作成功';
            _this.success = fromJson.success || true;
            _this.code = fromJson.status || '';
            var data = fromJson.data;
            if (fromJson && data) {
                _this.result = _super.prototype.transformRow.call(_this, data, TableColumnsEntity);
            }
        }
        return _this;
    }
    return TableColumnsContainerEntity;
}(BaseEntity));

var KeyValue = /** @class */ (function () {
    function KeyValue() {
        this.key = void 0;
        this.value = void 0;
        this.label = void 0;
        this.title = void 0;
        this.keyValue = void 0;
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
    return KeyValue;
}());
/** 下拉列表数据模型*/
var SelectKeyValue = /** @class */ (function (_super) {
    __extends(SelectKeyValue, _super);
    function SelectKeyValue(options) {
        var _this = _super.call(this) || this;
        _this.total = 0;
        _this.current = 1;
        _this.pageSize = 10;
        _this.result = [];
        if (options && typeof options.responseData === 'object') {
            _this.message = options.responseData.msg || '查询成功';
            _this.success = options.responseData.ok ? true : false;
            _this.code = options.responseData.status || '';
            _this.total = options.responseData.total || 0;
            _this.current = options.responseData.current || 1;
            _this.pageSize = options.responseData.pageSize || 10;
            if (options.mappingEntity &&
                typeof options.mappingEntity === 'function') {
                var result = options.mappingEntity(_this, options.responseData);
                _this.result = _this.transformRows(result, KeyValue);
            }
        }
        return _this;
    }
    return SelectKeyValue;
}(BaseEntity));

export { BaseEntity, ContainerEntity, ExportTaskEntity, KeyValue, MenuContainerEntity, MenuEntity, SelectKeyValue, TableColumnsContainerEntity, TableColumnsEntity, TableListColumns };
