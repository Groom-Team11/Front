// GoalPage.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import PriorityDropdown from "./PriorityDropdown";
import "react-datepicker/dist/react-datepicker.css";
import cloudImg from './img/cloud1.png';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import "./index.css";
import GoalSection from "./GoalHeader";
import PeriodSection from "./GoalPeriod";



const GoalPage = () => {

  //목표
  const [content, setContent] = useState(null);
  //우선순위
  let [priority, setPriority] = useState('');
  //목표 기한
  const [date, setDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("장기목표");
  const [view, setView] = useState(false); 
  const [period, setPeriod] = useState(""); // period 상태를 상위 컴포넌트에서 관리
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // DatePicker 열림 여부

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  // DatePicker 열기/닫기 함수
  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="goal-page-container">
      {/* 파란색 배경 영역 */}
      <div className="blue-background">
        <header className="goal-page-header">
          <img 
            src={cloudImg}
            alt="Cloud"
            style={{paddingTop: "50px", paddingBottom: "70px"}}
            className="cloud-image"
          />
        </header>
      </div>

      {/* 하얀색 배경 영역 */}
      <div className="white-background">
        <GoalSection view={view} setView={setView} content={content} setContent={setContent} priority={priority} setPriority={setPriority}/>
        <PeriodSection period={period} setPeriod={setPeriod} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}/>
        {period && content && priority && (
          <button 
            className="submit-btn" 
            onClick={() => console.log({ content, period, priority, startDate, endDate })}
          >
            설정 완료
          </button>
        )}
      </div>
    </div>
  );
};

export default GoalPage;
