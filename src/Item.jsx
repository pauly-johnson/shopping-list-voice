import React from 'react';

const Item = ({ name, price }) => {
    return (
        <div className="item">
            <h2>{name}</h2>
            <p>Price: ${price}</p>
        </div>
    );
};

export default Item;