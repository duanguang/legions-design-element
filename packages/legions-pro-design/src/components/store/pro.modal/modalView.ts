/*
 * @Author: duanguang
 * @Date: 2020-12-26 17:54:09
 * @LastEditTime: 2020-12-26 17:56:03
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.modal/modalView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { observable, action } from 'legions/store';
import { IResizable } from './interface';
import { computed } from 'mobx';
export class ModalView {
  /**
   * 模态框标题
   *
   * @memberof ModalView
   */
  @observable title: string | React.ReactNode = '';

  /**
   * 模态框是否可见
   *
   * @memberof ModalView
   */
  @observable.ref visible = false;

  /**
   * 模态框宽度
   *
   * @memberof ModalView
   */
  @observable width = 520;

  /**
   *
   *确认按钮文字
   * @memberof ModalView
   */
  @observable okText = '确定';

  /**
   *
   * 取消按钮文字
   * @memberof ModalView
   */
  @observable cancelText = '取消';

  /**
   * 是否启用取消确认按钮
   *
   * @memberof ModalView
   */
  @observable cancelConfirm = false;

  /**
   *确定按钮 loading
   *
   * @memberof ModalView
   */
  //@ts-ignore
  @observable confirmLoading: boolean = null;

  @observable dragData: {
    /**模态框左侧边框线距离body左侧距离 */
    x: number;
    /** 模态框顶部边框线距离顶部距离 */
    y: number;
    dragX: number;
    dragY: number;
    dragging: boolean;
  } = {
    //@ts-ignore
    x: null,
    //@ts-ignore
    y: null,
    //@ts-ignore
    dragX: null,
    //@ts-ignore
    dragY: null,
    dragging: false,
  };

  /**
   * 启用或者禁用拖拽
   *
   * @private
   * @type {boolean}
   * @memberof ModalView
   */
  @observable private resizable: IResizable = {
    enabled: false,
    direction: '',
  };

  @observable resizableData: {
    /**模态框左侧边框线距离body左侧距离 */
    x: number;
    /** 模态框顶部边框线距离顶部距离 */
    y: number;
    /**当前鼠标距离body左侧距离 */
    resizableX: number;
    /** 当前鼠标点距离顶部距离 */
    resizableY: number;
    resizable: boolean;
    /** 模态框顶部边框线距离顶部距离 */
    top: number;
    /** 底部边框线距离顶部距离 */
    bottom: number;
    /** 模态框最右侧边框线距离body左侧距离 */
    right: number;
    /** 模态框左侧边框线距离body左侧距离 */
    left: number;
  } = {
    //@ts-ignore
    x: null,
    //@ts-ignore
    y: null,
    //@ts-ignore
    resizableX: null,
    //@ts-ignore
    resizableY: null,
    resizable: false,
    //@ts-ignore
    top: null,
    //@ts-ignore
    bottom: null,
    //@ts-ignore
    right: null,
    //@ts-ignore
    left: null,
  };

  /** 拖拽缩放时产生的高度在modal-body生效的样式 */
  @observable private oldResizableBodyStyle = null;

  @observable private oldResizableContentStyle = null;

  /**
   *
   * 模态框操作模式，
   * 拖拽，缩放，最大化，还原
   */
  @observable operaModel:
    | 'null'
    | 'resizable'
    | 'draggable'
    | 'maximize'
    | 'reduction' = 'null';
  //@ts-ignore
  @observable placement?: 'left' | 'right' | 'top' | 'bottom' = null;
  /**
   * 底部高度，组件外部请勿直接修改其值
   *
   * @memberof ModalView
   */
  @observable _footerHeight = 0;
  /** 拖拽移动样式信息 */
  @computed get computedDraggableContentStyles() {
    let style = {};
    const customTop = 0;
    const customLeft = 0;
    if (this.dragData.x !== null)
      style['left'] = `${this.dragData.x - customLeft}px`;
    if (this.dragData.y !== null) style['top'] = `${this.dragData.y}px`;
    if (this.dragData.y !== null)
      style['top'] = `${this.dragData.y - customTop}px`;
    return style;
  }
  @computed get computedResizable() {
    return this.resizable;
  }

  /**
   * 模态框大小缩放时 ，body 内容区样式值
   *
   * @readonly
   * @memberof ModalView
   */
  @computed get computedBodyStyle() {
    //@ts-ignore
    let style = { ...this.oldResizableBodyStyle } || {};
    if (
      this.resizableData.resizableY !== null &&
      this.resizableData.resizable
    ) {
      const header = 48;
      const footer = 53;
      if (this.computedResizable.direction === 'bottom') {
        // 在底部边框线缩放时，计算body区域高度值
        const height =
          this.resizableData.resizableY -
          header -
          footer -
          this.resizableData.top;
        style['height'] = `${height}px`;
      }
      if (this.computedResizable.direction === 'top') {
        // 在顶部边框缩放大小时，计算内容区body部分高度值
        const height =
          this.resizableData.bottom - this.resizableData.top - header - footer;
        style['height'] = `${height}px`;
      }
    }
    return style;
  }
  /** 模态框最大化时样式数据 */
  @computed get computedMaximizeContentStyles(): React.CSSProperties {
    if (this.operaModel === 'maximize') {
      return { width: '100%', top: '0px', left: '0px', paddingBottom: '0px' };
    }
    return {};
  }

  /**
   * 模态框大小缩放时，上边距样式值
   */
  @computed get computedResizableContentTopStyles() {
    //@ts-ignore
    let style = { ...this.oldResizableContentStyle } || {};
    if (
      this.resizableData.resizableY !== null &&
      this.resizableData.resizable
    ) {
      const header = 48;
      const footer = 53;
      if (
        this.computedResizable.direction === 'top' &&
        this.resizableData.top !== null
      ) {
        // 在顶部边框缩放大小时，调整上边距大小
        style['top'] = `${this.resizableData.top}px`;
      }
      if (this.computedResizable.direction === 'left') {
        /* const width = this.resizableData.right - this.resizableData.resizableX; */
        if (this.placement !== 'right') {
          style['left'] = `${this.resizableData.resizableX}px`;
        }
      }
    }
    return style;
  }

  /** 模态框拖拽缩放大小样式数据 */
  @computed get computedResizableContentStyles(): React.CSSProperties {
    if (this.operaModel === 'resizable') {
      return this.computedResizableContentTopStyles;
    }
    return {};
  }

  /**** 模态框最大化时模态框内部body部分样式数据 */
  @computed get computedMaximizeBodyStyle(): React.CSSProperties {
    if (this.operaModel === 'maximize') {
      const height = document.body.clientHeight - 48 - this._footerHeight;
      return Object.assign(
        { ...this.computedBodyStyle },
        { height: `${height}px`, overflow: 'auto' }
      );
    }
    return this.computedBodyStyle;
  }

  /**
   * 拖拽缩放图标样式
   *
   * @readonly
   * @type {string}
   * @memberof ModalView
   */
  @computed get computedResizableClasses(): string {
    const style = {
      upperLeft: 'legions-pro-modal-nwse-resizable',
      lowRight: 'legions-pro-modal-nwse-resizable',
      upperRight: 'legions-pro-modal-nesw-resizable',
      leftLower: 'legions-pro-modal-nesw-resizable',
      top: 'legions-pro-modal-ns-resizable',
      bottom: 'legions-pro-modal-ns-resizable',
      left: 'legions-pro-modal-ew-resizable',
      right: 'legions-pro-modal-ew-resizable',
    };
    //@ts-ignore
    return style[this.computedResizable.direction] || '';
  }
  @action asyncResizableBodyStyle(options?: {
    modalType?: 'Drawer' | 'Modal' | 'fullscreen';
    placement?: 'left' | 'right' | 'top' | 'bottom';
  }) {
    let style = {};
    const header = 48;
    const footer = 53;
    if (!this.oldResizableContentStyle) {
      //@ts-ignore
      this.oldResizableContentStyle = {};
    }
    if (this.resizableData.top !== null) {
      //@ts-ignore
      this.oldResizableContentStyle['top'] = `${this.resizableData.top}px`;
      this.dragData.y = this.resizableData.top; // 同步坐标回拖拽坐标数据，防止在进行拖拽时，位置不一致，出现闪回动作
    }
    if (this.computedResizable.direction === 'left') {
      if (
        options &&
        options.modalType === 'Drawer' &&
        options.placement === 'right'
      ) {
        this.width = document.body.clientWidth - this.resizableData.resizableX;
      } else {
        this.width = this.resizableData.right - this.resizableData.resizableX;
        //@ts-ignore
        this.oldResizableContentStyle[
          'left'
        ] = `${this.resizableData.resizableX}px`;
      }
      this.dragData.x = this.resizableData.resizableX; // 同步坐标回拖拽坐标数据，防止在进行拖拽时，位置不一致，出现闪回动作
    }
    if (this.computedResizable.direction === 'right') {
      this.width = this.resizableData.resizableX - this.resizableData.left;
      this.dragData.x = this.resizableData.left;
    }
    if (
      this.computedResizable.direction === 'top' ||
      this.computedResizable.direction === 'bottom'
    ) {
      const height =
        this.resizableData.resizableY -
        header -
        footer -
        this.resizableData.top;
      style['height'] = `${height}px`;
      //@ts-ignore
      this.oldResizableBodyStyle = style;
    }
  }

  /**
   * 当执行拖拽时需要把坐标同步到缩放坐标数据
   * 在拖拽移动结束时触发
   */
  @action asyncResizableData() {
    this.resizableData.top = this.dragData.y;
    this.resizableData.resizableX = this.dragData.x;
    this.resizableData.left = this.dragData.x;
    if (this.oldResizableContentStyle) {
      //@ts-ignore
      this.oldResizableContentStyle['top'] = this.dragData.y;
      //@ts-ignore
      this.oldResizableContentStyle['left'] = this.dragData.x;
    }
  }
  @action updateEnabledResizable(resizable: IResizable) {
    if (resizable.enabled !== undefined) {
      this.resizable.enabled = resizable.enabled;
    }
    if (resizable.direction !== void 0) {
      this.resizable.direction = resizable.direction;
    }
  }

  /**
   * 重置模态框位置，回到居中状态
   *
   * @memberof ModalView
   */
  @action resetDragLocationData() {
    const width = document.body.clientWidth;
    const left = (width - this.width) / 2;
    this.dragData = {
      x: left,
      //@ts-ignore
      y: null,
      //@ts-ignore
      dragX: null,
      //@ts-ignore
      dragY: null,
      dragging: false,
    };
  }
}
