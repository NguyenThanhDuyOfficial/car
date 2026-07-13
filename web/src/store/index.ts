import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { useDispatch } from 'react-redux';
import authReducer from "./slices/authSlice"
import carReducer from "./slices/carSlice"
import orderReducer from "./slices/orderSlice"


const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem(value: string) {
      return Promise.resolve(value)
    },
    removeItem() {
      return Promise.resolve()
    }
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  car: carReducer,
  order: orderReducer
})
const storage = typeof window !== 'undefined' ? createWebStorage("local") : createNoopStorage()
const persistConfig = {
  key: 'root',
  storage,
  whilelist: []
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware:
    (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        }
      })
})

export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export const useAppDispactch = () => useDispatch<AppDispatch>()
export type IRootState = ReturnType<typeof store.getState>
