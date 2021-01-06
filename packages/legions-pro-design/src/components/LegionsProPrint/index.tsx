/* 打印页面选定区域内容
 * @Author: gregn
 * @url: https://github.com/gregnb/react-to-print
 * @Date: 2019-07-25 19:32:40
 * @Last Modified by: duanguang
 * @Last Modified time: 2019-07-29 19:25:21
 */
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { IProPrintProps } from './interface';

/** 排版方向 */
enum Direction {
    /** 横向 */
    horizontal,
    /** 纵向 */
    vertical,
}
/** 打印页面选定区域内容 */
export default class HLPrint extends React.Component<IProPrintProps> {
    triggerRef: React.Ref<HTMLElement>;
    linkTotal: number;
    linksLoaded: Element[];
    linksErrored: Element[];

    componentDidMount() {
        this.props.debug && this.handlePrint()
    }

    startPrint = (target, onAfterPrint) => {
        setTimeout(() => {
            target.contentWindow.focus();
            target.contentWindow.print();

            if (onAfterPrint) {
                onAfterPrint();
            }
        }, 500);
    }

    triggerPrint = (target) => {
        const { onBeforePrint, onAfterPrint } = this.props;

        if (onBeforePrint) {
            const onBeforePrintOutput = onBeforePrint();
            if (onBeforePrintOutput && typeof onBeforePrintOutput.then.bind(this) === 'function') {
                onBeforePrintOutput.then(() => {
                    this.startPrint(target, onAfterPrint);
                });
            } else {
                this.startPrint(target, onAfterPrint);
            }
        } else {
            this.startPrint(target, onAfterPrint);
        }
    };

    handlePrint = () => {
        const {
            bodyClass = '',
            content,
            copyStyles = true,
            pageStyle,
            debug = false,
        } = this.props;

        const contentEl = content();

        if (contentEl === undefined) {
            console.error('Refs are not available for stateless components. For "react-to-print" to work only Class based components can be printed');
            return;
        }

        const printWindowWrap = document.createElement('div');
        const printWindow = document.createElement('iframe');
        const a4Size = this.getA4Size();
        const scrollBarWidth = 20;
        let direction = Direction.vertical;
        printWindowWrap.style.position = 'fixed';
        printWindowWrap.style.display = 'flex';
        printWindowWrap.style.justifyContent = 'center';
        printWindowWrap.style.top = '-1000px';
        printWindowWrap.style.left = '-1000px';
        printWindowWrap.style.backgroundColor = 'rgba(0,0,0,0.7)';
        printWindowWrap.style.border = '0';
        printWindowWrap.id = 'printWindowWrap';
        printWindow.style.width = `${a4Size.a4w + scrollBarWidth}px`;
        printWindow.style.height = '100%';
        printWindow.style.border = '0';
        printWindowWrap.appendChild(printWindow);

        /** debug模式下，显示打印排版 */
        if (debug) {
            /** 显示打印容器 */
            printWindowWrap.style.top = '0';
            printWindowWrap.style.left = '0';
            printWindowWrap.style.width = '100%';
            printWindowWrap.style.height = '100%';
            printWindowWrap.style.zIndex = '1000000';

            /** 按钮容器 */
            const btnWrap = document.createElement('div');

            /** 添加切换方向按钮 */
            const transformBtn = document.createElement('button');
            transformBtn.innerText = '切换方向';
            transformBtn.style.display = 'block';
            transformBtn.style.width = '80px';
            transformBtn.style.height = '30px';
            transformBtn.style.margin = '10px 10px 0 10px';
            transformBtn.onclick = () => {
                direction = direction === Direction.vertical ? Direction.horizontal : Direction.vertical;
                const width = direction === Direction.vertical ? a4Size.a4w : a4Size.a4h;
                printWindow.style.width = `${width + scrollBarWidth}px`;
            }
            btnWrap.appendChild(transformBtn)

            /** 添加打印按钮 */
            const printBtn = document.createElement('button');
            printBtn.innerText = '打印';
            printBtn.style.display = 'block';
            printBtn.style.width = '80px';
            printBtn.style.height = '30px';
            printBtn.style.margin = '10px 10px 0 10px';
            printBtn.onclick = () => this.triggerPrint(printWindow);
            btnWrap.appendChild(printBtn)

            /** 添加关闭按钮 */
            const closeBtn = document.createElement('button');
            closeBtn.innerText = '关闭';
            closeBtn.style.display = 'block';
            closeBtn.style.width = '80px';
            closeBtn.style.height = '30px';
            closeBtn.style.margin = '10px 10px 0 10px';
            closeBtn.onclick = () => {
                document.body.removeChild(document.getElementById('printWindowWrap'));
            }
            btnWrap.appendChild(closeBtn);

            printWindowWrap.appendChild(btnWrap);
        }

        const contentNodes = findDOMNode(contentEl);
        const linkNodes = document.querySelectorAll('link[rel="stylesheet"]');

        this.linkTotal = linkNodes.length || 0;
        this.linksLoaded = [];
        this.linksErrored = [];

        const markLoaded = (linkNode, loaded) => {
            if (loaded) {
                this.linksLoaded.push(linkNode);
            } else {
                console.error(`"react-to-print" was unable to load a link. It may be invalid. 'react-to-print' will continue attempting to print the page. The link the errored was:`, linkNode);
                this.linksErrored.push(linkNode);
            }

            if (this.linksLoaded.length + this.linksErrored.length === this.linkTotal) {
                !debug && this.triggerPrint(printWindow);
            }
        };

        printWindow.onload = () => {
            /* IE11 support */
            if (window.navigator && window.navigator.userAgent.indexOf('Trident/7.0') > -1) {
                printWindow.onload = null;
            }

            const domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
            const srcCanvasEls = (contentNodes as HTMLCanvasElement).querySelectorAll('canvas');

            domDoc.open();
            domDoc.write((contentNodes as HTMLCanvasElement).outerHTML);
            domDoc.close();

            /* remove date/time from top */
            const defaultPageStyle = pageStyle === undefined
                ? '@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }'
                : pageStyle;

            const styleEl = domDoc.createElement('style');
            styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
            domDoc.head.appendChild(styleEl);

            if (bodyClass.length) {
                domDoc.body.classList.add(bodyClass);
                domDoc.body.style.overflowY = 'scorll'
            }

            const canvasEls = domDoc.querySelectorAll('canvas');
            for (let index = 0, l = canvasEls.length; index < l; ++index) {
                const node = canvasEls[index];
                node.getContext('2d').drawImage(srcCanvasEls[index], 0, 0);
            }

            if (copyStyles !== false) {
                const headEls = document.querySelectorAll('style, link[rel="stylesheet"]');

                for (let index = 0, l = headEls.length; index < l; ++index) {
                    const node = headEls[index];
                    if (node.tagName === 'STYLE') {
                        const newHeadEl = domDoc.createElement(node.tagName);
                        const sheet = (node as HTMLStyleElement).sheet as CSSStyleSheet;

                        if (sheet) {
                            let styleCSS = '';
                            // tslint:disable-next-line
                            for (let i = 0; i < sheet.cssRules.length; i++) {
                                if (typeof sheet.cssRules[i].cssText === 'string') {
                                    styleCSS += `${sheet.cssRules[i].cssText}\r\n`;
                                }
                            }
                            newHeadEl.setAttribute('id', `react-to-print-${index}`);
                            newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
                            domDoc.head.appendChild(newHeadEl);
                        }
                    } else {
                        if (node.hasAttribute('href') && !!node.getAttribute('href')) {
                            const newHeadEl = domDoc.createElement(node.tagName);
                            for (let i = 0, l = node.attributes.length; i < l; ++i) {
                                const attr = node.attributes[i];
                                newHeadEl.setAttribute(attr.nodeName, attr.nodeValue);
                            }

                            newHeadEl.onload = markLoaded.bind(null, newHeadEl, true);
                            newHeadEl.onerror = markLoaded.bind(null, newHeadEl, false);
                            domDoc.head.appendChild(newHeadEl);
                        } else {
                            console.warn('"react-to-print" encountered a <link> tag with an empty "href" attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:', node);
                            markLoaded(node, true); // `true` because we've already shown a warning for this
                        }
                    }
                }
            }

            if (this.linkTotal === 0 || copyStyles === false) {
                !debug && this.triggerPrint(printWindow);
            }
        };


        if (document.getElementById('printWindowWrap')) {
            document.body.removeChild(document.getElementById('printWindowWrap'));
        }
        document.body.appendChild(printWindowWrap);
    };

    setRef = (ref) => {
        this.triggerRef = ref;
    };

    /** 根据屏幕DPI，计算A4尺寸 */
    getA4Size() {
        let tmpNode = document.createElement('div');
        /* 浏览器A4宽度：dpi/inch * standardWdith */
        let dpi = 96 // 默认屏幕dpi
        const inch = 25.4; // 一英寸为25.4毫米
        const standardWdith = 210; // A4标准宽度210
        const standardHeight = 297 // A4标准高度297
        tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
        document.body.appendChild(tmpNode);
        dpi = tmpNode.offsetWidth
        tmpNode.parentNode.removeChild(tmpNode);
        return {
            a4w: dpi/inch * standardWdith,
            a4h: dpi/inch * standardHeight,
        }
    }

    render() {
        const {
            trigger,
        } = this.props;

        return React.cloneElement(trigger(), {
            onClick: this.handlePrint,
            ref: this.setRef,
        });
    }
}
