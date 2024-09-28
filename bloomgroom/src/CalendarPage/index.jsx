// GoalPage.js
import React, { useState } from "react";
import cloudImg from '../GoalPage/img/cloud5.png';
import CustomCalendar from "./CustomCalendar";
import "./index.css";



const CalendarPage = () => {

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
