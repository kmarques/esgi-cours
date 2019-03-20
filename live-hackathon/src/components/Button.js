import React from "react";
import "../css/button.css";

class MyButton extends React.Component {
    render() {
        console.log(this.props);
        return <button className="button-red" onClick={this.props.handleClick}>mybutton {this.props.themeCss}</button>
    }
}

export default MyButton;