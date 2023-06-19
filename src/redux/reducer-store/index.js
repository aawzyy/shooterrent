import { combineReducers } from 'redux';

// Create your default state here.

const defaultStateUser = {
  userDatas : { login: false, data :{}, error: false },
  token : {}
};

// Create your functions reducers here.

const usersReducer = (state = defaultStateUser, action) => {
  switch (action.type) {
    case 'SET_DATA_USERS':
      return {...state, userDatas: action.data};
    case 'CLEAR':
      return { userDatas : {} }
    default:
      return state;
  }
};

const usersToken = (state = defaultStateUser, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {...state, token: action.data};
    case 'CLEAR':
      return { token : {} }
    default:
      return state;
  }
};

const userClear = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR':
      return { userDatas : {}, token : {}}
    default:
      return state 
  }
}

// Create CombineReducer here.

const rootReducer = combineReducers({
  clearLogin  : userClear,
  dataUsers : usersReducer,
  dataToken : usersToken,
});

export default rootReducer;