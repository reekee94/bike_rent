import React from 'react'
import './item.css'


const Item = ({ name, category, price, available, rentStarted, onToggleRent, onDelete, _id }) => {
    const dateEnd = Date.now()
    const bill = Math.ceil((dateEnd - rentStarted) / 3600000 % 24) * price
    return (
        <span className={'item-span'} >
        <span className=""> {name} / {category} / {available ? price : bill} / {available} </span>

        { available ? <button type="button"
            className=" btn btn-primary"
            onClick={() => onToggleRent(_id, available)}> Rent </button>: undefined }

        <button type="button"
            className=" btn btn-danger"
            onClick={() => onDelete(_id, available)}> {available ? 'Delete' : 'Cancel Rent'} </button>
    </span>
    )
}

export default Item