import React from "react";

class MyList extends React.Component {
    render() {
        return <ul>
            {this.props.data.map((item) => <li>
                {item[this.props.text]}
            </li>)}
        </ul>;
    }
}

export default MyList;