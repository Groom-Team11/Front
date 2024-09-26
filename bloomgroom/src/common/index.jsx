import styled from "@emotion/styled"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100vh; /* 앱 크기 기준 */
  margin: 0 auto;   /* 중앙 정렬 */
  padding: 0 16px;  /* 양쪽에 16px 여백 */
  width: 100%;
  position: relative; /* 자식 요소들의 위치를 제어하기 위해 */
  height: 100vh
`;

const CloudImage = styled.img`
    width: 50%;
    height: 50%;
    position: relative;
    z-index: 10; /* Background 위로 올리기 위해 높은 z-index 설정 */
`;

const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 100%;
    height: 40%;
    background-color: ${props => props.setLong ? '#BBD3E8' : '#3A3B48'};
    position: absolute; /* Wrapper를 기준으로 배치 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1; /* CloudImage 아래에 위치하도록 z-index 설정 */
    border-radius: 0px 0px 50px 50px;
`;

export default function CommonUI({setLong}) {
    return(
        <Wrapper>
            <Background setLong={setLong}>
            <CloudImage src="/cloudImage.png" />
            </Background>
        </Wrapper>
    );
}