import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as foodService from './foodService'

const initialState = {
    foods: [],
    error: '',
    loading: false
}

//Create a new Package
export const createFood = createAsyncThunk('food/create', async(foodData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().supplier.supplier.SupplierToken

        return await foodService.createFood(foodData, token)
        
    } catch (err) {
        console.log(err.response.data)
        return thunkAPI.rejectWithValue(err.response.data)
        
    }
})

//Get all packages of a supplier
export const getFoods = createAsyncThunk('food/getfoods', async(_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().supplier.supplier.SupplierToken

        return await foodService.getFoods(token) 

    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

// Get all the foods of a supplier for user
export const getSupplierFoods = createAsyncThunk('package/getall', async(supplierId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.Token

        return await foodService.getSupplierFoods(supplierId, token)

    } catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
 })


 export const deleteItem = createAsyncThunk('food/delete', async(foodId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().supplier.supplier.SupplierToken

        return await foodService.deleteItem(foodId, token)

    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
 })


export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setFoods: (state, action) => {
            state.foods = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFood.pending, (state) => {
                state.loading = true
            })
            .addCase(createFood.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.foods = null 
            })
            .addCase(createFood.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.foods.push(action.payload)
            })
            .addCase(getFoods.pending, (state) => {
                state.loading = true
            })
            .addCase(getFoods.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(getFoods.fulfilled, (state, action) => {
                state.loading = false
                state.foods = action.payload 
            })
            .addCase(getSupplierFoods.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getSupplierFoods.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(getSupplierFoods.fulfilled, (state, action) => {
                state.loading = false 
                state.foods = action.payload
            })
            .addCase(deleteItem.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false
                state.foods = state.foods.filter(food => food._id !== action.payload.id)  
            })
    }

})

export const {setFoods, reset} = foodSlice.actions

export default foodSlice.reducer
