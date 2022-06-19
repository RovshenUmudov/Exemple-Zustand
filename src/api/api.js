import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
})

const api = {
    getPhotos: (count) => {
        return instance(`photos?_start=${count}&_limit=1`).then(res => res.data)
    }
}

export default api