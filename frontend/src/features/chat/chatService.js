import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:4000/chats'})

export const getAllChats = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.get('/', config)
    return response.data
}

export const userSearch = async (search) => {
    const storageData = await JSON.parse(localStorage.getItem('profile'))

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.Token}`
            },
            params: {search}
        }
        const response = await API.get('/usersearch', config)
        return response.data 
    } catch (error) {
        console.log(error.response.message)
    }
}

export const accessChat = async (userId, token) => {

        const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }
        const response = await API.post('/replay', {userId}, config)
        console.log('avadf')
        console.log(response.data)
        return response.data     
}

export const createChat = async (supplierId, token) => {

        const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }
        const response = await API.post('/', {supplierId}, config)
        return response.data     
}

export const getSender = (loggedUser, chatters) => {
    // return chatters[0]._id === loggedUser._id ? chatters[1].name: chatters[0].name
}

export const allMessages = async (chatId, manage) => {
    try {
        let token

        if(manage === 'USER'){
            const storageData = await JSON.parse(localStorage.getItem('profile'))
            token = storageData.Token
        }else {
            const storageData = await JSON.parse(localStorage.getItem('supplier'))
            token = storageData.SupplierToken
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }

        const response = await API.get(`/message/${chatId}`, config)
        
        return response.data
    } catch(err) {
        console.log(err.response.message)
    }
}

export const sendMessage = async (content, chatId, manage) => {
    try {

        let token

        if(manage === 'USER'){
            const storageData = await JSON.parse(localStorage.getItem('profile'))
            token = storageData.Token
        }else {
            const storageData = await JSON.parse(localStorage.getItem('supplier'))
            token = storageData.SupplierToken
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }

        const response = await API.post('/message', {content, chatId}, config)

        return response.data
    } catch(err) {
        console.log(err.response.message)
    }
}
