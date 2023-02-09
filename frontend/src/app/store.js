import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import AuthReducer from '../features/auth/authSlice'
import AdminReducer from '../features/admin/adminSlice'
import SupplierReducer from '../features/supplier/supplierSlice'
import FoodReducer from "../features/food/foodSlice";
import PackageReducer from "../features/package/packageSlice";


export const store = configureStore({
    reducer: {
        // [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthReducer,
        adminAuth: AdminReducer,
        supplier: SupplierReducer, 
        food: FoodReducer,
        packages: PackageReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware), 
    devTools: true
}) 