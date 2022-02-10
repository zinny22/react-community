import React from "react";
import styled from "styled-components";

const Button = (props) => {

    const {text, _onClick, margin, is_float, children, width, is_disabled} = props;
    
    const styles ={
      margin: margin,
      width: width,
    }

    if(is_float){
      return(
        <React.Fragment>
          <FloatButton onClick={_onClick} disabled={is_disabled}>{text? text:children}</FloatButton>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <ElButton onClick={_onClick} {...styles} disabled={is_disabled}>{text? text:children}</ElButton>
      </React.Fragment>
    );
}

Button.defaultProps = {
    text: false,
    children: null,
    _onClick: () => {},
    margin: false,
    is_float : false,
    width : '100%',
    is_disabled: false,
}

const ElButton = styled.button`
    width: ${(props)=>props.width};
    background-color: #40916c;
    border-radius: 5px;
    color: #ffffff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;
    margin: ${(props)=>props.margin};
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #40916c;
  color: #ffff;
  box-sizing:  border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px ;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;

`

export default Button;