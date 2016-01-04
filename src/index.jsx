import React from "react";
import cx from "classnames";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

// Map of polygons. The key is confusing, it is the orientation
// of the tooltip. When the orientation of the tooltip is `bottom`
// the tooltip is located at the top.
const polygon = {
	bottom: <polygon points="15,12 0,30 30,30 15,12"/>,
	left: <polygon points="0,0 18,15 0,30 0,0"/>,
	right: <polygon points="30,0 30,30 12,15, 30,0"/>,
	top: <polygon points="0,0 30,0 15,18 0,0"/>
}

let getTipBorder = (strokeColor) => {
	return {
		bottom: <path d="M0,30 L15,12 L30,30" stroke={strokeColor} strokeWidth="3" />,
		left: <path d="M0,30 L15,12 L30,30" stroke={strokeColor} strokeWidth="3" />,
		right: <path d="M0,30 L15,12 L30,30" stroke={strokeColor} strokeWidth="3" />,
		top: <path d="M0,30 L15,12 L30,30" stroke={strokeColor} strokeWidth="3" />
	};
}



class Tooltip extends React.Component {
	getStyle() {
		let style;

		let bottomOrTop = {
			left: `calc(${100 * this.props.shift}% - 10px)`
		}

		let leftOrRight = {
			top: `calc(${100 * this.props.shift}% - 10px)`
		}

		switch (this.props.orientation) {
			case "bottom":
				bottomOrTop.top = "-19px";
				style = bottomOrTop;

				break;

			case "top":
				bottomOrTop.bottom = "-19px";
				style = bottomOrTop;

				break;

			case "left":
				leftOrRight.right = "-19px";
				style = leftOrRight;

				break;

			case "right":
				leftOrRight.left = "-19px";
				style = leftOrRight;

				break;

		}

		return style;
	}

	render() {
		let tipBorder;

		let bodyStyle = {
			backgroundColor: this.props.backgroundColor,
			color: this.props.textColor
		}

		if (this.props.borderColor != null) {
			bodyStyle.border = `1px solid ${this.props.borderColor}`;
			tipBorder = getTipBorder(this.props.borderColor)[this.props.orientation];
		}

		return (
			<div className={cx(
				"hire-tooltip",
				this.props.className,
				this.props.orientation
			)}>
				<div
					className="hire-tooltip-body"
					style={bodyStyle}
				>
					{this.props.children}
				</div>
				<svg
					fill={this.props.backgroundColor}
					height="20px"
					style={this.getStyle()}
					viewBox="0 0 30 30"
					width="20px">
					{tipBorder}
					{polygon[this.props.orientation]}
				</svg>
			</div>
		);
	}
}

Tooltip.defaultProps = {
	backgroundColor: "white",
	orientation: "bottom",
	shift: .5,
	textColor: "black"
};

Tooltip.propTypes = {
	backgroundColor: React.PropTypes.string,
	borderColor: React.PropTypes.string,
	className: React.PropTypes.string,
	orientation: React.PropTypes.oneOf(["top", "right", "bottom", "left"]),
	shift: (props, propName, componentName) => {
		let value = parseFloat(props[propName]);

		if (isNaN(value)) {
			return new Error("`Shift` should be a number");
		}

		if (value < 0 || value > 1) {
			return new Error("`Shift` should be a number between 0 and 1");
		}
	},
	textColor: React.PropTypes.string
};

export default Tooltip;