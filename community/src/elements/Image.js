import styled from 'styled-components';
import React from "react";

const Image = (props) => {
    const {shape, src, size, center} = props;

    const styles = {
        src: src,
        size: size,
        center:center,
    }

    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    return (
        <React.Fragment>
            <Image/>
        </React.Fragment>
    )
}

Image.defaultProps = {
  shape: "circle",
  src: "https://cdn.clien.net/web/api/file/F01/12114079/1b1aaaf7cb9845.png?w=780&h=30000",
  size: 36,
  center: false,
};

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
    --size: ${(props) => props.size}px;
    width: var(--size);
    /* height: var(--size); */
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`;

export default Image;