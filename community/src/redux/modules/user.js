import {createAction, handleActions} from "redux-actions";
import {produce} from "immer"

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";

import firebase from 'firebase/compat/app';

//actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER ="SET_USER"

//action creators
const setUser = createAction(SET_USER, (user)=>({user}));
const logOut = createAction(LOG_OUT, (user)=>({user}));
const getUser = createAction(GET_USER, (user)=>({user}));

//initialState
const initialState ={
    user : null,
    is_login : false,
};

const user_initial ={
    user_name :'jin'
}

// middleware actions 
const loginFB = (id, pwd)=>{
    //history 페이지 이동할때 사용
    return function(dispatch, getState,{history}) {

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res)=>{
        auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user)=>{
            console.log(user)

        
            dispatch(
                setUser({
                user_name:user.user.displayName, 
                id : id, 
                user_profile:'',
                uid: user.user.uid,
            }));
            history.push('/')
        })
    
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode,errorMessage);
        })
    })
    }
}

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState, {history}){

        //우리는 이미파이어베이스에서 auto를 적용시켰다
       auth
        .createUserWithEmailAndPassword(id, pwd)
        //완료가 되면
        .then((user) => {
            console.log(user)
            auth.currentUser.updateProfile({
                displayName: user_name,
            }).then(()=>{
                dispatch(
                    setUser({
                        user_name:user_name, 
                        id : id, 
                        user_profile:'',
                        uid: user.user.uid,
                    }))
                history.push('/')
            }).catch((error)=>{
                console.log(error);
            })
        })
        //오류가 난다면
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode,errorMessage)
        });
  
    }
  }

const loginCheckFB =() =>{
    return function(dispatch,getState,{history}){
        auth.onAuthStateChanged((user)=>{
            if(user){
                dispatch(setUser({
                    user_name : user.displayName,
                    user_profile:'',
                    id : user.email,
                    uid : user.id,
                }))
            }else{
                dispatch(logOut());
            }
        })
    }
}

//reducer
export default handleActions(
    {
        [SET_USER]:(state, action) => produce(state, (draft)=>{
            setCookie("is_login", "success");

            draft.user = action.payload.user;
            draft.is_login = true;
        }),
        [LOG_OUT]:(state, action) => produce(state, (draft)=>{
            deleteCookie("is_login");
            draft.user =null;
            draft.is_login=false;
        }),
        [GET_USER]:(state, action) => produce(state, (draft)=>{}),
    },
        initialState
);

//action creator export
const actionCreators ={
    setUser,
    logOut,
    getUser,
    signupFB,
    loginFB,
    loginCheckFB
};

export{actionCreators};