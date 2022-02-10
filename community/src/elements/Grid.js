import React from "react";
import { FaRegCalendarMinus } from "react-icons/fa";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, margin, padding, bg, children, center,_onClick, border,border_radius,box_shadow} = props;

  const styles = {
      is_flex: is_flex,
      width: width,
      margin: margin,
      padding: padding,
      bg: bg,
      center: center,
      border: border,
      border_radius: border_radius,
      box_shadow:box_shadow,

  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  right: false,
  _onClick : ()=>{},
  border: false,
  border_radius :false,
  box_shadow :false,
};



const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
  ${(props)=> (props.center?`text-align : center`:"")}
  ${(props)=>(props.border? `border: ${props.border};` : "")}
  ${(props)=>(props.border_radius? `border-radius: ${props.border_radius};` : "")}
  ${(props)=>(props.box_shadow? `box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, #b7e4c7 0px 0px 0px 1px;` : "")}
`;

export default Grid;
