import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:4000/food' })

export const createFood = async (foodData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    const response = await API.post('/create', foodData, config)
    return response.data
}

export const getFoods = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.get('/getfoods', config)
    return response.data
}

export const getSupplierFoods = async (supplierId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            supplierId
        }
    }
    const response = await API.get('/supplierfood', config)
    return response.data
}

export const deleteItem = async(foodId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            foodId
        }
    }
    const response = await API.delete('/deleteitem', config)
    return response.data
}