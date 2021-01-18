/*
 * @Author: duanguang
 * @Date: 2021-01-07 17:16:35
 * @LastEditTime: 2021-01-18 14:22:59
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.table/ProTableView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { observable, action, StoreModules } from 'legions/store';
import {
  computed,
  autorun,
  runInAction,
  isComputed,
  ObservableMap,
} from 'mobx';
import * as mobx from 'mobx';
import { TableColumnsContainerEntity } from '../../models';
import { shortHash } from 'legions-lunar/object-hash';
import { queryTableColumns, editTableColumns } from '../../services';
import {
  IScroll,
  IShowColumns,
  ITableColumnConfig,
  IObservableMap,
} from './interface';
import { TableColumnConfig } from '../../interface/antd';
export class ProTableView {
  @observable userInfo: {
    userName: string;
    userUid: string;
    companyName?: string;
    companyUid?: string;
  } = null;
  constructor(modulesName?: string, uid?: string, user?) {
    this.bodyExternalContainer.observe(chan => {
      runInAction(() => {
        if (mobx['useStrict']) {
          // @ts-ignore
          if (this.bodyExternalContainer.values().length) {
            // @ts-ignore
            const total = this.bodyExternalContainer
              .values()
              //@ts-ignore
              .reduce((total, currentValue) => {
                return {
                  height: total.height + currentValue.height,
                };
              });
            this.bodyExternalHeight = total.height;
          }
        } else if (mobx['configure']) {
          const values: { height: number }[] = [];
          this.bodyExternalContainer.forEach((item, key) => {
            values.push(item);
          });
          if (values.length) {
            const total = values.reduce((total, currentValue) => {
              return {
                height: total.height + currentValue.height,
              };
            });
            this.bodyExternalHeight = total.height;
          }
        }
      });
    });
    runInAction(() => {
      this.tableModulesName = modulesName || '';
      this.uid = uid;
      this.userInfo = user;
    });
    /* autorun(() => {
            console.log(this.obTableListCustom.state,'this.obTableListCustom') 
         })() */
  }
  @observable private uid = '';
  @computed get computedUid() {
    return this.uid;
  }
  /**
   * table 页码
   *
   * @memberof ProTableView
   */
  @observable pageIndex = 1;

  /**
   * table 页大小
   *
   * @memberof ProTableView
   */
  @observable pageSize = 20;

  /**
   * 行选中数据
   *
   * @memberof ProTableView
   */
  @observable selectedRows = [];

  /**
   *
   * 展开行数据
   * @memberof ProTableView
   */
  @observable expandRow? = '';

  /**
   *
   * 表格行选中方式
   * @memberof ProTableView
   */
  @observable type?: 'checkbox' | 'radio' = null;

  /**
   * 表格行单击选中方式
   *
   * @memberof ProTableView
   */
  @observable rowSelectionClickType?: 'radio' | 'check' = null;

  /**
   * 表格列配置
   *
   * @memberof ModalView
   */
  @observable columns?: (TableColumnConfig<{}> & ITableColumnConfig)[] = null;

  /**
   * 用于显示列信息列表  table组件内部处理，外部请勿修改数据
   *
   * @type {IShowColumns[]}
   * @memberof ProTableView
   */
  @observable private showColumns: IShowColumns[] = [];

  /**
   * 隐藏的列信息 ，不显示
   *
   * @private
   * @type {IShowColumns[]}
   * @memberof ProTableView
   */
  @observable private unShowColumns: IShowColumns[] = [];

  /**
   * 显示列缓存键名
   *
   * @private
   * @memberof ProTableView
   */
  @observable private localStorageShowColumnsKeys = '';

  /**
   * 服务端存储列设置信息
   *
   * @private
   * @memberof ProTableView
   */
  @observable
  obTableListCustom: TableColumnsContainerEntity = new TableColumnsContainerEntity();
  /**
   *
   * table 模块名称，如果设置此值，请保持绝对唯一
   * 要求唯一原因，会根据此名称生成hash用作自定义列缓存信息键名
   * @type {string}
   * @memberof ProTableView
   */
  @observable private tableModulesName?: string = '';

  /**
   * table 列表数据渲染后的dom 高度，这个数据时根据真实数据得到，请勿人为修改
   *
   * @memberof ProTableView
   */
  @observable tableBodyDomClientHeight = 0;

  /**
   * 当外部组件跟table 处于同一容器组件，存储每个组件高度值
   *
   * @memberof ProTableView
   */
  // @ts-ignore
  @observable bodyExternalContainer: IObservableMap<
    string,
    { height: number }
  > = observable.map();

  /**
   * table 高度是否自适应
   *
   * @memberof ProTableView
   */
  @observable isAdaptiveHeight = false;

  /**
   *
   * 横向或纵向支持滚动，也可用于指定滚动区域的宽高度
   * @type {IScroll}
   * @memberof ProTableView
   */
  @observable scroll: IScroll = { x: true, y: 300 };

  @observable.ref bodyStyle: React.CSSProperties;

  /**
   * 存储动态添加表格行的数据
   *
   * @type {any[]}
   * @memberof ProTableView
   */
  @observable tempDynamicAddData: any[] = [];

  /**
   * 需要圈定的table 容器 高度 ，默认document.body.clientHeight 取，可以动态设置
   *
   * @memberof ProTableView
   */
  @observable bodyContainerHeight = document.body.clientHeight;

  /**
   * 内部判定使用，私有变量，外部请勿修改
   *
   * @type {boolean}
   * @memberof ProTableView
   */
  @observable pagination: boolean = true;

  /**
   * 外部容器需要扣除的
   *
   * @memberof ProTableView
   */
  @observable bodyExternalHeight = 0;

  /**
   * 用于渲染的表格数据,私有变量，外部请勿操作
   *
   * @memberof ProTableView
   */
  @observable renderData = [];

  @observable private total = 0;
  /**
   * 查询条件
   * @memberof ProTableView
   */
  @observable queryParams = null;

  /**
   *
   * 是否开启行单击选中数据，内部私有数据，请勿调用
   * @memberof ProTableView
   */
  @observable isOpenRowChange = true;

  /** 是否开启行选中功能，比如开启checkbox ，radio */
  @observable isOpenRowSelection = true;

  /**
   * 表格容器宽度,私有变量
   *
   * @memberof ProTableView
   */
  @observable _tableContainerWidth = 0;
  @computed get calculateBody() {
    let bodyStyle = {};
    const paginationHeight = this.pagination ? 64 : 0;
    const maxHeight =
      this.bodyContainerHeight - this.bodyExternalHeight - paginationHeight;
    if (bodyStyle['maxHeight']) {
      if (bodyStyle['maxHeight'] !== maxHeight) {
        bodyStyle['maxHeight'] = `${maxHeight.toString()}px`;
        bodyStyle['minHeight'] = `${maxHeight.toString()}px`;
        bodyStyle = Object.assign({}, bodyStyle);
      }
    } else {
      bodyStyle['maxHeight'] = `${maxHeight.toString()}px`;
      bodyStyle['minHeight'] = `${maxHeight.toString()}px`;
      bodyStyle = Object.assign({}, bodyStyle);
    }

    return bodyStyle;
  }

  /**
   * 显示列
   *
   * @readonly
   * @memberof ProTableView
   */
  @computed get computedShowColumns() {
    return this.showColumns;
  }

  /**
   * 隐藏列
   *
   * @readonly
   * @memberof ProTableView
   */
  @computed get computedUnShowColumns() {
    return this.unShowColumns;
  }

  /**
   *
   * 显示列缓存键名
   * @readonly
   * @memberof ProTableView
   */
  @computed get computedStorageShowColumnsKeys() {
    return this.localStorageShowColumnsKeys;
  }

  /**
   * 需要显示的table 列信息
   *
   * @readonly
   * @memberof ProTableView
   */
  @computed get computedRenderColumns(): (TableColumnConfig<{}> &
    ITableColumnConfig)[] {
    const setTableContainerWidth = (): number => {
      const table = document.querySelector(`.${this.uid}`);
      if (table && table.getElementsByClassName('ant-table-body')) {
        const tableBody = table.getElementsByClassName('ant-table-body');
        if (
          tableBody &&
          tableBody instanceof HTMLCollection &&
          tableBody.length
        ) {
          const width = tableBody[0].clientWidth;
          return width;
        }
      }
      return 0;
    };
    if (this.computedShowColumns.length) {
      let renderColumns = [];
      this.computedShowColumns.map(item => {
        const entity = this.columns.find(m => m.dataIndex === item.dataIndex);
        if (entity) {
          renderColumns.push(entity);
        }
      });
      const res = renderColumns.reduce(
        (total, currentValue) => {
          return {
            width:
              parseInt(total.width as string, 10) +
              parseInt(currentValue.width as string, 10),
          };
        },
        { width: 0 }
      );
      if (this._tableContainerWidth > res['width']) {
        // 当前分辨率如果足够放下表格列信息，则不需要固定列，删除固定列配置
        renderColumns = [];
        this.computedShowColumns.map(item => {
          const entity = this.columns.find(m => m.dataIndex === item.dataIndex);
          if (entity) {
            const newEntity = { ...entity };
            delete newEntity['fixed'];
            renderColumns.push(newEntity);
          }
        });
      }
      return renderColumns;
    }
    const columns = this.columns
      ? this.columns.filter(item => !item.noChecked)
      : [];
    const res = columns.reduce(
      (total, currentValue) => {
        return {
          width:
            parseInt(total.width as string, 10) +
            parseInt(currentValue.width as string, 10),
        };
      },
      { width: 0 }
    );
    const width = this._tableContainerWidth || setTableContainerWidth();
    if (width >= res['width']) {
      return columns.map(item => {
        delete item['fixed'];
        return item;
      });
    }
    return columns;
  }

  /**
   * 表格x轴长度计算 scroll{x:计算}
   *
   * @readonly
   * @memberof ProTableView
   */
  @computed get tableXAutoWidth() {
    if (this.computedRenderColumns) {
      const res = this.computedRenderColumns.reduce(
        (total, currentValue) => {
          return {
            width:
              parseInt(total.width as string, 10) +
              parseInt(currentValue.width as string, 10),
          };
        },
        { width: 0 }
      );
      return res.width;
    }
    return 0;
  }
  @computed get computedTotal() {
    return this.total;
  }
  /**
   *
   * 根据源数据对显示和隐藏列进行过滤
   * @memberof ProTableView
   */
  @action filterColumns() {
    this.unShowColumns = [];
    if (
      this.obTableListCustom.success &&
      this.obTableListCustom.result &&
      this.obTableListCustom.result.modulesUid ===
        this.computedStorageShowColumnsKeys &&
      this.obTableListCustom.result.customColumns.length
    ) {
      localStorage.setItem(
        this.computedStorageShowColumnsKeys,
        JSON.stringify(this.obTableListCustom.result.customColumns)
      ); // 同步服务端列配置数据到缓存
    }
    this.showColumns =
      JSON.parse(localStorage.getItem(this.computedStorageShowColumnsKeys)) ||
      [];
    if (this.showColumns.length === 0) {
      this.columns.map(item => {
        if (!item.noChecked) {
          const index = this.showColumns.findIndex(
            entity => entity.dataIndex === item.dataIndex
          );
          if (index < 0) {
            this.showColumns.push({
              dataIndex: item.dataIndex,
              title: item.label || (item.title as string),
            });
            localStorage.setItem(
              this.computedStorageShowColumnsKeys,
              JSON.stringify(this.showColumns)
            );
          }
        }
        this.unShowColumns.push({
          dataIndex: item.dataIndex,
          title: item.label || (item.title as string),
        }); // 全部列
        /* else {
                      this.unShowColumns.push({dataIndex:item.dataIndex,title:(item.label||item.title as string)})
                  } */
      });
    } else {
      /* this.columns.map((item) => {
                  const index = this.showColumns.findIndex((entity) => entity.dataIndex === item.dataIndex)
                  if (!item.noChecked&&index>-1 ) {
                      this.showColumns.splice(index,1);
                      localStorage.setItem(this.computedStorageShowColumnsKeys,JSON.stringify(this.showColumns));
                  }
              }) */
      this.columns.map(item => {
        this.unShowColumns.push({
          dataIndex: item.dataIndex,
          title: item.label || (item.title as string),
        }); // 全部列
      });
    }
  }
  /**
   * 从显示列移除
   *
   * @param {string[]} Columns
   * @memberof ProTableView
   */
  @action moveRightShowColumns(Columns: string[]) {
    // const newColumns = this.columns.filter(v => Columns.includes(v.dataIndex)).map((item) => { return { dataIndex: item.dataIndex,title: (item.label || item.title as string) } })
    this.showColumns = [];
    Columns.map(item => {
      const entity = this.columns.find(model => model.dataIndex === item);
      if (entity) {
        this.showColumns.push({
          dataIndex: entity.dataIndex,
          title: entity.label || (entity.title as string),
        });
      }
    });
  }

  /**
   * 从显示列接收移除的列
   *
   * @param {string[]} Columns
   * @memberof ProTableView
   */
  @action moveLeftShowColumns(Columns: string[]) {
    // const newColumns = this.columns.filter(v => Columns.includes(v.dataIndex)).map((item) => { return { dataIndex: item.dataIndex,title: (item.label || item.title as string) } })
    this.unShowColumns = [];
    Columns.map(item => {
      const entity = this.columns.find(model => model.dataIndex === item);
      if (entity) {
        this.unShowColumns.push({
          dataIndex: entity.dataIndex,
          title: entity.label || (entity.title as string),
        });
      }
    });
  }

  /**
   * 对显示列进行排序
   *
   * @param {*} Columns
   * @memberof ProTableView
   */
  @action orderSortRightShowColumns(Columns: string[]) {
    // const newColumns = this.columns.filter(v => Columns.includes(v.dataIndex)).map((item) => { return { dataIndex: item.dataIndex,title: (item.label || item.title as string) } })
    this.showColumns = [];
    Columns.map(item => {
      const entity = this.columns.find(model => model.dataIndex === item);
      if (entity) {
        this.showColumns.push({
          dataIndex: entity.dataIndex,
          title: entity.label || (entity.title as string),
        });
      }
    });
  }

  /**
   *
   * 对隐藏列排序
   * @param {string[]} Columns
   * @memberof ProTableView
   */
  @action orderSortLeftShowColumns(Columns: string[]) {
    this.unShowColumns = [];
    Columns.map(item => {
      const entity = this.columns.find(model => model.dataIndex === item);
      if (entity) {
        this.unShowColumns.push({
          dataIndex: entity.dataIndex,
          title: entity.label || (entity.title as string),
        });
      }
    });
  }
  @action setLocalStorageShowColumnsKeys(modulesName?: string) {
    if (modulesName) {
      // 如果自定义了模块名称，则使用自定义的
      let userUid = '';
      try {
        if (this.userInfo && this.userInfo.userUid) {
          userUid = this.userInfo.userUid;
        }
      } catch (e) {}
      this.localStorageShowColumnsKeys = `${shortHash(
        `${modulesName}${userUid}`
      )}`;
      this.tableModulesName = `${modulesName}`;
    }
    /* else {
              if (!this.localStorageShowColumnsKeys) {
                  const obj = this.columns.map((item) => {
                       return {dataIndex:item.dataIndex}
                  })
                  if (obj.length) {
                     this.localStorageShowColumnsKeys =  `${shortHash(obj)}`
                  } else {
                      console.warn('表格列配置数据为空，似乎无法列数据生成唯一hash')
                  }
              }
          } */
  }

  /**
   * 获取显示列缓存信息
   *
   * @memberof ProTableView
   */
  @action getLocalStorageShowColumns(): IShowColumns[] {
    const order = localStorage.getItem(this.computedStorageShowColumnsKeys);
    if (order) {
      return JSON.parse(order);
    }
    return [];
  }

  /**
   *
   * 设置显示列缓存信息并同步到服务端
   * @memberof ProTableView
   */
  @action setLocalStorageShowColumns(url: string) {
    if (this.computedStorageShowColumnsKeys) {
      localStorage.setItem(
        this.computedStorageShowColumnsKeys,
        JSON.stringify(this.computedShowColumns)
      );
      const body = this.computedShowColumns.map(item => {
        return { dataIndex: item.dataIndex, title: item.title };
      });
      this.editTableColumns(this.computedStorageShowColumnsKeys, body, url);
    }
  }

  /**
   * 同步自定义列信息到服务端
   *
   * @param {string} modulesUid
   * @param {Parameters<typeof editTableColumns>[1]} customColumns
   * @memberof ProTableView
   */
  @action async editTableColumns(
    modulesUid: string,
    customColumns: Parameters<typeof editTableColumns>[1],
    url
  ) {
    this.obTableListCustom = await editTableColumns(
      modulesUid,
      customColumns,
      url
    );
  }

  /**
   * 查询自定义列配置数据
   *
   * @param {string} modulesUid
   * @memberof ProTableView
   */
  @action async queryTableColumns(modulesUid: string, url) {
    this.obTableListCustom = await queryTableColumns(modulesUid,url);
  }

  /**
   * 设置表格模块唯一名称
   *
   * @param {string} tableModulesName
   * @memberof ProTableView
   */
  @action setTableModulesName(tableModulesName: string) {
    this.tableModulesName = tableModulesName;
  }
  @action setTotal(total: number) {
    this.total = total;
  }

  /**
   *
   * 控制开启或者取消行选中
   * @param {boolean} isOpenRowChange
   * @memberof ProTableView
   */
  @action updateOpenRowChange(isOpenRowChange: boolean) {
    this.isOpenRowChange = isOpenRowChange;
  }
}
