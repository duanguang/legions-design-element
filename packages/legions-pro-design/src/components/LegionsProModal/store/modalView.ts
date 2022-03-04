/*
 * @Author: duanguang
 * @Date: 2020-12-26 17:54:09
 * @LastEditTime: 2022-03-04 10:06:20
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProModal/store/modalView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { observable, action } from 'legions/store';
import { computed } from 'mobx';
import {ILegionsProModal} from '../interface'
export class ModalView {
  @observable _modalType: 'drawer' | 'modal' | 'fullscreen' = 'modal';
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
  @observable visible = false;

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

  /** 扩展数据，可用于存储模态框数据，使用场景，譬如模态框内容区动态控制，可以把条件存储在扩展数据体 */
  @observable extendData: string = '';

  @observable _dragData: {
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
  @observable private _resizable: ILegionsProModal['resizable'] = {
    enabled: false,
    direction: '',
  };

  @observable _resizableData: {
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
  @observable private _oldResizableBodyStyle:React.CSSProperties = null;

  @observable private _oldResizableContentStyle:React.CSSProperties = null;

  /**
   *
   * 模态框操作模式，
   * 拖拽，缩放，最大化，还原
   */
  @observable _operaModel:
    | 'null'
    | 'resizable'
    | 'draggable'
    | 'maximize'
    | 'reduction' = 'null';
  
  @observable _placement?: 'left' | 'right' | 'top' | 'bottom' = null;
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
    if (this._dragData.x !== null)
      style['left'] = `${this._dragData.x - customLeft}px`;
    if (this._dragData.y !== null) style['top'] = `${this._dragData.y}px`;
    if (this._dragData.y !== null)
      style['top'] = `${this._dragData.y - customTop}px`;
    return style;
  }
  @computed get computedResizable() {
    return this._resizable;
  }

  /**
   * 模态框大小缩放时 ，body 内容区样式值
   *
   * @readonly
   * @memberof ModalView
   */
  @computed get computedBodyStyle() {
    let style = { ...this._oldResizableBodyStyle } || {};
    if (
      this._resizableData.resizableY !== null &&
      this._resizableData.resizable
    ) {
      const header = 48;
      const footer = 53;
      if (this.computedResizable.direction === 'bottom') {
        // 在底部边框线缩放时，计算body区域高度值
        const height =
          this._resizableData.resizableY -
          header -
          footer -
          this._resizableData.top;
        style['height'] = `${height}px`;
      }
      if (this.computedResizable.direction === 'top') {
        // 在顶部边框缩放大小时，计算内容区body部分高度值
        const height =
          this._resizableData.bottom - this._resizableData.top - header - footer;
        style['height'] = `${height}px`;
      }
    }
    return style;
  }
  /** 模态框最大化时样式数据 */
  @computed get computedMaximizeContentStyles(): React.CSSProperties {
    if (this._operaModel === 'maximize') {
      return { width: '100%', top: '0px', left: '0px', paddingBottom: '0px' };
    }
    return {};
  }

  /**
   * 模态框大小缩放时，上边距样式值
   */
  @computed get computedResizableContentTopStyles() {
    let style = { ...this._oldResizableContentStyle } || {};
    if (
      this._resizableData.resizableY !== null &&
      this._resizableData.resizable
    ) {
      const header = 48;
      const footer = 53;
      if (
        this.computedResizable.direction === 'top' &&
        this._resizableData.top !== null
      ) {
        // 在顶部边框缩放大小时，调整上边距大小
        style['top'] = `${this._resizableData.top}px`;
      }
      if (this.computedResizable.direction === 'left'&&this._modalType!=='drawer') { //非抽屉模式 以左侧为焦点，向右缩放
        if (this._placement !== 'right') { // 如果抽屉方向是非右侧，则以左侧为中心轴，进行缩放
          style['left'] = `${this._resizableData.resizableX}px`;
        } else if(this._placement==='right'){
          style['right']=`${this._resizableData.right}px`; // 如果抽屉方向右侧，则以右侧方向为中心轴，进行缩放
        }
      }
    }
    return style;
  }

  /** 模态框拖拽缩放大小样式数据 */
  @computed get computedResizableContentStyles(): React.CSSProperties {
    if (this._operaModel === 'resizable') {
      return this.computedResizableContentTopStyles;
    }
    return {};
  }

  /**** 模态框最大化时模态框内部body部分样式数据 */
  @computed get computedMaximizeBodyStyle(): React.CSSProperties {
    if (this._operaModel === 'maximize') {
      const height = document.body.clientHeight - 48 - this._footerHeight;
      return Object.assign(
        { ...this.computedBodyStyle },
        { height: `${height}px`, overflow: 'auto' }
      );
    }
    return this.computedBodyStyle;
  }

  @action _asyncResizableBodyStyle(options?: {
    modalType?: 'drawer' | 'modal' | 'fullscreen';
    placement?: 'left' | 'right' | 'top' | 'bottom';
  }) {
    let style:React.CSSProperties = {};
    const header = 48;
    const footer = 53;
    if (!this._oldResizableContentStyle) {
      this._oldResizableContentStyle = {};
    }
    if (this._resizableData.top !== null) {
      this._oldResizableContentStyle['top'] = `${this._resizableData.top}px`;
      this._dragData.y = this._resizableData.top; // 同步坐标回拖拽坐标数据，防止在进行拖拽时，位置不一致，出现闪回动作
    }
    if (this.computedResizable.direction === 'left') {
      if (
        options &&
        options.modalType === 'drawer' &&
        options.placement === 'right'
      ) {
        this.width = document.body.clientWidth - this._resizableData.resizableX;
      } else {
        this.width = this._resizableData.right - this._resizableData.resizableX;
        this._oldResizableContentStyle[
          'left'
        ] = `${this._resizableData.resizableX}px`;
      }
      this._dragData.x = this._resizableData.resizableX; // 同步坐标回拖拽坐标数据，防止在进行拖拽时，位置不一致，出现闪回动作
    }
    if (this.computedResizable.direction === 'right') {
      this.width = this._resizableData.resizableX - this._resizableData.left;
      this._dragData.x = this._resizableData.left;
    }
    if (
      this.computedResizable.direction === 'top' ||
      this.computedResizable.direction === 'bottom'
    ) {
      const height =
        this._resizableData.resizableY -
        header -
        footer -
        this._resizableData.top;
      style['height'] = `${height}px`;
      style['overflow'] = 'auto';
      this._oldResizableBodyStyle = style;
    }
  }

  /**
   * 当执行拖拽时需要把坐标同步到缩放坐标数据
   * 在拖拽移动结束时触发
   */
  @action _asyncResizableData() {
    this._resizableData.top = this._dragData.y;
    this._resizableData.resizableX = this._dragData.x;
    this._resizableData.left = this._dragData.x;
    if (this._oldResizableContentStyle) {
      this._oldResizableContentStyle['top'] = this._dragData.y;
      this._oldResizableContentStyle['left'] = this._dragData.x;
    }
  }
  @action _updateEnabledResizable(resizable: ILegionsProModal['resizable']) {
    if (resizable.enabled !== undefined) {
      this._resizable.enabled = resizable.enabled;
    }
    if (resizable.direction !== void 0) {
      this._resizable.direction = resizable.direction;
    }
  }

  /**
   * 重置模态框位置，回到居中状态
   *
   * @memberof ModalView
   */
  @action _resetDragLocationData() {
    const width = document.body.clientWidth;
    const left = (width - this.width) / 2;
    this._dragData = {
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
