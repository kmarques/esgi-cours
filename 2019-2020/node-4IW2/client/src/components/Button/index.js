import React, { useMemo } from "react";

// Old way
class ButtonOld extends React.PureComponent {
  render() {
    return <button onClick={this.props.onClick}>{this.props.title}</button>;
  }
}


// New way
function Button(props) {
  return useMemo(() => <button onClick={props.onClick}>{props.title}</button>, [props.onClick, props.title]);
}

export default Button;