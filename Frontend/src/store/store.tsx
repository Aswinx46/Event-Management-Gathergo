import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import { tokenSlice } from './slices/userTokenSlice'
import tokenReducer from '../store/slices/userTokenSlice'

const persistConfig = {
    key: "root",
    storage,
    blacklist: []
}

const rootReducer = combineReducers({
    token:tokenReducer
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

export const persistor=persistStore(store)
