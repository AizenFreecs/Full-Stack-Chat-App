import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isLoading:true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload
            state.isLoading = false
        },
        userNotExists: (state) => {
            state.user = null
            state.isLoading = false    
        }
    }
})

export default authSlice
export const {userExists,userNotExists} = authSlice.actions