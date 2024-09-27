import CommonUI from "../common";
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled"

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

const LoginButton = styled.button`
  border: none;
  background-color: #BBD3E8;
`;

const TalkIcon = styled.img`
  width: 60vw;
  height: auto;
`;

export default function LoginPage() {
    const navigate = useNavigate();

    const loginCheck = () => {
        navigate('/main');
    };

    return (
        <Wrapper>
            <CloudImage src="/cloudImage.png" />
            <TitleText>Bloom, Goorm</TitleText>
            <LoginButton onClick={loginCheck}>
                <TalkIcon src="/kakao_login.png" />
            </LoginButton>
        </Wrapper>
    );
}
