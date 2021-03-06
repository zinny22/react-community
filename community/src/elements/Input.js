import React from "react";
import styled from "styled-components";

import {Text, Grid} from "./index";

const Input = (props) => {
    const {label, placeholder, _onChange, type, multiLine, value} = props;

    if(multiLine){
      return(
        <React.Fragment>
        <Grid>
          {label?"":<Text margin="0px">{label}</Text>}
          <ElTextarea 
          rows={10}
          value = {value}
          placeholder={placeholder} 
          onChange={_onChange} />
        </Grid>
      </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <Grid>
          {label?"":<Text margin="0px">{label}</Text>}
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        </Grid>
      </React.Fragment>
    );
}

Input.defaultProps = {
    multiLine: false,
    label: '텍스트',
    placeholder: '텍스트를 입력해주세요.',
    _onChange: () => {},
    type:"text",
    value: "",
}

const ElTextarea = styled.textarea`
    border: 1px solid #b7e4c7;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`

const ElInput = styled.input`
    border: 1px solid #b7e4c7;
    border-top: none;
    border-left: none;
    border-right: none;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;