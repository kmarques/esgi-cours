import React from "react";

const List = ({list}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h2>{list.title}</h2>
        </div>
    );
}

export default List;