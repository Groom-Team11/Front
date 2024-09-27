// GoalPage.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Dropdown from "./Dropdown";
import "react-datepicker/dist/react-datepicker.css";
import cloudImg from './cloud.png';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import "./GoalPage.css";
import GoalSection from "./GoalHeader";



const GoalPage = () => {
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("장기목표");
  const [view, setView] = useState(false); 

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
            className="cloud-image"
          />
        </header>
      </div>

      {/* 하얀색 배경 영역 */}
      <div className="white-background">
        <div className="goal-section">
        <GoalSection/>
          <input
            type="text"
            placeholder="이루고자하는 목표를 입력하세요"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="goal-input"
          />
        </div>

        <div className="date-section">
          <h3>목표 달성 기간</h3>
          <DatePicker
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            placeholderText="기간을 설정해주세요"
            className="date-picker"
            dateFormat="MMMM d, yyyy"
          />
        </div>
      </div>
    </div>
  );
};

export default GoalPage;
