import CommonUI from "../common";
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled"
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100vh; /* 앱 크기 기준 */
  width: 100%;
  height: 100vh
  padding: 10px;
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 40px;
`
const MyGoorm = styled.div`
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 20%;
    background-color: #BBD3E8;
    padding: 10px 20px;
    border-radius: 100px;
`

const ItemName = styled.div`
    color: #474849;
    font-weight: 700;
    font-size: 18px;
`
const Group = styled.div`
    display:flex;
    gap: 40px;
`
const ItemDate = styled.div`
    color:#474849;
    font-weight: 500;
    font-size: 12px;
`
const UpdateIcon = styled.img`
    width: 30px;
    height: auto
`

const RemoveIcon = styled.img`
    width: 30px;
    height: auto;
    margin-left: 5px;
`

const RaindropContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  position: relative; /* 이미지와 텍스트를 겹치기 위해 relative 필요 */
`;

const Raindrop = styled.img`
  width: 100%;
  height: auto;
  position: absolute; /* 이미지가 텍스트 뒤에 오도록 설정 */
`;

const RaindropText = styled.div`
  z-index: 1; /* 텍스트가 이미지 위에 오도록 설정 */
  color: ${props => (props.raindrop >= 70 ? 'white' : '#3A3B48')}; /* 글자색을 조건에 따라 변경 */
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin-top: 3px;
`;

const AddDetail = styled.button`
    border: 1px solid #A7A9B2;
    border-radius: 50px;
    background: #F6F6F7;
    height: 50px;
    font-size: 24px;
    transition: background 0.3s ease, border-color 0.3s ease; /* 부드러운 전환 효과 추가 */
    &:hover {
        background: #E0E0E0; /* hover 시 배경 색 */
        border-color: #8C8C99; /* hover 시 테두리 색 */
        transition
    }
    &:active {
        background: #D1D1D1; /* 클릭 시 배경 색 */
        border-color: #6F6F7A; /* 클릭 시 테두리 색 */
    }
`
export default function MainPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/setgoal'); // '/detail' 페이지로 이동
    };
    //raindrop이 70퍼 이상이면 1순위, 50퍼이상이면 2순위, 그 이하는 3순위
    const raindrop = 70;
    let raindropImage = '';
    if (raindrop >= 70) {
        raindropImage = '/highlight1.png'; // 70 이상일 때
    } else if (raindrop >= 50) {
        raindropImage = '/highlight2.png'; // 50 이상 70 미만일 때
    } else {
        raindropImage = '/highlight3.png'; // 50 미만일 때
    }
    //임시 더미데이터
    const data = [
        { itemName: "ADSP 자격증 따기", itemDate: "2024.09.27", raindrop: 70 },
        { itemName: "토익 900넘기기", itemDate: "2024.09.27", raindrop: 60 },
        { itemName: "한달동안 꾸준히 운동하기", itemDate: "2024.09.27", raindrop: 45 },
        { itemName: "자소서 완성하기", itemDate: "2024.09.27", raindrop: 80 }
    ];
    return (
        <Wrapper>
            <CommonUI />
            <Body>
                <MyGoorm>MY 구름</MyGoorm>
                {data.map((item, index) => {
                    let raindropImage = '';
                    if (item.raindrop >= 70) {
                        raindropImage = '/highlight1.png'; // 70 이상일 때
                    } else if (item.raindrop >= 50) {
                        raindropImage = '/highlight2.png'; // 50 이상 70 미만일 때
                    } else {
                        raindropImage = '/highlight3.png'; // 50 미만일 때
                    }

                    return (
                        <div key={index} style={{ display: "flex", width: "100%", alignItems: "center", marginBottom: "10px" }}>
                            <ListContainer>
                                <ItemName>{item.itemName}</ItemName>
                                <Group>
                                    <ItemDate>달성일: {item.itemDate}</ItemDate>
                                    <div style={{ gap: "5px" }}>
                                        <UpdateIcon src="/updateIcon.png" />
                                        <RemoveIcon src="/deleteIcon.png" />
                                    </div>
                                </Group>
                            </ListContainer>
                            <RaindropContainer>
                                <Raindrop src={raindropImage} />
                                <RaindropText raindrop={item.raindrop}>{item.raindrop}%</RaindropText>
                            </RaindropContainer>
                        </div>
                    );
                })}
                <AddDetail onClick={handleClick}>+</AddDetail>
            </Body>
        </Wrapper>
    );
}