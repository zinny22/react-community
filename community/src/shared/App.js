import './App.css';
import React from "react";

import { Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Header from "../components/Header";
import {Grid} from "../elements";

import{actionCreators as userActions} from "../redux/modules/user";
import {useDispatch} from "react-redux";
import { apiKey } from "../shared/firebase";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
  const is_session = sessionStorage.getItem(_session_key)? true :false

  React.useEffect(()=>{
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  },[])

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList}/>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;