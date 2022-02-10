import React from "react";
import { Text, Input, Grid, Button } from "../elements";
// import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck, pwdCheck } from "../shared/common";

const Login = (props) => {

  const dispatch = useDispatch();

  const [id,serId] = React.useState("");
  const [pwd, setPwd] =React.useState("")

  const login = () =>{

    if(id === ""|| pwd === ""){
      return;
    }

    if(!emailCheck(id)){
      window.alert('이메일 형식이 맞지 않습니다')
      return
    }

    dispatch(userActions.loginFB(id,pwd));
  }


  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              serId(e.target.value)
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label = "패스워드"
            placeholder = "패스워드 입력해주세요."
            type = "password"
            _onChange={(e) => {
              setPwd(e.target.value)
            }}
          />
        </Grid>

        {/* disabled={!(checkId.test(inputId) && inputPw.length > 5)} */}
        <Button text="로그인하기" _onClick={() => {login()}} is_disabled = {id===""|| pwd===""? true:false}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
