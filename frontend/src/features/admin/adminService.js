import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:4000/admin'})

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

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.get('/allusers', config)
        return response.data

    } catch(err){
        console.log(err.response.data)
        return err.response
    }
}

// Get all verified suppliers
export const getVerifiedSuppliers = async () => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.get('/allsuppliers', config)
        return response.data

    } catch(err) {
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
export const blockUser = async(userId) => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.patch(`/blockuser/${userId}`, config)
        return response.data
    } catch (err) {
        console.log(err.response.data)
    }
}

// Verify a supplier
export const verifySupplier = async (supplierId) => {
    const storageData = JSON.parse(localStorage.getItem('admin'))

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            }
        }
        const response = await API.patch('/verify', {supplierId}, config)
        return response.data
    } catch (err){
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
        const response = await API.delete('/reject', {supplierId}, config)
        return response.data
    }catch(err){
        console.log(err)
    }
}