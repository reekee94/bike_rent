import React, {useState, useEffect } from 'react';

import List from '../list/list';
import ItemAddForm from "../form/form";
import Service from "../../services/api-service";


const ApiService = new Service()

const App = () => {
    const [appState, setAppState] = useState([]);

    const fetchAndUpdateState = async () => {
        const allBikes = await ApiService.getAllBikes();
        setAppState(allBikes);
    }
    const updateApp = async () => {
        fetchAndUpdateState();
    }
    React.useEffect(fetchAndUpdateState, []);

    const onToggleRent = (id) => {
        console.log(id);
        // запапатчити 
        // і апдейнути updateApp();
    }

    const onDelete = (id) => {
        console.log(id);
        ApiService.deleteBike(id);
        updateApp();
    }

    const availableBikes = appState.filter(item =>  item.available === true);
    const rentedBikes = appState.filter(item =>  item.available === false);

    return (
        <div className="p-3 mb-2 bg-light text-dark">
            <button onClick={updateApp}>Update</button>
            <h1> Awesome Bike Rental</h1>
            <div>
                <ItemAddForm />
                <List
                    available
                    data={rentedBikes}
                    onDelete={onDelete}
                    onToggleRent={onToggleRent}
                />
                <List
                    data={availableBikes}
                    onDelete={onDelete}
                    onToggleRent={onToggleRent}
                />
            </div>
        </div>
    );
};

export default App;
