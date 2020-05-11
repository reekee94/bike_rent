export default class ApiService {

    _apiBase = 'http://localhost:5000'

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json()
    }

    deleteData = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
    }

    postData = async (url, data) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return res.json()
    }

    updateData = async (url, data) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} +
                , received ${res.status}`)
        }
        return res.json()
    }

    getAllBikes = async () => {
        const res = await this.getResource(`/bike/`)
        return res
    }

    getBike = async (id) => {
        const res = await this.getResource(`/bike/${id}/`)
        return res
    }

    postBike = async (data) => {
        const res = await this.postData(`/bike/`, data)
        return res
    }

    updateBike = async (id, data) => {
        const res = await this.updateBike(`/bike/${id}/`, data)
        return res
    }
    getSumFromRent = async (id) => {
        const res = await this.getResource(`/rent/${id}/`)
        return res
    }
    totalRent = async (id) => {
        const res = await this.getResource(`/rent/${id}/`)
        return res
    }
}

