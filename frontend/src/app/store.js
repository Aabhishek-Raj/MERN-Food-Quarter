import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import AuthReducer from '../features/user/userSlice'
import AdminReducer from '../features/admin/adminSlice'
import SupplierReducer from '../features/supplier/supplierSlice'
import FoodReducer from "../features/food/foodSlice";
import PackageReducer from "../features/package/packageSlice";
import ChatReducer from "../features/chat/chatSlice";


export const store = configureStore({
    reducer: {
        // [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthReducer,
        adminAuth: AdminReducer,
        supplier: SupplierReducer, 
        food: FoodReducer,
        packages: PackageReducer,
        chat: ChatReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware), 
    devTools: true
}) 