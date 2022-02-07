import React from "react";
import styled from "styled-components";

const Button = (props) => {

    const {text, _onClick, margin} = props;
    
    const styles ={
      margin: margin
    }
    return (
      <React.Fragment>
        <ElButton onClick={_onClick} {...styles}>{text}</ElButton>
      </React.Fragment>
    );
}

Button.defaultProps = {
    text: "텍스트",
    _onClick: () => {},
    margin: false
}

const ElButton = styled.button`
    width: 100%;
    background-color: #ff9800;
    border-radius: 5px;
    color: #ffffff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;
    margin: ${(props)=>props.margin}
`;

export default Button;