import styled from "@emotion/styled";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap'; // Import Navbar and Nav from react-bootstrap
import { Modal } from 'react-bootstrap'; // Modal 추가
import axios from "axios"
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100vw; /* 앱 크기 기준 */
  margin: 0 auto;   /* 중앙 정렬 */
  padding: 0 16px;  /* 양쪽에 16px 여백 */
  width: 100%;
  position: relative; /* 자식 요소들의 위치를 제어하기 위해 */
  height: 40vh;
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
const HamburgerIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 30px;
  background-image: url('/hamburger.png'); /* 햄버거 아이콘 경로 설정 */
  background-size: cover;
  z-index: 101; /* z-index 값을 더 높게 설정 */
  cursor: pointer;
`;


const MenuModal = styled(Modal)`
  .modal-content {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    text-align: left;
  }
`;

const CloseButton = styled.button`
  background-color: #3A3B48; /* 닫기 버튼 배경색 */
  color: white; /* 글자색 */
  border: none;
  border-radius: 10px; /* 테두리 둥글게 */
  padding: 10px 20px; /* 안쪽 여백 */
  font-size: 16px; /* 글자 크기 */
  font-weight: 500; /* 글자 굵기 */
  width: 100px; /* 버튼 너비 */
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #2d2e39; /* 마우스 오버 시 색상 변경 */
  }
`;
const RainAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 40vh;
  pointer-events: none;
  z-index: 100;
  overflow: hidden;

  .drop {
    position: absolute;
    bottom: 100%;
    width: 1px;
    height: 60px;
    background: rgba(255, 255, 255, 0.6);
    animation: fall 1.5s infinite linear;
    opacity: 0.7;
  }

  @keyframes fall {
    to {
      transform: translateY(100vh);
    }
  }

  /* 비 방울의 위치, 속도, 크기를 좀 더 골고루 분포 */
  .drop:nth-child(n) {
    left: ${() => Math.random() * 100}vw; /* 화면 너비 전체에 골고루 배치 */
    animation-duration: ${() => 1 + Math.random() * 2}s; /* 1초에서 3초 사이로 랜덤한 속도 */
    animation-delay: ${() => Math.random() * 2}s; /* 비가 끊기지 않고 지속적으로 내리도록 딜레이 추가 */
    opacity: ${() => 0.3 + Math.random() * 0.7}; /* 더 다양한 투명도 */
    height: ${() => 40 + Math.random() * 30}px; /* 비 방울의 길이 다양화 */
  }
`;
export default function CommonUI({ setLong, detailData, flowerSrc}) {
  const [completedCount, setCompletedCount] = useState(0);
  const [cloudImage, setCloudImage] = useState('/cloud/cloud1.png'); // 처음 0/8 구름
  const [showMenu, setShowMenu] = useState(false); // 메뉴 모달 상태
  const [confirm, setConfirm] = useState(true);
  const location = useLocation(); // 현재 경로 확인
  const [isDisabled, setIsDisabled] = useState(false); // 할일 생성/수정 비활성화 상태
  const handleConfirm = () => {
    setIsDisabled(true); // 확인 버튼 클릭 시 생성/수정 비활성화
    setConfirm(false); // 모달 닫기
  };

  useEffect(() => {
    if (location.pathname === '/main') {
      setCloudImage('/cloud/cloud8.png'); // 모든 목표 완료된 이미지
    } else if (detailData && detailData.information.length > 0) {
      const total = detailData.information.length;
      const completed = detailData.information.filter(detail => detail.goalStatus).length;
      setCompletedCount(completed / total * 100);
      const completionRatio = completed / total;
      const stage = Math.round(completionRatio * 8); // 0에서 8까지 단계로 나눔

      if (stage === 8) {
        setCloudImage(`/cloud/cloud8.png`);
      } else {
        setCloudImage(`/cloud/cloud${stage + 1}.png`);
      }
    }
  }, [location.pathname, detailData]);
  localStorage.setItem('isDisabled', isDisabled);
  const onClickConfirm = async () => {
    setConfirm(false);
    handleConfirm();
    try {
      const response = await axios.post(`http://3.36.171.123/api/v1/steam/${localStorage.getItem('bigGoalId')}`);
    } catch (error) {
      console.error("수증기 생성 오류가 발생했습니다.", error);
    }
    setCloudImage(flowerSrc);
  }
  return (
    <Wrapper>
      {/* 햄버거 아이콘 */}
      <HamburgerIcon onClick={() => setShowMenu(true)} />

      <MenuModal show={showMenu} onHide={() => setShowMenu(false)} style={{ width: "200px", height: "70vh" }}>
        <Modal.Header closeButton>
          <Modal.Title>MENU</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "50vh" }}>
          <Nav style={{ display: "flex", flexDirection: "column" }}>
            <Nav.Link href="/main" style={{ color: "black" }}>홈</Nav.Link>
            <Nav.Link href="/flower" style={{ color: "black" }}>꽃 도감</Nav.Link>
            <Nav.Link href="/calendar" style={{ color: "black" }}>캘린더</Nav.Link>
          </Nav>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <CloseButton onClick={() => setShowMenu(false)}>닫기</CloseButton>
        </Modal.Footer>
      </MenuModal>

      <Background setLong={setLong}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
          <CloudImage src={cloudImage} alt="Progress Cloud" />
          {location.pathname === "/detail" && (
            <div style={{ textAlign: "center", fontSize: "32px", color: "white", fontWeight: "500" }}>
              {completedCount}%
            </div>
          )}

          {/* completedCount가 100일 때 비 애니메이션 렌더링 */}
          {completedCount === 100 && (
            <>                        <>                        <RainAnimation>
              {Array.from({ length: 100 }, (_, i) => (
                <div key={i} className="drop" />
              ))}
              {/* 비오는 애니메이션 */}
            </RainAnimation>
              <RainAnimation>
                {Array.from({ length: 100 }, (_, i) => (
                  <div key={i} className="drop" />
                ))}
              </RainAnimation>
              <RainAnimation>
                {Array.from({ length: 100 }, (_, i) => (
                  <div key={i} className="drop" />
                ))}
              </RainAnimation>
              <RainAnimation>
                {Array.from({ length: 100 }, (_, i) => (
                  <div key={i} className="drop" />

                ))}
              </RainAnimation>
            </>
              <MenuModal show={confirm} onHide={() => setConfirm(false)} style={{ width: "100vw", height: "50vh" }}>
                <Modal.Title style={{ fontSize: "18px" }}>오늘의 수증기를 획득할까요?<br></br>(수증기를 획득하고 나면 더이상 오늘의 목표를 등록할 수 없어요.)<br /> </Modal.Title>
                <Modal.Footer style={{ justifyContent: "center" }}>
                  <CloseButton style={{ width: "200px" }} onClick={onClickConfirm}>획득할래요</CloseButton>
                  <CloseButton style={{ width: "200px" }} onClick={() => setConfirm(false)}>나중에 획득할래요</CloseButton>
                </Modal.Footer>
              </MenuModal>
            </>

          )}
        </div>
      </Background>
    </Wrapper>
  );
}
