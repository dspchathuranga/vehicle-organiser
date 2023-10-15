import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null},
    reducers: {
        setCredentials: (state, action) => {
            //console.log(action.payload);
            const user = action.payload
            state.user = user
        },
        logOut: (state, action) => {
            state.user = null
        }
    },
})

export const { setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user