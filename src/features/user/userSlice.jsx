import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import ForgotPassword from '../../user/forgotPassword'

//register user
export const register = createAsyncThunk('user/register', async (FormData, { rejectWithValue }) => {
    try {
        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        const { data } = await axios.post('/api/register', FormData, config)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "something went wrong.try again")
    }
})

//get profile
export const loadUser = createAsyncThunk(('user/loadUser'), async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/profile')
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "something went wrong")
    }
})

//login user
export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        const { data } = await axios.post('/api/login', { email, password }, config)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'something went wrong')
    }
})

//logout user
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/logout')
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'something went wrong')
    }
})

// update profile
export const updateProfile=createAsyncThunk('user/profile/update',async(FormData,{rejectWithValue})=>{
    try {
        const config={
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
        const {data}=await axios.put('/api/profile',FormData,config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'something went wrong')
    }
})

//change Password
export const passwordUpdate=createAsyncThunk('password/update',async(passwords,{rejectWithValue})=>{
    try {
        const config={
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
        const {data}=await axios.put('/api/password',passwords,config)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'something went wrong')
    }
})

//forgot Password
export const passwordForgot=createAsyncThunk('password/forgot',async({email},{rejectWithValue})=>{
    try {
        const config={
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
        const {data}=await axios.post('/api/forgot',{email},config)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'something went wrong')
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
        loading: false,
        error: null,
        success: null
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        },
        removeSuccess: (state) => {
            state.success = null
        }
    },
    extraReducers: (builder) => {
        //register
        builder.addCase(register.pending, (state, action) => {
            state.loading = true;
            state.error = null
            state.success = false
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null
            state.user = action.payload.user
            state.isAuthenticated = Boolean(action.payload?.user)
            state.success = action.payload?.message || "Registered successful"
           localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload?.message || "Something went wrong"
            state.success = false
        })
        //login
        builder.addCase(login.pending, (state, action) => {
            state.error = null;
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.user = action.payload.user
            state.isAuthenticated = Boolean(action.payload?.user)
            state.success = action.payload.message || "Login successful"

            localStorage.setItem("user", JSON.stringify(state.user))
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload?.message || "Something went wrong"
            state.success = false
        })


        //logout

        builder.addCase(logout.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.user = null
            state.isAuthenticated = false

            localStorage.removeItem("user")
            localStorage.removeItem("isAuthenticated")
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || 'something went wrong'
        })
        //get profile
        builder.addCase(loadUser.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.user = action.payload.user
            state.isAuthenticated = true

            localStorage.setItem("user", JSON.stringify(state.user))
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
        })
        builder.addCase(loadUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || 'something went wrong'
            state.user = null
            state.isAuthenticated = false

            if (action.payload?.statusCode === 401) {
                localStorage.removeItem("user")
                localStorage.removeItem("isAuthenticated")
            }
        })

        //update profile

        builder.addCase(updateProfile.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.user = action.payload.user
            state.isAuthenticated = true

            localStorage.setItem("user", JSON.stringify(state.user))
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || 'something went wrong'
            state.user = null
            state.isAuthenticated = false

                localStorage.removeItem("user")
                localStorage.removeItem("isAuthenticated")
            
        })

        //password update
        builder.addCase(passwordUpdate.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(passwordUpdate.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.user = action.payload.user
            state.isAuthenticated = true
            state.success=true
        })
        builder.addCase(passwordUpdate.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || 'something went wrong'
            state.success=false
            state.user = null
            state.isAuthenticated = false

                localStorage.removeItem("user")
                localStorage.removeItem("isAuthenticated")
            
        })

        //forgot password

         builder.addCase(passwordForgot.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(passwordForgot.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success=true
        })
        builder.addCase(passwordForgot.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || 'something went wrong'
            state.success=false
            
        })

    }
})

export const { removeErrors, removeSuccess } = userSlice.actions

export default userSlice.reducer