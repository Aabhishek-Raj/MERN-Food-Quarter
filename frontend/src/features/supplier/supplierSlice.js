import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as supplierService from './supplierService'

const supplier = JSON.parse(localStorage.getItem('supplier'))

const initialState = {
    supplier: supplier ? supplier: null,
    error: '',
    loading: false
}


export const register = createAsyncThunk('supplier/register', async ({formData, navigate, toast}, thunkAPI) => {
    try {
        // console.log(supplier)
        return await supplierService.register({formData, navigate, toast})
    } catch (error) {
        // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const login = createAsyncThunk('supplier/login', async (supplier, thunkAPI) => {
    try{
        return await supplierService.login(supplier)
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const logout = createAsyncThunk('supplier/logout', async () => {
    await supplierService.logout()
})

export const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {
        reset: (state) => {
            state.supplier = null
            state.error = ''
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message    
                state.supplier = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.supplier = null
            })    
            .addCase(login.pending, (state) => {
                state.loading = true 
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.supplier = null 
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.supplier = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.supplier = null
                state.error = null
            })
    }
})

export default supplierSlice.reducer