import React from "react";
import {Button, Grid, Image, Text} from "../elements";
import {history} from "../redux/configureStore"
import { useDispatch} from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from "../redux/modules/like";
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';



const Post = (props) => {
  const dispatch = useDispatch();
  console.log(props.value);

  if(props.value==="right"){
    return (
      <React.Fragment>
        <Grid padding="16px" margin="4px 0px" box_shadow>
          <Grid is_flex >
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text size="17px" margin="0px 3px">{props.user_info.user_name}</Text>
            </Grid>

            <Grid is_flex width="auto" >
                <Text>{props.insert_dt}</Text>
                {props.is_me && <Button width="10vh" margin ="4px" _onClick={()=>{ history.push(`/write/${props.id}`)}} >수정</Button>}
                {props.is_me && <Button width="10vh" _onClick={()=>{dispatch(postActions.deletePostFB(props.id))}} >삭제</Button>}
            </Grid>
          </Grid>
          <Grid is_flex  padding="20px 0px 0px 0px">
            <Grid width="30vh"><Text margin ="0px" size ="1.5rem">{props.contents}</Text></Grid>
            <Grid width="35vh"><Image shape = "rectangle" src={props.image_url} /></Grid>  
          </Grid>

          <Grid padding="16px" is_flex>
            <FiHeart size="30px" onClick={(e)=>{
              e.stopPropagation()
              dispatch(postActions.likePostFB(props.id))}}/>
            <Text bold size="20px">댓글 {props.comment_cnt}개</Text>
          </Grid>
          
        </Grid>
      </React.Fragment>
    );
  }

  if(props.value==="left"){
    return (
      <React.Fragment>
        <Grid padding="16px" margin="4px 0px" box_shadow>
          <Grid is_flex >
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text size="17px" margin="0px 3px" >{props.user_info.user_name}</Text>
            </Grid>

            <Grid is_flex width="auto" >
                <Text>{props.insert_dt}</Text>
                {props.is_me && <Button width="10vh" margin ="4px" _onClick={()=>{ history.push(`/write/${props.id}`)}} >수정</Button>}
                {props.is_me && <Button width="10vh" _onClick={()=>{dispatch(postActions.deletePostFB(props.id))}} >삭제</Button>}
            </Grid>
          </Grid> 

          <Grid is_flex padding="20px 0px 0px 0px" width>
            <Grid width="35vh"><Image shape = "rectangle" src={props.image_url}/></Grid>
            <Grid width="auto"><Text margin ="0px" size ="1.5rem">{props.contents}</Text></Grid>
          </Grid> 

          <Grid padding="16px" is_flex>
          <FiHeart size="30px" onClick={(e)=>{
            e.stopPropagation()
            dispatch(postActions.likePostFB(props.id))}}/>
            <Text bold size="20px">댓글 {props.comment_cnt}개</Text>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  else{
    return (
      <React.Fragment>
        <Grid padding="16px" margin="4px 0px" box_shadow >
          <Grid is_flex>
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text size="17px" margin="0px 3px">{props.user_info.user_name}</Text>
            </Grid>

            <Grid is_flex width="auto" >
                <Text>{props.insert_dt}</Text>
                {props.is_me && <Button width="10vh" margin ="4px" _onClick={()=>{ history.push(`/write/${props.id}`)}}>수정</Button> }
                {props.is_me && <Button width="10vh" _onClick={()=>{dispatch(postActions.deletePostFB(props.id))}} >삭제</Button>}
            </Grid>
          </Grid>

          <Grid padding="16px" margin ="auto">
            <Text size ="1.5rem">{props.contents}</Text>
          </Grid>

          <Grid width="40vh" margin ="auto">
            <Image shape="rectangle" src={props.image_url} />
          </Grid>

          <Grid padding="16px" is_flex >
            <FiHeart size="30px" onClick={(e)=>{ 
              e.stopPropagation()
              dispatch(postActions.likePostFB(props.id))}}/>
            <Text bold size="20px">댓글 {props.comment_cnt}개</Text>
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