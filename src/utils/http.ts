import instance from "./request"

const http = {
    get: (url: string, params?: object) => {
        return instance({
            url,
            method: 'GET',
            params
        })
    },
    post: (url: string, data?: object) => {
        return instance({
            url,
            method: 'POST',
            data
        })
    },
    delete: (url: string, data?: object) => {
        return instance({
            url,
            method: 'DELETE',
            data
        })
    },
    put: (url: string, data?: object) => {
        return instance({
            url,
            method: 'PUT',
            data
        })
    },
}

export default http;