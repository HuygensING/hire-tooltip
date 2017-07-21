import * as React from "react";
import * as cx from "classnames";

// Map of polygons. The key is confusing, it is the orientation
// of the tooltip. When the orientation of the tooltip is `bottom`
// the tooltip is located at the top.
const polygon = {
	bottom: <polygon points="15,12 0,30 30,30 15,12"/>,
	left: <polygon points="0,0 18,15 0,30 0,0"/>,
	right: <polygon points="30,0 30,30 12,15, 30,0"/>,
	top: <polygon points="0,0 30,0 15,18 0,0"/>
};

let getTipBorder = (strokeColor) => {
	return {
		bottom: <path d="M0,30 L15,12 L30,30" stroke={strokeColor} strokeWidth="3" />,
		left: <path d="M0,30 L15,12 L30,30" stroke={strokeColor} strokeWidth="3" />,
		right: <path d="M0,30 L15,12 L30,30" stroke={strokeColor} strokeWidth="3" />,
		top: <path d="M0,30 L15,12 L30,30" stroke={strokeColor} strokeWidth="3" />
	};
};

interface IProps {
	backgroundColor?: string;
	borderColor?: string;
	className?: string;
	orientation?: "top" | "right" | "bottom" | "left";
	shift?: number;
	textColor?: string;
}

class Tooltip extends React.Component<IProps, null> {
	public static defaultProps: IProps = {
		backgroundColor: "white",
		orientation: "bottom",
		shift: .5,
		textColor: "black"
	};

	public render() {
		let tipBorder;

		let bodyStyle: any = {
			backgroundColor: this.props.backgroundColor,
			borderRadius: '6px',
			color: this.props.textColor,
			height: '100%',
			padding: '20px',
		};

		if (this.props.borderColor != null) {
			bodyStyle.border = `1px solid ${this.props.borderColor}`;
			tipBorder = getTipBorder(this.props.borderColor)[this.props.orientation];
		}

		return (
			<div
				className={cx(
					"hire-tooltip",
					this.props.className,
					this.props.orientation
				)}
			  style={{position: 'absolute'}}
			>
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

	private getStyle = () => {
		let style;

		let bottomOrTop: any = {
			left: `calc(${100 * this.props.shift}% - 10px)`,
			position: 'absolute',
		};

		let leftOrRight: any = {
			top: `calc(${100 * this.props.shift}% - 10px)`,
			position: 'absolute',
		};

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

}

export default Tooltip;