import React, { useMemo } from "react";

// Old way
class ButtonOld extends React.PureComponent {
  render() {
    return <button onClick={this.props.onClick}>{this.props.title}</button>;
  }
}


// New way
function Button(props) {
  return <button onClick={props.onClick}>{props.title}</button>;
}

export default Button;