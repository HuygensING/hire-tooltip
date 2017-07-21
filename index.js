"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cx = require("classnames");
const polygon = {
    bottom: React.createElement("polygon", { points: "15,12 0,30 30,30 15,12" }),
    left: React.createElement("polygon", { points: "0,0 18,15 0,30 0,0" }),
    right: React.createElement("polygon", { points: "30,0 30,30 12,15, 30,0" }),
    top: React.createElement("polygon", { points: "0,0 30,0 15,18 0,0" })
};
let getTipBorder = (strokeColor) => {
    return {
        bottom: React.createElement("path", { d: "M0,30 L15,12 L30,30", stroke: strokeColor, strokeWidth: "3" }),
        left: React.createElement("path", { d: "M0,30 L15,12 L30,30", stroke: strokeColor, strokeWidth: "3" }),
        right: React.createElement("path", { d: "M0,30 L15,12 L30,30", stroke: strokeColor, strokeWidth: "3" }),
        top: React.createElement("path", { d: "M0,30 L15,12 L30,30", stroke: strokeColor, strokeWidth: "3" })
    };
};
class Tooltip extends React.Component {
    constructor() {
        super(...arguments);
        this.getStyle = () => {
            let style;
            let bottomOrTop = {
                left: `calc(${100 * this.props.shift}% - 10px)`,
                position: 'absolute',
            };
            let leftOrRight = {
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
        };
    }
    render() {
        let tipBorder;
        let bodyStyle = {
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
        return (React.createElement("div", { className: cx("hire-tooltip", this.props.className, this.props.orientation), style: { position: 'absolute' } },
            React.createElement("div", { className: "hire-tooltip-body", style: bodyStyle }, this.props.children),
            React.createElement("svg", { fill: this.props.backgroundColor, height: "20px", style: this.getStyle(), viewBox: "0 0 30 30", width: "20px" },
                tipBorder,
                polygon[this.props.orientation])));
    }
}
Tooltip.defaultProps = {
    backgroundColor: "white",
    orientation: "bottom",
    shift: .5,
    textColor: "black"
};
exports.default = Tooltip;
