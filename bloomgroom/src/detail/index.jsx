import { useLocation } from 'react-router-dom';
import { Wrapper, Body } from '../main/index';
import CommonUI from '../common';
import styled from "@emotion/styled"
import axios from 'axios';
import { useState, useEffect } from 'react';
const BigGoal = styled.div`
    font-size: 24px;
    color: #3A3B48;
    font-weight: 700;
`

const Deadline = styled.div`
    font-size: 15px;
    color:#3A3B48;
    font-weight: 500;
`

const TimerWrapper = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    border: 0.2px solid black;
    border-radius: 20px;
    width: 100%;
    height: 70px;
    margin-top: 10px;
`

const Timer = styled.div`
    font-size: 24px;
    color: #8E8E8E;
    font-weight: 700;
`

const DetailGoal = styled.div`
    font-size: 18px;
    font-weight: 600;
    padding: 10px 20px;;
`

const DetailWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.2px solid #474849;
`

const DetailItem = styled.div`
    font-size: 15px;
    color: #8E8E8E;
    font-weight: 400;
    text-decoration: ${props => (props.completed ? 'line-through' : 'none')}; /* goalStatus에 따라 취소선 적용 */
`;
const AddDetail = styled.input`
    font-size: 15px;
    color: #8E8E8E;
    font-weight: 400;
    border: none;
`;

const Checkbox = styled.input`
    width: 20px;
    height: 20px;
    border: 0.2px solid #474849;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.2s, border-color 0.2s;

    &:checked {
        background-color: #BBD3E8;
        border-color: #474849;
    }

    &:checked::after {
        content: '✔'; /* 체크 표시 */
        color: white; /* 체크 표시 색 */
        font-size: 15px;
        position: absolute;
        top: 0;
        left: 4px; /* 적절한 위치 조정 */
    }
`;
export default function DetailPage() {
    const location = useLocation();
    const { detailData, bigGoalId, bigGoalData} = location.state || {};
    
    // 이전 코드에서 이 부분을 수정합니다.
const formattedDate = detailData && detailData.information && detailData.information[0]
? new Date(bigGoalData.information[0].endDate).toISOString().split('T')[0].replace(/-/g, '.')
: "";

const endDate = bigGoalData?.information?.[0]?.endDate; // endDate 가져오기
const endDateTime = endDate ? new Date(endDate).getTime() : NaN; // 유효하지 않은 경우 NaN으로 설정

if (isNaN(endDateTime)) {
    console.error("Invalid endDate:", endDate); // 잘못된 endDate 출력
}

    const [addDetail, setAddDetail] = useState("");  // 세부 목표 내용
    const onClickSubmit = async () => {
      try {
        const bigGoalId = localStorage.getItem('bigGoalId');  // bigGoalId 가져오기
        const smallGoalId = localStorage.getItem('smallGoalId');
        const response = await axios.post(
          `http://3.36.171.123/api/v1/small-goal/${bigGoalId}`,  // API 주소
          {
            content: addDetail,  // 입력된 세부 목표 내용
            goalStatus: false,  // 목표 상태 (false)
          },
          {
            headers: {
              Authorization: `${localStorage.getItem('jwtToken')}`,  // Bearer Token 추가
              'Content-Type': 'application/json',  // Content-Type 설정
            },
          }
        );
  
        console.log('Post 요청 성공:', response.data);
      } catch (error) {
        console.error('Post 요청 실패:', error);
      }
    };
  
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDateTime - now;

            if (distance < 0) {
                clearInterval(intervalId);
                setTimeLeft("Deadline reached");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${days}days ${hours}:${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
    }, [endDateTime]);
    const [checkedStates, setCheckedStates] = useState(
        detailData ? detailData.information.map(detail => detail.goalStatus) : []
    );

    const handleCheckboxChange = (index) => {
        const newCheckedStates = [...checkedStates];
        newCheckedStates[index] = !newCheckedStates[index];
        setCheckedStates(newCheckedStates);
        // API 호출하여 업데이트할 수 있습니다.
    };
    const isDisabled = localStorage.getItem('isDisabled');
    console.log(detailData)
    return (
        <Wrapper>
            <CommonUI setLong={true} detailData={detailData}></CommonUI>
            <Body>
                {detailData?.information && detailData.information.length > 0 ? (
                    <>
                        {/* 큰 목표 출력 */}
                        <BigGoal>{bigGoalData.information[0].content}</BigGoal>
                        <Deadline>달성일: {formattedDate}</Deadline>
                        <TimerWrapper>
                            <img src='/timer.png' />
                            <Timer>{timeLeft}</Timer>
                        </TimerWrapper>
                        <DetailGoal>세부목표</DetailGoal>
                        {/* 세부 목표 리스트 출력 */}
                        {detailData?.information.map((detail, index) => (
                            <DetailWrapper disabled={isDisabled} key={index}>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <Checkbox
                                        type="checkbox"
                                        checked={checkedStates[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <DetailItem completed={checkedStates[index]}>
                                        {detail.content}
                                    </DetailItem>
                                </div>
                                <div style={{ fontSize: "24px", fontWeight: "800", color: "#8E8E8E" }}>-</div>
                            </DetailWrapper>
                        ))}
                    </>
                ) : (
                    <div style={{display:"flex", alignItems:"center", gap:"20px", borderBottom: "0.2px solid #474849", padding:"20px 0px 10px 0px"}}>
                    <div style={{fontSize:"18px"}} onClick={onClickSubmit}>+</div>
                    <AddDetail placeholder="세부목표를 입력해주세요."></AddDetail>
                </div>
                )}
            </Body>
        </Wrapper>
    );
}