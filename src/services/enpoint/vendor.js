import { apiNoBody, apiJson, apiJsonWithAuth } from "../API/json/json";

/*
  NOTE :
  return apiJson('mode', 'method', 'base_url', 'path', 'body')
*/

const namespace = '/api/v1'

export const getUsers = (token) => {
  const data = {
    //
  };
  return apiNoBody(null, 'GET', `${token}` , `${namespace}/profile`, data)
};

export const getPortofolio = (token) => {
  const data = {
    //
  };
  return apiNoBody(null, 'GET', `${token}` , `${namespace}/vendor/portfolio`, data)
};

export const updateProfil = (body, token) => {
  const data = {
    ...body
    //...
  };
  return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/profile/update`, data)
};

export const addPortofolio = (body, token) => {
  const data = {
    ...body
  }
  return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/vendor/portfolio`, data)
}

export const deletePortofolio = (token, id) => {
  const data = {
    portfolio_ids : [id]
  }
  return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/vendor/portfolio/bulk-delete`, data)
}

export const getPackets = (token, orderBy, filter) => {
  const data = {
    // body
  }
  return apiNoBody(null, 'GET', `${token}`, `${namespace}/vendor/products?order=${orderBy}&orderby=${filter}`, data)
}

export const AddPackets = (token, body) => {
  const data = {
    ...body
    // body
  }
  return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/vendor/products/add`, data)
}

export const deletePackets = (token, id) => {
  const data = {
    // body
  }
  return apiNoBody(null, 'DELETE', `${token}`, `${namespace}/vendor/products/${id}`, data)
}

export const UpdatePackets = (token, id, body) => {
  const data = {
    ...body
    // body
  }
  return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/vendor/products/${id}/update`, data)
}

export const getListOrderVendor = (token) => {
  const data = {
    // body
  }
  return apiNoBody(null, 'GET', `${token}`, `${namespace}/vendor/orders`, data)
}

export const updateOrders = (token, id, body) => {
  const data = {
    order_status : body
    // body
  }
  return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/vendor/orders/${id}/update`, data)
}

export const getListRating = (token) => {
  const data = {
    // body
  }
  return apiNoBody(null, 'GET', `${token}`, `${namespace}/vendor/orders/rating`, data)
}

export const getConverstation = (token, id) => {
  const data = {
    recipient_id : id
  }
  return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/conversations/check`, data)
}

export const getListChatCustomer = (token) => {
  const data = {
    // body
  }
  return apiNoBody(null, 'GET', `${token}`, `${namespace}/conversations`, data)
}

export const getListChatDetailCustomer = (token, id) => {
  const data = {
    // body
  }
  return apiNoBody(null, 'GET', `${token}`, `${namespace}/conversations/${id}`, data)
}

export const sendMessageCostumer = (token, id, body) => {
  const data = {
    ...body
  }
  return apiJsonWithAuth(null, 'POST', `${token}`, `${namespace}/conversations/${id}/send-message`, data)
}
