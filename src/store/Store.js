import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../api/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";


const store = configureStore({
    reducer: {
        [userSlice.reducerPath]: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware),
})

setupListeners(store.dispatch)

export default store;