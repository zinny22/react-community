import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

const PostWrite = (props) =>{
    return(
        <React.Fragment>
            <Grid padding= "16px">
                <Grid>
                    <Text size ="36px" bold>게시글 작성</Text>
                    <Upload/>
                </Grid>

                <Grid>
                    <Grid padding="16px" >
                        <Text margin ="0px" bold size ="24px">미리보기</Text>
                    </Grid>

                    <Image shape = "rectangle"/>
                </Grid>

                <Grid padding="16px">
                    <Input label="게시글 내용" placeholder="게시글 작성" multiLine/>
                </Grid>

                <Grid padding="16px">
                    <Button>게시글 작성</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PostWrite;