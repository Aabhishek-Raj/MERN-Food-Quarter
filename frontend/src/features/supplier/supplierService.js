import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:4000/supplier'})

export const register = async ({formData, navigate, toast}) => {
   const config ={
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    }
    const response = await API.post('/register', formData, config)
    if(response.data){
        console.log(response.data)
        toast.success('Registered successfully !! Please wait until your verification process is done')
        navigate('/supplier/login')
    }
    return response.data
}

export const login = async (supplierData) => {
    const response = await API.post('/login', supplierData)
    if(response.data){
        localStorage.setItem('supplier', JSON.stringify(response.data))
    }
    return response.data
}

export const logout = async () => {
    localStorage.removeItem('supplier')
}