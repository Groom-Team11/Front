import styled from "@emotion/styled"
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100vㅈ; /* 앱 크기 기준 */
  margin: 0 auto;   /* 중앙 정렬 */
  padding: 0 16px;  /* 양쪽에 16px 여백 */
  width: 100%;
  position: relative; /* 자식 요소들의 위치를 제어하기 위해 */
  height: 40vh
`;

const CloudImage = styled.img`
    width: 300px;
    height: auto;
    position: relative;
    z-index: 10; /* Background 위로 올리기 위해 높은 z-index 설정 */
`;

const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    max-width: 100%;
    height: 100%;
    background-color: ${props => props.setLong ? '#BBD3E8' : '#3A3B48'};
    position: absolute; /* Wrapper를 기준으로 배치 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1; /* CloudImage 아래에 위치하도록 z-index 설정 */
    border-radius: 0px 0px 50px 50px;
`;
export default function CommonUI({ setLong, detailData }) {
    const [completedCount, setCompletedCount] = useState(0);
    const [cloudImage, setCloudImage] = useState('/cloud/cloud1.png'); // 처음 0/8 구름
    const location = useLocation(); // 현재 경로 확인
    useEffect(() => {
        // 라우터 경로가 '/main'이면 cloud8.png를 보여줌
        if (location.pathname === '/main') {
            setCloudImage('/cloud/cloud8.png'); // 모든 목표 완료된 이미지
        } else if (detailData && detailData.information.length > 0) {
            // 세부 목표 중 완료된 항목 개수 계산
            const total = detailData.information.length;
            const completed = detailData.information.filter(detail => detail.goalStatus).length;
            setCompletedCount(completed/total*100);
            // 완료 비율에 따라 8단계 구름 이미지 선택
            const completionRatio = completed / total;
            const stage = Math.round(completionRatio * 8); // 0에서 8까지 단계로 나눔

            // 단계별로 구름 이미지 설정 (0/8, 1/8, ..., 8/8)
            if(stage===8){
            setCloudImage(`/cloud/cloud8.png`);
            }
            else{
            setCloudImage(`/cloud/cloud${stage + 1}.png`);
            }
        }
    }, [location.pathname, detailData]);
    return (
        <Wrapper>
            <Background setLong={setLong}>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center"}}>
                <CloudImage src={cloudImage} alt="Progress Cloud" />
                {location.pathname === "/detail" && <div style={{textAlign:"center", fontSize:"32px", color: "white", fontWeight:"500"}}>{completedCount}%</div>}
            </div>
            </Background>
        </Wrapper>
    );
}