import React from 'react';
import Emoji from "../emoji/emoji";

import AvailableItem from '../available-item/available-item';


const List = ({ data, available, onToggleRent, onDelete }) => {

    const elements = data.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <div key={id} className="">
                <AvailableItem
                    { ...itemProps }
                    onToggleRent={onToggleRent}
                    onDelete={onDelete}
                />
            </div>
        );
    });

    return (
        <div>
            <h3> <Emoji symbol='🚲' /> {available ? 'Available Bicycles' : 'Rented'} ({elements.length}) </h3>
            <span className="">{ elements }</span>
        </div>
    )
};

export default List;
