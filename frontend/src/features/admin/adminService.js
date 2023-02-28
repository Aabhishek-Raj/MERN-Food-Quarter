import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:4000/admin' })

export const login = async ({ formValue, navigate, toast }) => {
    const response = await API.post('/signin', formValue)
    if (response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
        toast.success('Login Succesfully')
        navigate('/admin')
    }
    return response.data
}

export const adminlogout = async () => {
    await localStorage.removeItem('admin')
}

// Get all users
export const getAllusers = async () => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.get('/allusers', config)
        return response.data

    } catch (err) {
        console.log(err.response.data)
        return err.response
    }
}

// Get all verified suppliers
export const getVerifiedSuppliers = async () => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.get('/allsuppliers', config)
        return response.data

    } catch (err) {
        console.log(err.response.data)
    }
}

//Get new Supplier Request 
export const getSupplierRequests = async () => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.get('/notverified', config)
        return response.data

    } catch (err) {
        console.log(err.response.data)
    }
}

//Block an user
export const blockUser = async (userId, manage) => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        let endpoint;
        if (manage === 'Block') {
            endpoint = '/blockuser';
        } else if (manage === 'UnBlock') {
            endpoint = '/unblockuser';
        }
        const response = await API.patch(endpoint, { userId }, config)
        return response.data
    } catch (err) {
        console.log(err.response.data)
    }
}

// Verify a supplier
export const verifySupplier = async (supplierId) => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.patch('/verify', { supplierId }, config)
        return response.data
    } catch (err) {
        console.log(err.response.data)
    }
}

//Reject a supplier
export const rejectSupplier = async (supplierId) => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.delete('/reject', { supplierId }, config)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

// Block Supplier
export const blockSupplier = async (supplierId, manage) => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        let endpoint;
        if (manage === 'Block') {
            endpoint = '/blocksupplier';
        } else if (manage === 'UnBlock') {
            endpoint = '/unblocksupplier';
        }
        const response = await API.patch(endpoint, { supplierId }, config)
        return response.data
    } catch (err) {
        console.log(err.response.data)
    }
}

//get Order Order data
export const getSales = async () => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.get('/getallsales', config)
        return response.data
    }catch (err) {
        console.log(err.response)
        return err.response.message
    }
}

//get all numbers 
export const getNumbers = async () => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.get('/getnumbers', config)
        return response.data
    } catch (err) {
        return err.response.message
    }
}

//get Sales Report
export const getSalesReport = async () => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.get('/salesreport', config)
        return response.data
    } catch (err) {
        return err.response.message
    }
}