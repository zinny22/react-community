import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch} from "react-redux"; 
import { actionCreators as postActions} from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) =>{
    const dispatch = useDispatch();
    //useSelector는 리덕스에 담겨있는 스토어에서 값을 받아온다 
    const is_login = useSelector((state)=> state.user.is_login);
    const preview = useSelector((state)=> state.image.preview)
    const post_list = useSelector((state)=>state.post.list)
    const {history} = props;

   
    const [value, setValue] =React.useState("");

    const post_id = props.match.params.id;
    const is_edit = post_id?true:false;

    const _post = is_edit? post_list.find((p)=>p.id===post_id):null

    const [contents, setContents] = React.useState(_post ? _post.contents:"");

    React.useEffect(() =>{
        if(is_edit && !_post){
            window.alert("no!");
            history.goBack();

            return;
        }

        if(is_edit){
            dispatch(imageActions.serPreview(_post.image_url))
        }
    },[])

    const changeValue =(e)=>{
        setValue(e.target.value);
    }

    console.log(value);

    const changeContents =(e)=>{
        setContents(e.target.value);
        
    }

    const addPost =()=>{
        dispatch(postActions.addPostFB(contents,value))
    }

    const editPost =()=>{
        dispatch(postActions.editPostFB(post_id, {contents: contents}))
    }

    if(!is_login){
        return (
            <Grid margin="100px 0px" padding ="16px" center>
                <Text size="32px" bold>앗 잠깐</Text>
                <Text size="16px">로그인 후에만 글을 쓸 수 있어요</Text>
                <Button _onClick={()=>{history.replace('/')}}>로그인 하러가기</Button>
            </Grid>
        )
    }
    return(
        <React.Fragment>
            <Grid padding= "16px">
                <Grid>
                    <Text size ="36px" bold>{is_edit? "게시글 수정": "게시글 작성"}</Text>
                    <Upload/>
                </Grid>

                <Grid padding="16px" >
                    <Grid>
                        <input type="radio" name="chk_info" value="right" onClick={changeValue}/>오른쪽에 이미지 왼쪽에 텍스트
                        <Grid is_flex >
                        <Text margin ="0px" bold size ="24px">미리보기</Text>
                        <Grid width="30vw"><Image shape = "rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} /></Grid>  
                        </Grid>
                    </Grid>
                </Grid>

                <Grid padding="16px">
                    <Grid>
                        <input type="radio" name="chk_info" value="left" onClick={changeValue}/>왼쪽에 이미지 오른쪽에 텍스트 
                        <Grid is_flex>
                            <Grid width="30vw"><Image shape = "rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"}/></Grid>
                        <Text margin ="0px" bold size ="24px">미리보기</Text>
                        </Grid> 
                    </Grid>
                </Grid>

                <Grid padding="16px">
                    <Grid>
                        <input type="radio" name="chk_info" value="middle" onClick={changeValue}/>하단에 이미지 상단에 텍스트
                    </Grid>
                    <Grid width="44vw" margin="auto">
                        <Text margin ="0px" bold size ="24px">미리보기</Text>
                        <Image shape = "rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"}/>
                    </Grid>
                </Grid>

                <Grid padding="16px">
                    <Input value ={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine/>
                </Grid>

                <Grid padding="16px">
                    {is_edit?(<Button _onClick={editPost}>게시글 수정</Button>):(<Button _onClick={addPost}>게시글 작성</Button>)}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PostWrite;