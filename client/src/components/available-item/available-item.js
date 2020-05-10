import React from 'react';


const AvailableItem = ({ name, category, price, available, onToggleRent, onDelete, _id }) => {
    return (
        <span >
        <span className=""> {name}, {category}, {price}, {available} </span>

        <button type="button"
            className="btn-primary"
            onClick={() => onToggleRent(_id)}> Rent </button>

      <button type="button"
            className="btn-danger"
            onClick={() => onDelete(_id)}> Delete </button>
    </span>
    );
};

export default AvailableItem;