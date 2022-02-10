import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";

const SET_POST = "SET_POST";
const ADD_POST ="ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST ="DELETE_POST";
const LIKE_POST ="LIKE_POST";

const setPost = createAction(SET_POST, (post_list)=>({post_list}));
const addPost = createAction(ADD_POST, (post)=>({post}));
const editPost = createAction(EDIT_POST, (post_id,post)=>({post_id, post}))
const deletePost = createAction(DELETE_POST,(post_idx)=>({post_idx}));
const likePost = createAction(LIKE_POST,(post_id)=>({post_id}));

//이 리듀서가 사용할 
const initialState ={
    list :[],

} 

//게시글 하나에 대한 기본 내용 
const initialPost ={
    // id :0,
    // user_info: {
    //     user_name: "hyejin",
    //     user_profile: "https://cdn.clien.net/web/api/file/F01/12114079/1b1aaaf7cb9845.png?w=780&h=30000",
    //   },
      image_url: "https://cdn.clien.net/web/api/file/F01/12114079/1b1aaaf7cb9845.png?w=780&h=30000",
      contents: "",
      comment_cnt: 0,
      insert_dt : moment().format("YYYY-MM-DD hh:mm:ss"),
      user_like:[],
}

const likePostFB = (post_id=null, user_like=[])=>{
    return function(dispatch, getState,{history}){
        const user_id =getState().user.user.uid;
        const _post_idx = getState().post.list.findIndex(p=>p.id===post_id);
        const _user_like = getState().post.list
        console.log(_user_like)
        const postDB = firestore.collection("post");

        // postDB.get().then((docs)=>{
        //     let post_list =[];    

        //     docs.forEach((doc)=>{
        //         let _post = doc.data()
        //         console.log(_post)
        //         })
        //     })

    }
}

const deletePostFB = (post_id=null) =>{
    return function(dispatch, getState,{history}){

        const _post_idx = getState().post.list.findIndex((p)=>p.id===post_id)

        const postDB = firestore.collection("post");
           postDB.doc(post_id).delete().then(() => {
            //액션생성함수에서도 post_id를 쓸수있게 dispatch로 값을 보내주는 작업을 해야한다. 
            dispatch(deletePost(_post_idx));
            console.log("successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

const editPostFB =(post_id=null, post={})=>{
    return function(dispatch,getState,{history}){

        if(!post_id){
            console.log("게시물 정보가 없어요")
            return;
        }
        const _image = getState().image.preview;
        const _post_idx = getState().post.list.findIndex((p)=>p.id===post_id)
        const _post = getState().post.list[_post_idx];
        
        const postDB = firestore.collection("post");
        if(_image === _post.image_url){
            postDB.doc(post_id).update(post).then((doc) =>{
                dispatch(editPost(post_id, {...post}))
                history.replace("/")
            })
            return ;
        } else{
            const user_id =getState().user.user.uid
            const _upload = storage.ref(`images/${user_id}_${new Date().getTime()}`).putString(_image, "data_url");

            _upload.then((snapshot)=>{
                snapshot.ref.getDownloadURL().then(url=>{
                    console.log(url);
                    return url;
                }).then(url=>{
                    postDB.doc(post_id).update({...post, image_url:url}).then((doc) =>{
                        dispatch(editPost(post_id), {...post,image_url:url})
                        history.replace("/")
                    })
                }).catch((err)=>{
                    window.alert("이미지 업로드 실패");
                    console.log("이미지 로드에 문제가 있음", err);
                })
            })
        }
    }
}

const addPostFB =(contents="", value ="")=>{
    return function(dispatch, getState,{history}){

        const postDB = firestore.collection("post");

        const _user =getState().user.user;

        const user_info={
            user_name : _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        }

        const _post ={
            ...initialPost,
            contents:contents,
            insert_dt:moment().format("YYYY-MM-DD hh:mm:ss"),
            value:value,
            user_like:[{[_user.uid]: false }],
        }
        console.log(_post)

        const _image = getState().image.preview;
        // console.log(_image)

        const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, "data_url");

        _upload.then((snapshot)=>{
            snapshot.ref.getDownloadURL().then(url=>{
                console.log(url);
                return url;
            }).then(url=>{
                postDB
                .add({...user_info,..._post, image_url:url})
                .then((doc)=>{
                    let post ={user_info,..._post, id:doc.id, image_url:url}
                    dispatch(addPost(post));
                    history.replace("/");

                    dispatch(imageActions.serPreview(null));
                })
                .catch((err)=>{
                    window.alert("포스트 작성 실패");
                    console.log("post 작성 실패",err);
                })
            }).catch((err)=>{
                window.alert("이미지 업로드 실패");
                console.log("이미지 로드에 문제가 있음", err);
            })
        })
    }
}

const getPostFB =()=>{
    return function(dispatch, getState, {history}){
        const postDB = firestore.collection("post");

        postDB.get().then((docs)=>{
            let post_list =[];    

            docs.forEach((doc)=>{
                let _post ={
                    id: doc.id,
                    ...doc.data()
                };

                let post ={
                    id:doc.id,
                    user_info: {
                        user_name: _post.user_name,
                        user_id : _post.user_id,
                        user_profile: _post.user_profile,
                      },
                      image_url:_post.image_url,
                      contents: _post.contents,
                      comment_cnt: _post.comment_cnt,
                      insert_dt: _post.insert_dt,
                      value: _post.value,
                      uid :_post.uid

                }


                post_list.push(post)
            })
            dispatch(setPost(post_list))
        })
    }
}


//reducer
export default handleActions(
    {
        [SET_POST]:(state, action)=> produce(state,(draft)=>{
            draft.list=action.payload.post_list;
        }),

        [ADD_POST]:(state, action)=> produce(state, (draft)=>{
            draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST]:(state, action)=>produce(state, (draft)=>{
            let idx = draft.list.findIndex((p)=> p.id ===action.payload.post_id);
            //{업데이트 전, 업데이트 후} 그래서업데이트 전꺼를 업데이트 후로 바꿔주는 작업을 하는데
            //그리고 왼쪽에 덮어씌워준다 
            draft.list[idx] = {...draft.list[idx], ...action.payload.post}
        }),
        //원본의 draft복사본
        [DELETE_POST]:(state, action) => produce(state, (draft)=>{
            let deleted = draft.list.filter((e,i) => {
                //(action.해서 가져오는 값)
                return (parseInt(action.payload.post_idx) !== i)
              })
              draft.list = deleted;
        }),
    }, initialState
);

const actionCreators ={
    setPost,
    addPost,
    editPost,
    getPostFB,
    addPostFB,
    editPostFB,
    deletePost,
    deletePostFB,
    likePost,
    likePostFB
}
export {actionCreators}