import React from "react";
import { Button, Grid, Text, Image} from "../elements";

const CommentList =(props)=>{
    return(
        <React.Fragment>
            <Grid padding ="16px">
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
            </Grid>
        </React.Fragment>
    )
}

export default CommentList;

const CommentItem =(props)=>{
    const{user_id,user_name,user_profile,post_id,insert_dt, contents} = props

    return(
        <Grid is_flex>
            <Grid is_flex width="auto">
                <Image shape ="circle"/>
                <Text bold margin="0px 2px">{user_name}</Text>
            </Grid>
            <Grid is_flex margin="0px 4px">
                <Text margin="0px">{contents}</Text>
                <Text margin="0px">{insert_dt}</Text>
            </Grid>
        </Grid>
    )
}

CommentItem.defaultProps ={
    user_profile :"",
    user_name:"jin",
    user_id:"",
    post_id:1,
    contents:"세상 존예 한소희",
    insert_dt:'2022-01-07 19:00:00'
}