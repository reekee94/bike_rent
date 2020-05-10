export default class ApiService {

    _apiBase = 'http://localhost:5000';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    deleteData = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} +
                , received ${res.status}`);
        }
        return await res.json();
    }

    postData = async (url, data) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    getAllBikes = async () => {
        const res = await this.getResource(`/bike/`);
        return res;
    };

    getBike = async (id) => {
        const res = await this.getResource(`/bike/${id}/`);
        return res
    };

    postBike = async (data) => {
        const res = await this.postData(`/bike/`, data);
        return res
    };

    deleteBike = async (id) => {
        const res = await this.deleteData(`/bike/${id}/`);
        return res
    };
};

