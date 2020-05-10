import React from 'react';
import Emoji from "../emoji/emoji";

import AvailableItem from '../available-item/available-item';


const AvailableList = ({ bikes, onToggleRent, onDelete }) => {

    const elements = bikes.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <div key={id} className="">
                <AvailableItem
                    { ...itemProps }
                    onToggleRent={ () => onToggleRent(id) }
                    onDelete={ () => onDelete(id) } />
            </div>
            // <div>
            //     < RentedItem />
            // </div>
        );
    });

    return (
        <div>
            <h3> <Emoji symbol='🚲' /> Available Bicycles ({elements.length}) </h3>
            <span className="">{ elements }</span>
        </div>
    )
};

export default AvailableList;
