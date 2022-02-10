import {createAction, handleActions} from "redux-actions";
import {produce} from "immer"
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";
import firebase from 'firebase/compat/app';

const LIKE = "LIKE";

const like = createAction(LIKE, (post_id, user)=>({post_id, user}));

const initialState ={
    is_check : false,
};

const likeFB = (post_id, user)=>{
    return function(dispatch, getState,{history}){
        
    }
}

export default handleActions({
    [LIKE]:(state, action) => produce(state, (draft)=>{

    }),
    }
    ,initialState
)

const actionCreators ={
    like,
    likeFB,
};

export{actionCreators};