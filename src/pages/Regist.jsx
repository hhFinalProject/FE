import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import ImageBlock from '../components/RegistComponents/ImageBlock'
import { Div, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import useInput from '../hooks/useInput'
import { getCookie } from '../shared/Cookies'
import { DescInput, PriceDiv, PriceInput, PriceSpan, RegistTitle, TitleInput } from '../components/RegistComponents/RegistStyled'
import NaverMap from '../components/RegistComponents/Map'
import { useSelector } from 'react-redux'

function Regist() {
  const {mutate, isLoading, isError, isSuccess} = useMutation({
    mutationKey:['mutate'],
    mutationFn: async(values)=>{
      console.log(values)
      const accessToken = getCookie('token')
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/products`,values,{
        headers:{
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
    }
  })

  const { image, location } = useSelector(state => state.Post)

  const { values, onChange } = useInput({
    title: "",
    description: "",
    price: '',
    location:'',
    images : '',
  })


  const onSubmitHandler = (event) => {
    event.preventDefault();
    mutate({
      ...values,
      images:image,
      location:location
    })
  }
  
  console.log(location)
 

  return (
    <>
      <HeaderNav/>
      <MaxWidthDiv 
      padding = '6rem 0 0 0'
      >
        <Div
        fDirection = {'row'}>
          <RegistTitle>대여물품 등록</RegistTitle>
          <TitleInput
            name='title'
            placeholder='제목 : 카메라 대여하고 싶으신 분 찾아요!'
            value={values.title}
            onChange={onChange}
          />
          <ImageBlock/>
        </Div>
        <Div
          fDirection = {'row'}
        >
          <form onSubmit={onSubmitHandler}>
          <DescInput
            name='description'
            placeholder='상세설명 :기종, 물품, 구매일자, 물품컨디션'
            value={values.description}
            onChange={onChange}
          />
          <PriceDiv>
            <PriceSpan>가격</PriceSpan>
            <PriceInput
                type={'number'}
                name='price'
                placeholder='가격을 책정해주세요'
                value={values.price}
                onChange={onChange}
            />
          </PriceDiv>
            <NaverMap/>
            <button style={{marginTop:'10px'}}> 등록하기 </button>
          </form>
        </Div>
      </MaxWidthDiv>
    </>
  )
}

export default Regist;