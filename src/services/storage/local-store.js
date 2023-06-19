const setStore = (key, data) => {
    // localStorage.setItem("token", );
    localStorage.setItem(key, JSON.stringify(data));
};

const getStore = (key) => {
    try {
        const item = localStorage.getItem(key);

        if (item !== null) {
        // value previously stored
        return JSON.parse(item);
        }
    } catch (e) {
        console.log(e);
    }
};

const removeStore = async (key) => {
    try {
        localStorage.removeItem(key);
        console.log("Done. delete token");
    } catch (e) {
        console.log(e);
    }
};

export { setStore, getStore, removeStore };
  