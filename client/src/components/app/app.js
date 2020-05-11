import React, {useState, useEffect } from 'react'

import List from '../list/list'
import ItemAddForm from "../form/form"
import Service from "../../services/api-service"
import Spinner from "../spinner/spinner"
import './app.css'



const ApiService = new Service()

const App = () => {
    const [appState, setAppState] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    // const [isError, setIsError] = useState(false)

    const fetchAndUpdateState = async () => {
        setIsLoading(true)
        const allBikes = await ApiService.getAllBikes()
        setAppState(allBikes)
        setIsLoading(false)
    }

    // const ErrorHandler = (fn) => {
    //     try {
    //         fn()
    //     } catch {
    //         setIsError(true)
    //     }
    // }

    useEffect(() => {
        fetchAndUpdateState()
    }, [])

    const onToggleRent = async (id, available) => {
        setIsLoading(true)
        await ApiService.updateData(`/bike/${id}`, {
            available: !available
        })
        await fetchAndUpdateState()
    }

    const onDelete = async (id, isAvailable) => {
        if(!isAvailable) {
            setIsLoading(true)
            await ApiService.updateData(`/bike/${id}`, {
                available: true
            })
            await fetchAndUpdateState()
        } else {
            await ApiService.deleteData(`/bike/${id}`)
            await fetchAndUpdateState()
        }
    }

    const onAddNewBike = async (bike) => {
        setIsLoading(true)
        await ApiService.postBike(bike)
        await fetchAndUpdateState()
        setIsLoading(false)
    }

    const availableBikes = appState.filter(item => item.available)
    const rentedBikes = appState.filter(item => !item.available)

    return (
        isLoading ? <Spinner /> :  (
            <div id={'main-div'}>
        <div className={` second-div ${isLoading && 'blur'}`}>
            <h3> Awesome Bike Rental</h3>
            <div>
                <ItemAddForm addNewBike={onAddNewBike} />
                <List id={'rented-bikes'}
                    emoji={'🤩'}
                    key={1}
                    data={rentedBikes}
                    onDelete={onDelete}
                />
                <List id={'available-bikes'}
                    emoji={'🚲'}
                    key={2}
                    available
                    data={availableBikes}
                    onDelete={onDelete}
                    onToggleRent={onToggleRent}
                />
            </div>
        </div>
            </div>
        )
    )
}

export default App
