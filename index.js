"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
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
        this.getSvgStyle = () => {
            let style;
            let bottomOrTop = {
                left: `calc(${100 * this.props.shift}% - 10px)`,
            };
            let leftOrRight = {
                top: `calc(${100 * this.props.shift}% - 10px)`,
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
            style.position = 'absolute';
            return style;
        };
    }
    render() {
        const borderColor = this.props.bodyStyle.hasOwnProperty('borderColor') ?
            this.props.bodyStyle.borderColor :
            'black';
        const backgroundColor = this.props.bodyStyle.hasOwnProperty('backgroundColor') ?
            this.props.bodyStyle.backgroundColor :
            'white';
        return (React.createElement("div", { style: Object.assign({ position: 'absolute', zIndex: 999 }, this.props.style) },
            React.createElement("div", { style: Object.assign({ backgroundColor,
                    borderColor, borderRadius: '6px', borderStyle: 'solid', borderWidth: '1px', color: 'black', height: '100%', padding: '20px' }, this.props.bodyStyle) }, this.props.children),
            React.createElement("svg", { fill: backgroundColor, height: "20px", style: this.getSvgStyle(), viewBox: "0 0 30 30", width: "20px" },
                getTipBorder(borderColor)[this.props.orientation],
                polygon[this.props.orientation])));
    }
}
Tooltip.defaultProps = {
    bodyStyle: {},
    orientation: "bottom",
    shift: .5,
    style: {},
};
exports.default = Tooltip;
