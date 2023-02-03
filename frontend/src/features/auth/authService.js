import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:4000/users'})
const baseURL = 'http://localhost:3000/change'

export const signIn = (formData) => API.post('/signin', formData)
export const signUp = (formData) => API.post('/signup', formData)

export const resetRequest = (formData) => API.post('/resetpassword', {...formData, redirectUrl: baseURL})
export const changePassword = (formData) => API.post('/changepassword', formData)

export const removeuser = () => {
    localStorage.removeItem('profile')
}
