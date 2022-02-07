import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";

const SET_POST = "SET_POST";
const ADD_POST ="ADD_POST";

const setPost = createAction(SET_POST, (post_list)=>({post_list}));
const addPost = createAction(ADD_POST, (post)=>({post}));

//이 리듀서가 사용할 
const initialState ={
    list :[],
} 

//게시글 하나에 대한 기본 내용 
const initialPost ={
    id :0,
    user_info: {
        user_name: "hyejin",
        user_profile: "https://cdn.clien.net/web/api/file/F01/12114079/1b1aaaf7cb9845.png?w=780&h=30000",
      },
      image_url: "https://cdn.clien.net/web/api/file/F01/12114079/1b1aaaf7cb9845.png?w=780&h=30000",
      contents: "우리예쁜 소희",
      comment_cnt: 10,
      insert_dt: "2021-02-27 10:00:00",
}

const getPostFB =()=>{
    return function(dispatch, getState, {history}){
        const postDB = firestore.collection("post");

        postDB.get().then((docs)=>{
            docs.forEach((doc)=>{
                console.log(doc.id, doc.data())
            })
        })
    }
}


//reducer
export default handleActions(
    {
        [SET_POST]:(state, action)=> produce(state,(draft)=>{

        }),

        [ADD_POST]:(state, action)=> produce(state, (draft)=>{

        })
    }, initialState
);

const actionCreators ={
    setPost,
    addPost,
    getPostFB
}
export {actionCreators}