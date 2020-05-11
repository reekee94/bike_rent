import React from 'react';
import Emoji from "../emoji/emoji";

import Item from '../available-item/item';


const List = ({ data, available, onToggleRent, onDelete, emoji }) => {
    const totalBill = data.map(item => item.price * Math.ceil((Date.now() - item.rentStarted) / 3600000 % 24))
        .reduce((prev, curr) => prev + curr, 0)
    const elements = data.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <div key={id} className="">
                <Item
                    { ...itemProps }
                    onToggleRent={onToggleRent}
                    onDelete={onDelete}
                />
            </div>
        );
    });

    return (
        <div>
            <h5> <Emoji symbol={emoji} />
            {available ? 'Available Bicycles' : 'Rented'} {available ? `(${elements.length})` : `(Total:$${totalBill})`}
            </h5>
            <span className="">{ elements }</span>
        </div>
    )
};

export default List;
