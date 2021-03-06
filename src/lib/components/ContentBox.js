import React from 'react';
import PropTypes from 'prop-types';
import style from './ContentBox.module.scss';

class ContentBox extends React.Component {
	renderTitle() {
		let className = style.title + " " + style[this.props.titleSize];
		if (this.props.title){
			return <h2 className={className}>{ this.props.title }</h2>;
		}else {
			return
		}
	}
	render () {
		let colorClass = " " + style[this.props.color];
		let linkClass = this.props.href ? " " + style.link : "";
		let className = style.contentBox + colorClass + linkClass;
		if (this.props.href) {
			return (
				<a href={this.props.href} className={className}>
					{this.renderTitle()}
					<div className={style.content}>{this.props.content}</div>
				</a>
				)
		}else {
			return (
				<div className={className}>
					{this.renderTitle()}
					<div className={style.content}>{this.props.content}</div>
				</div>
				)
		}
	}
}

ContentBox.propTypes = {
	/** Content title inside box */
	title: PropTypes.string,
	titleSize: PropTypes.oneOf(['regular', 'large']),
	/** Text content inside box */
	content: PropTypes.string,
	color: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'info', 'lightCyan', 'orange', 'lightOrange', 'lime', 'lightLime']),
}

ContentBox.defaultProps = {
	title: null,
	titleSize: 'regular',
	href: null,
	content: '',
	color: 'default'
}

export default ContentBox;
