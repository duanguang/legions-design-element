import React from 'react'
const { PureComponent,Component } = React
// const PropTypes = require("prop-types")
import PropTypes,{ string } from 'prop-types'
const objectAssign = require("object-assign")
import { NProgress } from 'legions-nprogress'
function noop() { }
interface IProps {
	url: string
	allowFullScreen?: boolean
	position?: string
	display?: string
	height?: string
	width?: string
	styles?: object
	name?: string
	onLoad?: any
	onMouseOver?: any
	onMouseOut?: any
	id?: string
	sandbox?: string
	allow?: string
	className?: string
	title?: string
	ariaHidden?: boolean;
	/** 初次加载完成 */
	onFirstLoaded?: () => void;
}
const LegionsProIframe = class extends Component<IProps,{}> {
	// static propTypes={}
	componentWillMount() {
		NProgress.start();
	}
	componentDidUpdate() {
		/* let iframe = document.getElementsByTagName("iframe");
		iframe['setAttribute']('webkitallowfullscreen', true); */
		/*  NProgress.done() */
	}
	componentDidMount() {
		this.props.onFirstLoaded && this.props.onFirstLoaded();
		NProgress.done()
	}
	render() {
		const props = {
			ref: "iframe",
			frameBorder: "0",
			src: this.props.url,
			target: "_parent",
			allowFullScreen: this.props.allowFullScreen || false,
			style: objectAssign(
				{},
				{
					position: this.props.position || "absolute",
					display: this.props.display || "block",
					height: this.props.height || "100%",
					width: this.props.width || "100%",
					padding: '0px',
					margin: '0px'
				},
				this.props.styles || {}
			),
			height: this.props.height || "100%",
			name: this.props.name || "",
			width: this.props.width || "100%",
			onLoad: this.props.onLoad || noop,
			onMouseOver: this.props.onMouseOver || noop,
			onMouseOut: this.props.onMouseOut || noop,
			// msallowfullscreen:true,
			// oallowfullscreen:true,
			// mozallowfullscreen:true ,
			// webkitallowfullscreen:"true"
		}
		return React.createElement(
			"iframe",
			objectAssign(
				props,
				this.props.id ? { id: this.props.id } : {},
				this.props.sandbox ? { sandbox: this.props.sandbox } : {},
				this.props.allow ? { allow: this.props.allow } : {},
				this.props.className ? { className: this.props.className } : {},
				this.props.title ? { title: this.props.title } : {},
				this.props.ariaHidden ? { "aria-hidden": "true" } : {},
				// {scrolling:"no"}
				// {webkitallowfullscreen:true}
			)
		)
	}
}
// Iframe.propTypes = {
// 	url: PropTypes.string.isRequired,
// 	id: PropTypes.string,
// 	title: PropTypes.string,
// 	className: PropTypes.string,
// 	width: PropTypes.string,
// 	position: PropTypes.string,
// 	display: PropTypes.string,
// 	name: PropTypes.string,
// 	height: PropTypes.string,
// 	onLoad: PropTypes.func,
// 	sandbox: PropTypes.string,
// 	allow: PropTypes.string,
// 	onMouseOver: PropTypes.func,
// 	onMouseOut: PropTypes.func,
// 	styles: PropTypes.object,
// 	allowFullScreen: PropTypes.bool,
// 	ariaHidden: PropTypes.bool
// }
export default LegionsProIframe