import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import AuthReducer from '../features/auth/authSlice'
import AdminReducer from '../features/admin/adminSlice'
import SupplierReducer from '../features/supplier/supplierSlice'
import PackageReducer from "../features/packages/packageSlice";


export const store = configureStore({
    reducer: {
        // [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthReducer,
        adminAuth: AdminReducer,
        supplier: SupplierReducer, 
        package: PackageReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware), 
    devTools: true
}) 