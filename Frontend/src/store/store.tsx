import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import tokenReducer from './slices/user/userTokenSlice'
import vendorTokenSlice from './slices/vendor/vendorTokenSlice'
import vendorSlice from './slices/vendor/vendorSlice'
import adminTokenSlice from './slices/admin/adminToken'
import clientSlice from './slices/user/userSlice'
const persistConfig = {
    key: "root",
    storage,
    blacklist: []
}

const rootReducer = combineReducers({
    token: tokenReducer,
    vendorToken: vendorTokenSlice,
    vendorSlice: vendorSlice,
    adminToken: adminTokenSlice,
    clientSlice:clientSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;