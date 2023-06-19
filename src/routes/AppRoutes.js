import  React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import HomePage from '../views';

import Auth from '../layouts/Auth';
import Admin from '../layouts/Admin';

import { getStore, setStore } from "../services/storage/local-store";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../services/enpoint/vendor';
import { clearLogin, setDataUsers, setToken } from '../redux/actions';
import { LogOut } from '../services/enpoint/auth';
import Costumer from '../layouts/Costumer';
import NotFound from '../views/not-found';

function AppRouters() {
  const dispatch = useDispatch();
  const [splash, setSplash] = useState(true);
  const { dataUsers, dataToken } = useSelector((state) => state)
  const { name, roles } = dataUsers?.userDatas
  const { login , token} = dataToken?.token

  const getProfile = (props) => {
    let setUserRedux = {}
    getUsers(token ? token : props)
    .then((result) => {
      // console.log(result);
      const respon = result
      setUserRedux = {
        ...setUserRedux,
        id_user : respon.data.user.id,
        email : respon.data.user.email,
        roles : respon.data.user.user_role,
        full_name : respon.data.user.first_name,
        images : respon?.data?.additional_data?.avatar?.src
      }
      dispatch(setDataUsers({...setUserRedux}));
    }).catch((err) => {
      // console.log(err);
    });
  }

  useEffect(() => {
    const getToken = getStore('token')
    const dataUser = getStore('userData')
    const dataToken = getToken?.token
    if (dataToken !== undefined || dataToken === "") {
      dispatch(setToken({
        login : true,
        token : getToken.token,
      }))
      dispatch(setDataUsers({
        id_user : dataUser.id_user,
        roles : dataUser.roles,
        email : dataUser.email,
        full_name : dataUser.full_name,
      }))
      getProfile(getToken.token)
    } else {
      setSplash(false)
    }
  }, [])

  if (token === undefined || !token) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/auth" component={Auth} />
          <Redirect from="/" to="/"/>
        </Switch>
      </BrowserRouter>
    );
  }

  if (token && login) {
    if (roles == 'vendor') {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin"/>
          </Switch>
        </BrowserRouter>
      )
    }
    if (roles == 'customer') {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/costumer" component={Costumer} />
            <Redirect from="/" to="/costumer"/>
          </Switch>
        </BrowserRouter>
      )
    }

    return(
      <BrowserRouter>
          <Route component={NotFound}/>
      </BrowserRouter>
    )
  }
}

export default AppRouters;
