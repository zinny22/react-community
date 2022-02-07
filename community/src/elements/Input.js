import React from "react";
import styled from "styled-components";

import {Text, Grid} from "./index";

const Input = (props) => {
    const {label, placeholder, _onChange, type} = props;
    return (
      <React.Fragment>
        <Grid>
          <Text margin="0px">{label}</Text>
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        </Grid>
      </React.Fragment>
    );
}

Input.defaultProps = {
    label: '텍스트',
    placeholder: '텍스트를 입력해주세요.',
    _onChange: () => {},
    type:"text"
}

const ElInput = styled.input`
    border: 1px solid #b54e0f;
    border-top: none;
    border-left: none;
    border-right: none;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;