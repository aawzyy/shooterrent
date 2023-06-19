// export const host = "https://cad3-36-68-221-220.ngrok-free.app"; // dev
export const host = "https://apps1.shooterrent.my.id"; // prod

export const apiJson = (mode, method, hostdynamis, path, body) => {
    const dataToSend = {...body};
    
    const data = fetch(host + path, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
    })
    .then(res => res.json())
    .then(result => {
        return result
    })
    .catch(error => {
        return error
    })

    return data;
};

export const apiNoBody = (mode, method, token, path, body) => {

    const data = fetch(host + path, {
        method: method,
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+ token,
            'ngrok-skip-browser-warning' : 'skip'
        },
    })
    .then(res => res.json())
    .then(result => {
        return result
    })
    .catch(error => {
        return error
    })

    return data;
};

export const apiJsonWithAuth = (mode, method, token, path, body) => {
    const dataToSend = {...body};

    // console.log(JSON.stringify(body));
    
    const data = fetch(host + path, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+ token,
        },
        body: JSON.stringify(dataToSend)
    })
    .then(res => res.json())
    .then(result => {
        return result
    })
    .catch(error => {
        return error
    })

    return data;
};

export const apiNoBodyFilterParams = (mode, method, token, path, body) => {

    const data = fetch(host + path, {
        method: method,
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+ token,
            'ngrok-skip-browser-warning' : 'skip'
        },
    })
    .then(res => res.json())
    .then(result => {
        return result
    })
    .catch(error => {
        return error
    })

    return data;
};