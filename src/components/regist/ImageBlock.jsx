import React, { useEffect, useState } from 'react'
import { FirstPreview, OtherPreview, PreviewContainer } from './RegistStyled';
import { useDispatch, useSelector } from 'react-redux'
import { storeImage } from '../../redux/modules/Post';
import { useNavigate } from 'react-router-dom';
import { Popup } from '../detail/detailStyle';

function ImageBlock({image, id}) {
    const [imageURL, setImageURL] = useState([]);

    useEffect(()=>{
        if(image){
            setImageURL(image);
        }
       return () => {
        setImageURL([]);
       } 
    },[id])

    const dispatch = useDispatch();
    // if(imageURL === undefined){
    //     return(
    //         <Popup>
    //             <img src='/images/Village.png' style={{width:'300px'}}/>
    //             Please enter your post again.
    //         </Popup>
    //     )
    // }
    const onImageChangeHandler = async(event) => {
        event.preventDefault();
        const imageLists = event.target.files
        console.log(imageLists)
        //이미지 미리보기
        const ImageURLLists = []
        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            console.log(currentImageUrl)
            ImageURLLists.push(currentImageUrl)
        }
        setImageURL(ImageURLLists)

        //여기서부터 서버통신 시작
        const formData = new FormData()
        formData.append('images', Object.values(imageLists))
        
        for (let value of Object.values(imageLists)) {
            console.log(value);
        }
        dispatch(storeImage(Object.values(imageLists)))
    }
  return (
    <div>
        <label htmlFor='file'>
            <FirstPreview src = {imageURL[0]} alt="여기를 클릭해서 " />
            <div style={{position:'absolute',top :'48%', left : '25%', fontSize:'30px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <span>'여기'를 클릭해서</span>
                <span>물품 이미지를 첨부해주세요</span>

            </div>
        </label>
        <PreviewContainer>
            <OtherPreview src = {imageURL[1]} alt=""/>
            <OtherPreview src = {imageURL[2]} alt=""/>
            <OtherPreview src = {imageURL[3]} alt=""/>
            <OtherPreview src = {imageURL[4]} alt=""/>
        </PreviewContainer>
        
        <input type={'file'} id='file' multiple style={{display:'none'}} onChange={onImageChangeHandler}/>
    </div>
    
)
}

export default ImageBlock;