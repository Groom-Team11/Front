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
import PeriodSection from "./GoalPeriod";



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
        <GoalSection/>
        <PeriodSection/>
      </div>
    </div>
  );
};

export default GoalPage;
