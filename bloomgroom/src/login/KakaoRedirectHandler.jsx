import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { REST_API_KEY, REDIRECT_URI } from './OAuth';

function KakaoRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    if (code) {
      getAccessToken(code);
      console.log(code);
    }
  }, [code]);

  const getAccessToken = async (code) => {
    try {
      const response = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: code,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token request failed:', errorData);
        return;
      }
  
      const data = await response.json();
      console.log('Access token:', data.access_token);
  
      getUserInfo(data.access_token);
  
    } catch (error) {
      console.error('Error during token request:', error);
    }
  };

  const getUserInfo = async (accessToken) => {
    try {
      const response = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userInfo = await response.json();
      console.log('사용자 정보:', userInfo);
      navigate('/main', { replace: true });

    } catch (error) {
      console.error('사용자 정보 요청 중 오류 발생:', error);
    }
  };

  return <div>카카오 로그인 중...</div>;
}

export default KakaoRedirectHandler;
