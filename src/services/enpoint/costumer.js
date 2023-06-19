import { apiNoBody, apiJson, apiJsonWithAuth, apiNoBodyFilterParams } from "../API/json/json";


const namespace = '/api/v1'

export const getAllProductVendor = (token, ctg, min, max, lat, lang) => {
    let defaultUrl = `vendors?radius_lat=${lat}&radius_lng=${lang}`
    if (ctg) {
        defaultUrl = `vendors?category=${ctg}&radius_lat=${lat}&radius_lng=${lang}`    
    } else if (min && max) {
        defaultUrl = `vendors?min_price=${min}&max_price=${max}&radius_lat=${lat}&radius_lng=${lang}`
    }
    const data = {
        // body..
    }
    return apiNoBodyFilterParams(null, 'GET', `${token}` , `${namespace}/${defaultUrl}`, data)
}

export const getDetailProduct = (token, id) => {
    const data = {
        // body..
    }
    return apiNoBody(null, 'GET', `${token}` , `${namespace}/vendors/${id}`, data)
}

export const adduUserWishlist = (token, body) => {
    const data = {
        vendor_id : Number(body)
    }
    return  apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/user/wishlist`, data)
}

export const getUserWhhistlist = (token, body) => {
    const data = {
        //...
    }
    return  apiNoBody(null, 'GET', `${token}`, `${namespace}/user/wishlist`, data)
}

export const getDataWhistList = (token, id) => {
    const data = {
        //...
    }
    return  apiNoBody(null, 'DELETE', `${token}`, `${namespace}/user/wishlist/${id}`, data)
}

export const getProductOrdersCustomer = (token) => {
    const data = {
        //...
    }
    return  apiNoBody(null, 'GET', `${token}`, `${namespace}/user/orders`, data)
}

export const userCancelOrder = (token, id) => {
    const data = {
        order_status : 'canceled'
    }
    return  apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/user/orders/${id}`, data)
}

export const userCheckout = (token, body) => {
    const data = {
        ...body
    }
    return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/user/orders/checkout`, data)
}

export const userRating = (token, id, body) => {
    const data = {
        ...body
    }
    return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/user/orders/${id}/rating`, data)
}

export const getListChatVendor = (token) => {
    const data = {
      // body
    }
    return apiNoBody(null, 'GET', `${token}`, `${namespace}/conversations`, data)
}

export const getConverstationVendor = (token, id) => {
    const data = {
      recipient_id : id
    }
    return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/conversations/check`, data)
}

export const getListChatDetailVendor = (token, id) => {
    const data = {
      // body
    }
    return apiNoBody(null, 'GET', `${token}`, `${namespace}/conversations/${id}`, data)
}

export const sendMessageVendor = (token, id, body) => {
    const data = {
      ...body
    }
    return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/conversations/${id}/send-message`, data)
}

export const checkAppointMent = (token, id, body) => {
    const data = {
        ...body
    }
    return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/vendors/${id}/check-appointment`, data)
}