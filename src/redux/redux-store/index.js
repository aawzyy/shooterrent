// import create from "zustand";
import { createStore } from 'redux'
import connector from "../reducer-store";

const store = createStore(
    connector,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store