import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { getCookie } from '../../shared/Cookies';
import { FlexDiv, MaxWidthDiv, Div } from './globalStyle'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn';

function HeaderNav() {
  const accessToken = getCookie("token");
  const [token, setToken] = useState("");
  const location = useLocation();
  const navi = useNavigate();
  const onNavigateChat = useMutation({
    mutationKey:['onNavigateChat'],
    mutationFn: async()=>{
      return await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/room?`,{
        headers : {
          Authorization: `Bearer ${accessToken}`
        }
      })
    },
    onSuccess : (response) => {
      navi(`/chat/${response.data.data.roomList.filter(item => item.target === true)[0].roomId}`)
    }
  })

  useEffect(()=>{
    setToken(accessToken);
  },[location])

  return (
    <FlexDiv height="6rem" position="fixed" zIndex="2">
      <MaxWidthDiv height="100%" jc="space-between" alignItem="center">
          <Div gap="2rem">
            <img src="/images/Village.png" alt="mainLogo" style={{width:"8rem"}} onClick={()=>{navi("/")}} />
            <Span style={{marginTop: "auto", marginBottom: "auto"}} onClick={()=>{navi("/search")}}>전체상품조회</Span>
            <Span style={{marginTop: "auto", marginBottom: "auto"}} onClick={()=>{navi("/regist")}}>물품등록-누른 후 새로고침 필요</Span>
          </Div>
          <Div>
            {location.pathname === "/login"
            ? null
            : (token
              ? (location.pathname === "/mypage"
                ? <Div jc="center" alignItem="center" gap="1rem">
                    <LogoutBtn />
                  </Div>
                : <Div jc="center" alignItem="center" gap="1rem">
                    <button onClick={()=>{onNavigateChat.mutate()}}> 빌리지 채팅 </button>
                    <span onClick={()=>{navi("/mypage")}} style={{cursor:"pointer"}}>마이페이지</span>
                    <LogoutBtn />
                  </Div>
                )
              : <div onClick={()=>{navi("/login")}}>
                  <LoginBtn />
                </div>)
            }
          </Div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default HeaderNav

const Span = styled.span`
  cursor: pointer;
`