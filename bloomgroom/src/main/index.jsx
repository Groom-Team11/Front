import CommonUI from "../common";
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled"
import { useState, useEffect } from "react";
import axios from "axios";
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
        navigate('/detail', { state: { detailData, bigGoalId,bigGoalData } });
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
    const [bigGoalData, setBigGoalData] = useState([]);

    // useEffect를 사용하여 컴포넌트가 렌더링될 때 API 호출
    useEffect(() => {
        const fetchBigGoalData = async () => {
            try {
                // GET 요청 보내기
                const response = await axios.get('http://3.36.171.123/api/v1/big-goal/list', {
                    headers: {
                        Authorization: `${localStorage.getItem('jwtToken')}`,  // Bearer 토큰 헤더 추가
                    }
                });

                // 응답 데이터를 bigGoalData에 저장
                setBigGoalData(response.data);
                console.log(bigGoalData)
            } catch (error) {
                console.error('데이터 가져오기 실패', error);
            }
        };
        fetchBigGoalData(); // 함수 호출
    }, []); // 컴포넌트가 마운트될 때만 실행

    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                const response = await axios.get(`http://3.36.171.123/api/v1/small-goal/list/${localStorage.getItem('bigGoalId')}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,  // Bearer 추가
                    },
                });
                setDetailData(response.data); // 응답 데이터를 detailData에 저장
                console.log("Detail data fetched:", response.data);
            } catch (error) {
                console.error("Failed to fetch detail data:", error);
            }
        };
        fetchDetailData(); // 함수 호출
        console.log(detailData)
    }, [localStorage.getItem('bigGoalId')]); // 컴포넌트가 마운트될 때 한 번만 실행

    const formattedEndDate = (date) => {
        return new Date(date)
            .toISOString()
            .split('T')[0]
            .replace(/-/g, '.');
    }
    const onClickDelete = async (bigGoalId) => {
        try {
            // DELETE 요청 보내기
            await axios.delete(`http://3.36.171.123/api/v1/big-goal/${bigGoalId}`, {
                headers: {
                    Authorization: `${localStorage.getItem('jwtToken')}`,  // Bearer 토큰 헤더 추가
                }
            });
            // 삭제 후 페이지 새로고침
            window.location.reload();
        } catch (error) {
            console.error('삭제 실패', error);
        }
    };
    const onClickUpdate = () => {

    };

    return (
        <Wrapper>
            <CommonUI />
            <Body>
                <MyGoorm>MY 구름</MyGoorm>
                {bigGoalData?.information && Array.isArray(bigGoalData.information) && bigGoalData.information.length > 0 ? (
                    bigGoalData.information.map((item, index) => {
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
                                <ListContainer>
                                    <ItemName onClick={() => handleNavigate(item.bigGoalId)}>{item?.content}</ItemName>
                                    <Group>
                                        <ItemDate>달성일: {formattedEndDate(item?.endDate)}</ItemDate>
                                        <div style={{ gap: "5px" }}>
                                            <UpdateIcon src="/updateIcon.png" />
                                            <RemoveIcon src="/deleteIcon.png" onClick={() => onClickDelete(item.bigGoalId)} />
                                        </div>
                                    </Group>
                                </ListContainer>
                                <RaindropContainer>
                                    <Raindrop src={raindropImage} />
                                    <RaindropText raindrop={item?.raindrop}>{item?.raindrop}</RaindropText>
                                </RaindropContainer>
                            </div>
                        );
                    })
                ) : (
                    <div>데이터가 없습니다</div> // 데이터를 불러오는 중일 때 보여줄 메시지
                )}
                <AddDetail onClick={handleClick}>+</AddDetail>
            </Body>
        </Wrapper>
    );
}