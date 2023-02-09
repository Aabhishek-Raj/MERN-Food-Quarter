import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  * as authService from './authService'

const user = JSON.parse(localStorage.getItem('profile'))

const initialState =  {
    user: user ? user: null,
    error: '',
    loading: false
}

export const login = createAsyncThunk('auth/login', async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await authService.signIn(formValue)
        toast.success('Login Succesfully')
        navigate('/dash')
        return response.data

    } catch (err) {
        console.log(err.response.data)
        return rejectWithValue(err.response.data)
    }
})

export const register = createAsyncThunk('auth/register', async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await authService.signUp(formValue)
        toast.success('Registered Succesfully')
        const {_id, email } = response.data
        navigate('/verify', { state: {_id, email}})
        return response.data

    } catch (err) {
        console.log(err.response.data)
        return rejectWithValue(err.response.data)
    }
})

export const resendEmail = createAsyncThunk('auth/resend', async (data, thunkAPI) => {
    try{
        const response = await authService.resendEmail(data)
        return response.data
    } catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const resetRequest = createAsyncThunk('auth/resetRequest', async ({formValue, navigate, toast}, thunkAPI) => {
    try{
        const response = await authService.resetRequest(formValue)
        navigate(`/verify/${true}`)
        return response.data
    } catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const changePassword = createAsyncThunk('auth/changePassword', async ({data, navigate, toast}, thunkAPI) => {
    try {
        const response = await authService.changePassword(data)
        toast.success("Password Reset sucessfully")
        navigate('/login')
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const logout = createAsyncThunk('auth/logout', 
async () => {
    await authService.removeuser()
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.user = null
            state.error = ''
            state.loading =false
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                localStorage.setItem('profile', JSON.stringify({...action.payload}))
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error =action.payload.message
            })
            .addCase(register.pending, (state) => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                localStorage.setItem('profile', JSON.stringify({...action.payload}))
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})


export default authSlice.reducer