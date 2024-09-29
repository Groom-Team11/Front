// GoalPage.js
import React, { useState } from "react";
import cloudImg from '../GoalPage/img/cloud5.png';
import CustomCalendar from "./CustomCalendar";
import "./index.css";
import axios from "axios";

const CalendarPage = () => {
  const [data, setData] = useState(null);

  const handleGetRequest = async () => {
    try {
  
      // GET 요청 보내기 (쿼리 매개변수로 userId 포함)
      const response = await axios.get(`http://3.36.171.123/api/v1/steam/list/${localStorage.getItem('bigGoldId')}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        }
      });
  
      // 요청이 성공하면 데이터 저장 및 콘솔 출력
      setData(response.data);
      console.log('데이터 가져오기 성공:', response.data);
  
    } catch (error) {
      // 오류가 발생하면 오류 메시지를 출력
      console.error('GET 요청 에러:', error.response?.data || error.message);
    }
  };

  const getAchievementRequest = async () => {
    try {
  
      // GET 요청 보내기 (쿼리 매개변수로 userId 포함)
      const response = await axios.get(`http://3.36.171.123/api/v1/big-goal/list`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        }
      });
      console.log('데이터 가져오기 성공:', response.data);

      const informationArray = response.data.information;
      const filteredData = informationArray.filter(item => item.bigGoalId === localStorage.getItem('bigGoldId'));
      // 요청이 성공하면 데이터 저장 및 콘솔 출력
      setData(filteredData);
      setData(data['information'])
  
    } catch (error) {
      // 오류가 발생하면 오류 메시지를 출력
      console.error('GET 요청 에러:', error.response?.data || error.message);
    }
  };
  
  handleGetRequest();
  getAchievementRequest();
  console.log(data);

    const [value, onChange] = useState(new Date());
    const progress = '66%';

    const startDate = new Date(2024, 8, 3); // 2024년 9월 3일
    const endDate = new Date(2024, 8, 15); // 2024년 9월 15일
    
    const eventDates = [
        new Date(2024, 8, 5), // 2024년 9월 5일 (이벤트)
        new Date(2024, 8, 7), // 2024년 9월 7일 (이벤트)
        new Date(2024, 8, 12) // 2024년 9월 12일 (이벤트)
  ]; // 이벤트 날짜

  return (
    <div className="goal-page-container">
      <div className="blue-background">
          <img 
            src={cloudImg}
            alt="Cloud"
            className="cloud-image"
          />
          <span className='progress'>{progress}</span>
      </div>

      <div className="white-background">
        <CustomCalendar startDate={startDate} endDate={endDate} eventDates={eventDates}/>
        <span className='bottomText'>수증기를 놓치지 마세요</span>
      </div>
    </div>
  );
};

export default CalendarPage;
