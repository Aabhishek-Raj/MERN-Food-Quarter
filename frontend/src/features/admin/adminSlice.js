import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as adminService from './adminService'

const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin: admin ? admin : null,
    error: '',
    loading: false
}

// admin Login 
export const login = createAsyncThunk('admin/login', async ({ formValue, navigate, toast }, thunkAPI) => {
    try {
        return await adminService.login({ formValue, navigate, toast })
    } catch (error) {
        // const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(error.response.data)

    }       
})

// admin Logout
export const adminLogout = createAsyncThunk('admin/logout', async () => {
    await adminService.adminlogout()
})

export const adminSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        reset: (state) => {
            state.admin = null
            state.error = ''
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.admin = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.admin = null
            })
            .addCase(adminLogout.fulfilled, (state) => {
                state.admin = null
            })
    }
})

export default adminSlice.reducer