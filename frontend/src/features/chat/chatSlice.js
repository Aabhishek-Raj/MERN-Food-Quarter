import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as chatService from './chatService'

const initialState = {
    chats: [],
    selectedChat: [],
    error: '',
    loading: false
}

export const getAllChats = createAsyncThunk('chat/allchats', async (manage, thunkAPI) => {
    try {

        let token

        if (manage === 'USER') {
            token = thunkAPI.getState().auth.user.Token
        } else {
            token = thunkAPI.getState().supplier.supplier.SupplierToken
        }

        return await chatService.getAllChats(token)
    } catch (err) {
        console.log(err.response.message)
        return thunkAPI.rejectWithValue(err.response.message)
    }
})

export const accessChat = createAsyncThunk('chat/replay', async ({ Id, manage }, thunkAPI) => {
    console.log(manage)
    console.log(Id)
    try {
        let token

        if (manage === 'USER') {
            token = thunkAPI.getState().auth.user.Token
        } else {
            token = thunkAPI.getState().supplier.supplier.SupplierToken
        }

        return await chatService.accessChat(Id, token)
    } catch (err) {
        console.log(err.response.message)
        return thunkAPI.rejectWithValue(err.response.message)
    }
})

export const createChat = createAsyncThunk('chat/', async (supplierId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.Token

        return await chatService.createChat(supplierId, token)
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
            .addCase(createChat.pending, (state) => {
                state.loading = true
            })
            .addCase(createChat.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.selectedChat = null
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.selectedChat = action.payload
            })
    }
})

export default chatSlice.reducer