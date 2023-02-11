import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as chatService from './chatService'

const initialState = {
    chats: [],
    selectedChat: [],
    error: '',
    loading: false
}

export const getAllChats = createAsyncThunk('chat/allchats', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.Token
        
        return await chatService.getAllChats(token)
    } catch(err){
        console.log(err.response.message)
        return thunkAPI.rejectWithValue(err.response.message)
    }
})

export const accessChat = createAsyncThunk('chat/', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.Token

        return await chatService.accessChat(userId, token)
    } catch (err) {
        console.log(err.response.message)
        return thunkAPI.rejectWithValue(err.response.message)
    }
})

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        reset: (state) => {
            state.chats = null
            state.selectedChat = null
            state.error = ''
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllChats.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllChats.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.chats = null
                state.selectedChat = null
            })
            .addCase(getAllChats.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.chats = action.payload
            })
            .addCase(accessChat.pending, (state) => {
                state.loading = true
            })
            .addCase(accessChat.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.chats = null
                state.selectedChat = null
            })
            .addCase(accessChat.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.selectedChat = action.payload 
            })
    }
})

export default chatSlice.reducer