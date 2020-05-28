import React, { useMemo } from "react";

// OLD WAY
class Button2 extends React.PureComponent {
  render() {
    return <button onClick={this.props.onClick}>{this.props.title}</button>;
  }
}

// NEW WAY
function Button(props) {
  return useMemo(
    () => (
      <button style={{ color: props.color }} onClick={props.onClick}>
        {props.children}
      </button>
    ),
    [props.color, props.title]
  );
}

export default Button;
