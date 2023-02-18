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