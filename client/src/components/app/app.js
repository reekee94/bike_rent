import React, {useState, useEffect } from 'react';

import List from '../list/list';
import ItemAddForm from "../form/form";
import Service from "../../services/api-service";
import Spinner from "../spinner/spinner";
import './app.css'



const ApiService = new Service()

const App = () => {
    const [appState, setAppState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchAndUpdateState = async () => {
        console.log('fired')
        setIsLoading(true);
        const allBikes = await ApiService.getAllBikes();
        setAppState(allBikes);
        setIsLoading(false);
    }

    const asdf = (fn) => {
        try {
            fn()
        } catch {
            setIsError(true)
        }
    } 

    useEffect(() => {
        fetchAndUpdateState()
    }, []);

    const onToggleRent = async (id, available) => {
        setIsLoading(true)
        await ApiService.updateData(`/bike/${id}`, {
            available: !available
        });
        await fetchAndUpdateState();
    }

    const onDelete = async (id, isAvailable) => {
        if(!isAvailable) {
            setIsLoading(true);
            await ApiService.updateData(`/bike/${id}`, {
                available: true
            });
            await fetchAndUpdateState();
        } else {
            try{await ApiService.deleteData(`/bike/${id}`);} catch{setIsError(true)}
            await fetchAndUpdateState();
        }
    }

    const onAddNewBike = async (bike) => {
        setIsLoading(true);
        await ApiService.postBike(bike);
        await fetchAndUpdateState();
        setIsLoading(false);
    }

    const availableBikes = appState.filter(item => item.available);
    const rentedBikes = appState.filter(item => !item.available);

    return (
        /* isLoading ? <Spinner /> : isError ? <div>something went wrong</div> : */ (
        <div className={`p-3 mb-2 bg-light text-dark ${isLoading && 'blur'}`}>
            <h1> Awesome Bike Rental</h1>
            <div>
                <ItemAddForm addNewBike={onAddNewBike} />
                <List
                    key={1}
                    data={rentedBikes}
                    onDelete={onDelete}
                    onToggleRent={onToggleRent}
                />
                <List
                    key={2}
                    available
                    data={availableBikes}
                    onDelete={onDelete}
                    onToggleRent={onToggleRent}
                />
            </div>
        </div>
        )
    );
};

export default App;
