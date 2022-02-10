// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
//   console.log(post_list);

  const user_info = useSelector((state) => state.user.user);
//   console.log(user_info);

  const { history } = props;

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid padding ="20px 0px">
        {/* <Post/> */}
        {post_list.map((p, idx) => {
          if (p.user_info.user_id === user_info?.uid) {
            return (
              <Grid key={p.id} _onClick={() => {history.push(`/post/${p.id}`);}}>
                <Post {...p} is_me />
              </Grid>
            );
          } else {
            return (
              <Grid key={p.id} _onClick={() => {history.push(`/post/${p.id}`);}}>
                <Post {...p} />
              </Grid>
            );
          }
        })}
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
