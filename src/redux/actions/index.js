import { removeStore, setStore } from "../../services/storage/local-store";

const setDataUsers = (login) => {
    login && setStore('userData', login)
    return {
        type: "SET_DATA_USERS",
        data: login,
    };
};

const setToken = (token) => {
    token && setStore('token', token)
    return {
        type: "SET_TOKEN",
        data: token,
    };
};


const clearLogin = () => {
    removeStore('userData')
    removeStore('token')
    return {
        type : 'CLEAR'
    }
}

export {
    clearLogin,
    setDataUsers,
    setToken,
};