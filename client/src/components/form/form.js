import React, { useState, useEffect, useRef } from 'react'
import Emoji from "../emoji/emoji"
import './form.css'


const bike_data = {
    name: '',
    category: 'Custom',
    price: ''
}
const ItemAddForm = (props) => {
    const firstRender = useRef(true)
    const [disable, setDisabled] = useState(true)
    const [nameError, setNameError] = useState(null)
    const [newBike, setNewBike] = useState(bike_data)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        setDisabled(formValidation())

    }, [newBike])

    const formValidation = () => {
        const rePrice = /^([0-9]{0,2}((.)[0-9]{0,2}))$/gm
        const reName = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,32}$/g
        if (!rePrice.test(newBike.price)) {
            setNameError('Not a valid price')
            return true
        } else if (!reName.test(newBike.name)) {
            setNameError('Name can be min 3 and max 32 symbols')
            return true
        } else {
            setNameError(null)
            return false
        }
    }

    const handleChange = (event) => {
        event.persist()
        setNewBike(bike_data => ({ ...bike_data, [event.target.name]: event.target.value }))
        console.log(newBike)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await props.addNewBike(newBike)
        setNewBike(bike_data)
    }
        return (
            <span>
                <h5>  <Emoji symbol='🤑' />Create new rent </h5>
                { nameError && <p>{nameError}</p> }
                <form
                    className="form"
                    onSubmit={onSubmit}>
                    <div className="">
                        <label>Bike name</label>
                        <input type="text"
                            name='name'
                            className="form-control "
                            value={newBike.name}
                            onChange={handleChange}
                            placeholder="Name" />
                    </div>
                    <div className="">
                        <label>Bike type</label>
                        <select name="category"
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Type"
                                value={newBike.category}>
                            <option selected>Custom</option>
                            <option>Road</option>
                            <option>Mountain</option>
                            <option>Speed</option>
                        </select>

                   </div>

                   <div className="">
                        <label>Bike price</label>
                        <input type="text"
                            name='price'
                           className="form-control "
                           value={newBike.price}
                           onChange={handleChange}
                           placeholder="Price" />
                   </div>

                <button type="submit"
                        disabled={disable}
                        className="button-form btn btn-success">Submit rent</button>
                </form>
            </span>
        )
}

export default ItemAddForm