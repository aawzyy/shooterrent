import { apiJson, apiNoBody } from "../API/json/json";

/*
  NOTE :
  return apiJson('mode', 'method', 'base_url', 'path', 'body')
*/

const namespace = '/api/v1'

export const LoginWebs = (email, password) => {
  const data = {
    email,
    password,
  };
  return apiJson(null, 'POST', null , '/api/v1/auth/login', data)
};

export const RegisterWebs = (register) => {
  const data = {
    ...register
  };
  return apiJson(null, 'POST', null , '/api/v1/auth/register', data)
};

export const LogOut = (token) => {
  const data = {
    //body...
  };
  return apiNoBody(null, 'POST', token , '/api/v1/auth/logout', data)
};

export const forgotPass = (body) => {
  const data = {
    ...body
  };
  return apiJson(null, 'POST', null, `${namespace}/auth/forgot-password/request`, data)
};

export const verifyPass = (body) => {
  const data = {
    ...body
  }
  return apiJson(null, 'POST', null, `${namespace}/auth/forgot-password/verify`, data)
} 

export const getCorousel = () => {
  const data = {
    
  }
  return apiNoBody(null, 'GET', null , '/api/v1/home', data)
}