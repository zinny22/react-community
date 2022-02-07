import React from "react";
import {Grid, Text, Button} from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";

//스토어에 있는 값을 가져와서 쓸수있게 하는 
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import {history} from "../redux/configureStore"
import Permit from "../shared/permit";

const Header = (props) => {

    const dispatch = useDispatch();

    const is_login = useSelector((state)=>state.user.is_login);

    if(is_login){
        return(
            <Permit>
                <Grid is_flex padding="10px 16px">
                    <Grid>
                        <Text margin="0px" size="15px" bold>🧡내사모🧡</Text>
                    </Grid>
                    
                    <Grid is_flex>
                        <Button text="내정보"></Button>
                        <Button text="알림" margin="2px"></Button>
                        <Button text="로그아웃" _onClick={()=>{dispatch(userActions.logoutFB())}}></Button>
                    </Grid>
                </Grid>
            </Permit>
        )
    }
    
    return (
        <React.Fragment>
            <Grid is_flex padding="10px 16px">
                <Grid>
                    <Text margin="0px" size="24px" bold>🧡내사모🧡</Text>
                </Grid>
                
                <Grid is_flex>
                    <Button text="로그인" margin="2px" _onClick={()=>{
                        history.push('/login')
                    }}></Button>
                    <Button text="회원가입" _onClick={()=>{
                        history.push('/signup')
                    }}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {}

export default Header;