import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:4000/order'})

export const createAddress = async(data) => {
    const storageData = await JSON.parse(localStorage.getItem('profile'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.Token}`
            }
        }

        const response = await API.post('/address', {data}, config)
        return response.data
    } catch (err) {
        console.log(err.data.message)
        return err.data.message    
    }
}

export const getAddresses = async() => {
    const storageData = await JSON.parse(localStorage.getItem('profile'))

    try {
        const config = { 
            headers: {
                Authorization: `Bearer ${storageData.Token}`
            }
        }

        const response = await API.get('/getaddresses', config)
        return response.data
    } catch (err) {
        return err.data.message
    }
}

export const razorpayPayment = async (amount) => {
    const storageData = await JSON.parse(localStorage.getItem('profile'))

    try {
        const config = { 
            headers: {
                Authorization: `Bearer ${storageData.Token}`
            }
        }

        const response = await API.post('/order',{amount}, config)
        return response.data
    } catch (err) {
        return err.data.message
    }
}

export const verifyPayment = async (response, pack, deliveryaddress) => {
    const storageData = await JSON.parse(localStorage.getItem('profile'))

    try {
        const config = { 
            headers: {
                Authorization: `Bearer ${storageData.Token}`
            }
        }

        const result = await API.post('/verify',{response, pack, deliveryaddress}, config)
        return result.data
    } catch (err) {
        console.log(err)
        return err.data.message
    }
}

export const getAllOrders = async () => {

    const storageData = await JSON.parse(localStorage.getItem('supplier'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.SupplierToken}` 
            }
        }

        const response = await API.get('/getorders', config)
        return response.data
        
    } catch (err) {
        return err.data.message
    }
}

export const getOrderHistory = async () => {

    const storageData = await JSON.parse(localStorage.getItem('profile'))

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.Token}`
            }
        }

        const response = await API.get('/allorders', config)
        return response.data

    } catch(err){
        console.log(err)
        return err.data.message
    }
}

export const getOrder = async (orderId) => {
    
    const storageData = await JSON.parse(localStorage.getItem('supplier'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.SupplierToken}`
            },
            params:{
                orderId
            }
        }

        const response = await API.get('/orderget',config)
        return response.data
        
    } catch (err) {
        return err.data.message
    }
}

export const getDeliveryAddress = async (addressId, userId) => {
    console.log(userId)

    const storageData = await JSON.parse(localStorage.getItem('supplier'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.SupplierToken}`
            },
            params: {
                addressId,
                userId
            }
        }

        const response = await API.get('/getdeliveryaddress', config)
        return response.data

    } catch(err) {
        return err.data.message
    }
} 