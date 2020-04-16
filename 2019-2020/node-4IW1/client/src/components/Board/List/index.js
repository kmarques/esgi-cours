import React from 'react';

const List = ({list}) => {
    return <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
        {list.name}
    </div>
}

export default List;