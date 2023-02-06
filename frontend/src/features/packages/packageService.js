import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:4000/package'})

export const createPackage = async (packageData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    const response = await API.post('/create', packageData, config)
    return response.data
}

export const addItem = async (itemData, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` ,
            'Content-Type': 'multipart/form-data'  
        },
        params: {
            id
        }
    }
    const response = await API.post('/additem', itemData, config)
    return response.data
}

export const getPackages = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.get('/getpacks', config)
    return response.data
}

export const getAllPackages = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.get('/getall', config)
    return response.data
}