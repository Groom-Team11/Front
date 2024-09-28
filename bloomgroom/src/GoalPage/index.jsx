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
  const [goal, setGoal] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("장기목표");
  const [view, setView] = useState(false); 
  const [period, setPeriod] = useState(""); // period 상태를 상위 컴포넌트에서 관리
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // DatePicker 열림 여부
  let [selectedMenu, setSelectedMenu] = useState('');

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
        <GoalSection view={view} setView={setView} goal={goal} setGoal={setGoal} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
        <PeriodSection period={period} setPeriod={setPeriod}/>
        {period && goal && selectedMenu && (
          <button 
            className="submit-btn" 
            onClick={() => console.log({ goal, period, selectedMenu })}
          >
            설정 완료
          </button>
        )}
      </div>
    </div>
  );
};

export default GoalPage;
