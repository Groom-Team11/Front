import { KAKAO_AUTH_URL } from './OAuth.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "@emotion/styled"
import React, { useEffect, useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  background-color: #BBD3E8;
  position: relative;
`;

const CloudImage = styled.img`
  width: 70vw;
  max-width: 250px;
  height: auto;
  margin-bottom: 3vh;
`;

const TitleText = styled.div`
  font-size: 9vw;
  max-font-size: 9vw;
  font-weight: bold;
  color: #555;
  text-align: center;
  margin-bottom: 5vh;
`;

const LoginButton = styled.a`
  border: none;
  background-color: #BBD3E8;
`;

const TalkIcon = styled.img`
  width: 60vw;
  height: auto;
`;

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const loginCheck = () => {
        navigate('/main');
    };
    const fetchLogin = async () => {
      try{
        await fetch(`http://3.36.171.123/login?code=${localStorage.getItem('code')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          credentials: 'include'
        })
        .then(response => {
          const jwtToken = response.headers.get('Authorization');
          if (jwtToken) {
            localStorage.setItem('jwtToken', jwtToken);
            loginCheck();
          } else {
            console.error('JWT 토큰을 찾을 수 없습니다.');
          }
          return response.json();
        })
      }
      catch (error) {
        console.error('오류 발생:', error);
      }
    };
    useEffect(() => {
      if(new URLSearchParams(location.search).get('code')){
        localStorage.setItem('code', new URLSearchParams(location.search).get('code'));
      }
      if(localStorage.getItem('code')){
        fetchLogin();
      }
    }, [localStorage.getItem('code')]);

    

    return (
        <Wrapper>
            <CloudImage src="/cloud/cloud1.png" />
            <TitleText>Bloom, Goorm</TitleText>
            <LoginButton href={KAKAO_AUTH_URL}>
                <TalkIcon src="/kakao_login.png" />
            </LoginButton>
        </Wrapper>
    );
}
