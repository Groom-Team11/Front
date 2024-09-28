import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function KakaoRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState(new URLSearchParams(location.search).get('code'));

  useEffect(() => {
    if(code){
      console.log(code);
      getAccessToken();
    }
  }, []);

  const getAccessToken = async (code) => {
    try {
      console.log(new URLSearchParams(location.search).get('code'));
      const response = await fetch(`http://3.36.171.123/oauth2/callback/kakao?code=${new URLSearchParams(location.search).get('code')}`, {
      // const response = await fetch(`http://localhost:3000/oauth2/callback/kakao?code=${new URLSearchParams(location.search).get('code')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token request failed:', errorData);
        return;
      }
    
      const data = await response.json();
      console.log('Access token:', data.access_token);
      const message = data.information.message;

      if (message.includes('회원가입 성공')) {
          console.log('회원가입 성공: /login으로 이동');
          navigate('/login');
          return;
      }

      const accessTokenMatch = message.match(/Access Token:\s([a-zA-Z0-9-_]+)/);
      const refreshTokenMatch = message.match(/Refresh Token:\s([a-zA-Z0-9-_]+)/);

      const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
      const refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;

      window.localStorage.setItem('accessToken', accessToken)
      window.localStorage.setItem('refreshToken', refreshToken)

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
    } catch (error) {
      console.error('Error during token request:', error);
    }
  };

  return <div>카카오 로그인 중...</div>;
}

export default KakaoRedirectHandler;
