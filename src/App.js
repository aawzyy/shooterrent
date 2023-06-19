import React from 'react'
import AppRouters from './routes/AppRoutes'
import { Provider } from "react-redux";
import store from "./redux/redux-store";

export default function App() {
  return (
    <Provider store={store}>
      <AppRouters/>
    </Provider>
  )
}
