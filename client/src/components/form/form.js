import React, {useState} from 'react';
import Service from "../../services/api-service";
import Emoji from "../emoji/emoji";


const ApiService = new Service()

const bike_data = {
    name: '',
    category: '',
    price: ''
}
const ItemAddForm = (props) => {

    let [newBike, setNewBike] = useState(bike_data)


    const handleChange = (event) => {
        event.persist();
        setNewBike(bike_data => ({ ...bike_data, [event.target.name]: event.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await props.addNewBike(newBike);
        setNewBike(bike_data)
    };
        return (
            <span>
                <h3>  <Emoji symbol='🤑' />Create new rent </h3>
                <form
                    className="bottom-panel d-flex"
                    onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Bike name</label>
                        <input type="text"
                            name='name'
                            className="form-control "
                            value={newBike.name}
                            onChange={handleChange}
                            placeholder="Name" />
                    </div>

                    <div className="form-group">
                        <label>Bike type</label>
                        <input type="text"
                            name='category'
                            className="form-control "
                            value={newBike.category}
                            onChange={handleChange}
                            placeholder="Type" />
                   </div>

                   <div className="form-group">
                        <label>Bike price</label>
                        <input type="text"
                            name='price'
                           className="form-control "
                           value={newBike.price}
                           onChange={handleChange}
                           placeholder="Price" />
                   </div>

                    <button type="submit"
                            className="btn btn-success">Add</button>
                </form>
            </span>
        )
}

export default ItemAddForm