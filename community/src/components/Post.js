import React from "react";
import {Button, Grid, Image, Text} from "../elements";
import {history} from "../redux/configureStore"
import { useDispatch} from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";


const Post = (props) => {
  const dispatch = useDispatch();
  console.log(props.value);

  if(props.value==="right"){
    return (
      <React.Fragment>
        <Grid padding="16px">
          <Grid is_flex >
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text bold>{props.user_info.user_name}</Text>
            </Grid>

            <Grid is_flex width="auto" >
                <Text>{props.insert_dt}</Text>
                {props.is_me && <Button width="90px" margin ="4px" _onClick={()=>{ history.push(`/write/${props.id}`)}} >수정</Button>}
                {props.is_me && <Button width="90px" _onClick={()=>{dispatch(postActions.deletePostFB(props.id))}} >삭제</Button>}
            </Grid>
          </Grid>
          <Grid is_flex >
            <Text margin ="0px" bold size ="24px">{props.contents}</Text>
            <Grid width="30vw"><Image shape = "rectangle" src={props.image_url} /></Grid>  
          </Grid>

          <Grid padding="16px">
            <Text bold>댓글 {props.comment_cnt}개</Text>
          </Grid>
          
        </Grid>
      </React.Fragment>
    );
  }

  if(props.value==="left"){
    return (
      <React.Fragment>
        <Grid padding="16px">
          <Grid is_flex >
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text bold>{props.user_info.user_name}</Text>
            </Grid>

            <Grid is_flex width="auto" >
                <Text>{props.insert_dt}</Text>
                {props.is_me && <Button width="90px" margin ="4px" _onClick={()=>{ history.push(`/write/${props.id}`)}} >수정</Button>}
                {props.is_me && <Button width="90px" _onClick={()=>{dispatch(postActions.deletePostFB(props.id))}} >삭제</Button>}
            </Grid>
          </Grid> 

          <Grid is_flex>
            <Grid width="30vw"><Image shape = "rectangle" src={props.image_url}/></Grid>
            <Text margin ="0px" bold size ="24px">{props.contents}</Text>
          </Grid> 

          <Grid padding="16px">
            <Text bold>댓글 {props.comment_cnt}개</Text>
          </Grid>
          
        </Grid>
      </React.Fragment>
    );
  }

  else{
    return (
      <React.Fragment>
        <Grid padding="16px">
          <Grid is_flex >
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text bold>{props.user_info.user_name}</Text>
            </Grid>

            <Grid is_flex width="auto" >
                <Text>{props.insert_dt}</Text>
                {props.is_me && <Button width="90px" margin ="4px" _onClick={()=>{ history.push(`/write/${props.id}`)}}>수정</Button> }
                {props.is_me && <Button width="90px" _onClick={()=>{dispatch(postActions.deletePostFB(props.id))}} >삭제</Button>}
            </Grid>
          </Grid>

          <Grid padding="16px">
            <Text bold size ="24px">{props.contents}</Text>
          </Grid>

          <Grid>
            <Image shape="rectangle" src={props.image_url} />
          </Grid>

          <Grid padding="16px">
            <Text bold >댓글 {props.comment_cnt}개</Text>
          </Grid>
          
        </Grid>
      </React.Fragment>
    );
  }

}

Post.defaultProps = {
  user_info: {
    user_name: "hyejin",
    user_profile: "https://cdn.clien.net/web/api/file/F01/12114079/1b1aaaf7cb9845.png?w=780&h=30000",
  },
  image_url: "https://cdn.clien.net/web/api/file/F01/12114079/1b1aaaf7cb9845.png?w=780&h=30000",
  contents: "우리예쁜 소희",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;