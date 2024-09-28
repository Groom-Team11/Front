// GoalPage.js
import React, { useState } from "react";
import cloudImg from '../GoalPage/img/cloud1.png';
import CustomCalendar from "./CustomCalendar";
import "./index.css";



const CalendarPage = () => {

    const [value, onChange] = useState(new Date());

  return (
    <div className="goal-page-container">
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

      <div className="white-background">
        <CustomCalendar/>
      </div>
    </div>
  );
};

export default CalendarPage;
