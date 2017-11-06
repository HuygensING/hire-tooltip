/// <reference types="react" />
import * as React from "react";
export interface IProps {
    bodyStyle?: React.CSSProperties;
    orientation?: "top" | "right" | "bottom" | "left";
    shift?: number;
    style?: React.CSSProperties;
}
declare class Tooltip extends React.Component<IProps, null> {
    static defaultProps: IProps;
    render(): JSX.Element;
    private getSvgStyle;
}
export default Tooltip;
