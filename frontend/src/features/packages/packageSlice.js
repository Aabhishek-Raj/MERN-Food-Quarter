import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as packageService from './packageService'

const initialState = {
    packages: [],
    error: '',
    loading: false
}

//Create a new Package
export const createPackage = createAsyncThunk('package/create', async(packageData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().supplier.supplier.SupplierToken

        return await packageService.createPackage(packageData, token)
        
    } catch (err) {
        console.log(err.response.data)
        return thunkAPI.rejectWithValue(err.response.data)
        
    }
})

//Add items to the Package
export const addItem = createAsyncThunk('package/additem', async({formData, id}, thunkAPI) => {

    try{
        const token = thunkAPI.getState().supplier.supplier.SupplierToken

        return await packageService.addItem(formData, id, token)

    } catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

//Get all packages of a supplier
export const getPackages = createAsyncThunk('package/getpacks', async(_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().supplier.supplier.SupplierToken

        return await packageService.getPackages(token) 

    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

//Get all the packages availabel for user
export const getAllPackages = createAsyncThunk('package/getall', async(_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.Token

        return await packageService.getAllPackages(token)

    } catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
 })


export const packageSlice = createSlice({
    name: 'package',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPackage.pending, (state) => {
                state.loading = true
            })
            .addCase(createPackage.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.packages = null 
            })
            .addCase(createPackage.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.packages.push(action.payload)
            })
            .addCase(getPackages.pending, (state) => {
                state.loading = true
            })
            .addCase(getPackages.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(getPackages.fulfilled, (state, action) => {
                state.loading = false
                state.packages = action.payload 
            })
            .addCase(addItem.pending, (state) => {
                state.loading = true
            })
            .addCase(addItem.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.packages = null
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.packages = state.packages.map((pack) => {
                    if(pack._id === action.payload._id){ 
                        pack = action.payload
                    }
                    return pack     
                })
            })
            .addCase(getAllPackages.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllPackages.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getAllPackages.fulfilled, (state, action) => {
                state.loading = false
                state.packages = action.payload
            })
    }

})
export default packageSlice.reducer