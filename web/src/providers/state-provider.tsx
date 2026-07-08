"use client"

import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "../store"
import { Provider } from "react-redux"

interface ReduxProviderProps {
  children: React.ReactNode
}
function StateProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}

export default StateProvider


