// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state)=>state.post.list);
    console.log(post_list)

    React.useEffect(()=>{
        dispatch(postActions.getPostFB())
    },[]);

    return (
        <React.Fragment>
            {/* <Post/> */}
            {post_list.map((p,idx)=>{
                return <Post key={p.id} {...p}/>
            })}
        </React.Fragment>
    )
}

export default PostList;

