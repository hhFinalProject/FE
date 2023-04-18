import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../shared/Cookies';
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react';

function Redirect() {
  const navi = useNavigate();

  // useQuery({
  //   queryKey: ["GET_KAKAO_LOGIN"],
  //   queryFn: async () => {
  //       const code = new URL(window.location.href).searchParams.get('code')
  //       const res = await axios.get(`http://3.37.127.30/users/login?code=${code}`)
        
  //       setCookie("token", res.headers.authorization.substring(7), {path:"/"});

  //       const decodeData = jwtDecode(res.headers.authorization);
  //       console.log("dd", decodeData);
  //       setCookie("userID", decodeData.sub, {path: "/"});
  //       setCookie("nickname", decodeData.auth, {path: "/"});

  //       alert(res.data.message);
  //       navi("/");
  //   }
  // })

  useEffect(()=>{
    (async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code')
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/login?code=${code}`)
        
        setCookie("token", res.headers.authorization.substring(7), {path:"/"});

        const decodeData = jwtDecode(res.headers.authorization);
        setCookie("userID", decodeData.sub, {path: "/"});
        setCookie("nickname", decodeData.auth, {path: "/"});

        alert(res.data.message);
        navi("/");
      } catch (e) {
        console.error(e);
        navi("/");
      }
    })();
  },[])

  // useQuery({
  //   queryKey: ["GET_KAKAO_LOGOUT"],
  //   queryFn: async () => {
  //       const code = new URL(window.location.href).searchParams.get('code')
  //       const res = await axios.get(`http://3.37.127.30/users/login?code=${code}`)
        
  //       setCookie("token", res.headers.authorization.substring(7), {path:"/"});

  //       const decodeData = jwtDecode(res.headers.authorization);
  //       setCookie("userID", decodeData.auth, {path: "/"});
  //       setCookie("nickname", decodeData.sub, {path: "/"});
  //       alert(res.data.message);
  //       navi("/");
  //   }
  // })

  return ;
}

export default Redirect