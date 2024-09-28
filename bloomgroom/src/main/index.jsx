import CommonUI from "../common";
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled"
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100vh; /* 앱 크기 기준 */
  width: 100vw;
  height: 100vh
  padding: 10px;
`;

export const Body = styled.div`
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
    const handleNavigate = (bigGoalId) => {
        navigate('/detail', { state: { detailData, bigGoalId } });
        localStorage.setItem('bigGoalId', bigGoalId)
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

    /* 상세 목표 페이지 조회 API*/
    // const handleNavigate = async (bigGoalId) => {
    //     try {
    //         const response = await axios.get(`/api/v1/small-goal/list/${bigGoalId}`);
    //         const detailData = response.data;

    //         // Navigate to /detail and pass itemName and detailData
    //         navigate('/detail', {
    //             state: {
    //                 detailData: detailData
    //             }
    //         });
    //     } catch (error) {
    //         console.error("Failed to fetch data:", error);
    //     }
    // };

    //임시 더미데이터(장기목표)
    const bigGoalData = {
        "information": [
            {
                "bigGoalId": 1,
                "user": {
                    "userId": 1,
                    "email": "inha0319@naver.com"
                },
                "startDate": "2024-09-27T13:00:00",
                "endDate": "2024-12-31T10:00:00",
                "priority": "매우중요",
                "content": "ADSP 따기",
                "goalStatus": false
            },
            {
                "bigGoalId": 3,
                "user": {
                    "userId": 1,
                    "email": "inha0319@naver.com"
                },
                "startDate": "2024-09-27T13:00:00",
                "endDate": "2024-12-31T10:00:00",
                "priority": "중요",
                "content": "오픽 시험보기",
                "goalStatus": false
            },
            {
                "bigGoalId": 2,
                "user": {
                    "userId": 1,
                    "email": "inha0319@naver.com"
                },
                "startDate": "2024-09-27T13:00:00",
                "endDate": "2024-12-31T10:00:00",
                "priority": "보통",
                "content": "정처기 따기",
                "goalStatus": false
            }
        ]
    }
    const detailData = {
        "information": [
            {
                "smallGoalId": 1,
                "bigGoal": {
                    "bigGoalId": 1,
                    "user": {
                        "userId": 1,
                        "email": "1"
                    },
                    "startDate": "2024-09-27T13:00:00",
                    "endDate": "2024-12-31T10:00:00",
                    "priority": "매우중요",
                    "content": "ADSP 시험보기",
                    "goalStatus": false
                },
                "content": "세부목표 내용",
                "goalStatus": true,
                "smallGoalDate": "2024-09-27T16:51:06.735541"
            },
            {
                "smallGoalId": 2,
                "bigGoal": {
                    "bigGoalId": 1,
                    "user": {
                        "userId": 1,
                        "email": "1"
                    },
                    "startDate": "2024-09-27T13:00:00",
                    "endDate": "2024-12-31T10:00:00",
                    "priority": "매우중요",
                    "content": "test",
                    "goalStatus": false
                },
                "content": "세부목표 내용2",
                "goalStatus": true,
                "smallGoalDate": "2024-09-27T16:51:17.086046"
            }
        ]
    }
    // 날짜 형식 변경
    const formattedEndDate = (date) => {
        return new Date(date)
            .toISOString()
            .split('T')[0]
            .replace(/-/g, '.');
    }
    return (
        <Wrapper>
            <CommonUI />
            <Body>
                <MyGoorm>MY 구름</MyGoorm>
                {bigGoalData.information.map((item, index) => {
                    let raindropImage = '';
                    if (item.priority === "매우중요") {
                        raindropImage = '/highlight1.png'; // 70 이상일 때
                    } else if (item.priority === "중요") {
                        raindropImage = '/highlight2.png'; // 50 이상 70 미만일 때
                    } else {
                        raindropImage = '/highlight3.png'; // 50 미만일 때
                    }

                    return (
                        <div key={index} style={{ display: "flex", width: "100%", alignItems: "center", marginBottom: "10px" }}>
                            <ListContainer onClick={() => handleNavigate(index + 1)}>
                                <ItemName>{item.content}</ItemName>
                                <Group>
                                    <ItemDate>달성일: {formattedEndDate(item.endDate)}</ItemDate>
                                    <div style={{ gap: "5px" }}>
                                        <UpdateIcon src="/updateIcon.png" />
                                        <RemoveIcon src="/deleteIcon.png" />
                                    </div>
                                </Group>
                            </ListContainer>
                            <RaindropContainer>
                                <Raindrop src={raindropImage} />
                                <RaindropText raindrop={item.raindrop}>{item.raindrop}</RaindropText>
                            </RaindropContainer>
                        </div>
                    );
                })}
                <AddDetail onClick={handleClick}>+</AddDetail>
            </Body>
        </Wrapper>
    );
}