import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid } from "../elements";
import { storage } from "./firebase";
import { actionCreators as imageActions } from "../redux/modules/image";
import styled from "styled-components";

const Upload =(props) =>{
    const dispatch = useDispatch();
    const is_uploading = useSelector((state) => state.image.uploading);

    const fileInput = React.useRef();

    const selectFile = (e)=>{
        // console.log(e)
        // console.log(e.target);
        // console.log(e.target.files[0]);

        // console.log(fileInput.current.files[0]);

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend=()=>{
            console.log(reader.result);
            dispatch(imageActions.serPreview(reader.result))
        }
    }

    const uploadFB =()=>{
        if (!fileInput.current || fileInput.current.files.length === 0) {
            window.alert("파일을 선택해주세요!");
            return;
          }
      
          dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
        // let image = fileInput.current?.files[0];
        // const _upload = storage.ref(`images/${image.name}`).put(image);

        // _upload.then((snapshot)=>{
        //     console.log(snapshot);

        //     snapshot.ref.getDownloadURL().then((url)=>{
        //         console.log(url)
        //     })
        // })
    }

    return (
        <React.Fragment>
            <Grid is_flex>
                <input type= "file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
                <Button _onClick={uploadFB} width ="90px">업로드하기</Button>
            </Grid>
            <Line/>
        </React.Fragment>
    )
}

const Line = styled.hr`
    color : gray;
`

export default Upload;