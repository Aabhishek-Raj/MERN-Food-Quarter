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

//Add items to the Package
// export const addItem = createAsyncThunk('package/additem', async({formData, id}, thunkAPI) => {

//     try{
//         const token = thunkAPI.getState().supplier.supplier.SupplierToken

//         return await packageService.addItem(formData, id, token)

//     } catch(err){
//         return thunkAPI.rejectWithValue(err.response.data)
//     }
// })

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
            // .addCase(addItem.pending, (state) => {
            //     state.loading = true
            // })
            // .addCase(addItem.rejected, (state, action) => {
            //     state.loading = false
            //     state.error = action.payload.message
            //     state.packages = null
            // })
            // .addCase(addItem.fulfilled, (state, action) => {
            //     state.loading = false
            //     state.error = null
            //     state.packages = state.packages.map((pack) => {
            //         if(pack._id === action.payload._id){ 
            //             pack = action.payload
            //         }
            //         return pack     
            //     })
            // })
            // .addCase(getAllPackages.pending, (state) => {
            //     state.loading = true
            // })
            // .addCase(getAllPackages.rejected, (state, action) => {
            //     state.loading = false
            //     state.error = action.payload
            // })
            // .addCase(getAllPackages.fulfilled, (state, action) => {
            //     state.loading = false
            //     state.packages = action.payload
            // })
    }

})

export const {setFoods, reset} = foodSlice.actions

export default foodSlice.reducer
