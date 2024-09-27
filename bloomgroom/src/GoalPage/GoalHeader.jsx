import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Dropdown from "./Dropdown"; // Dropdown 컴포넌트 임포트
import "./GoalHeader.css"; // GoalHeader용 CSS

// 장기 목표와 아이콘을 포함하는 Header 컴포넌트
function GoalHeader({ view, setView }) {
    return (
      <div className="goal-header" onClick={() => setView(!view)}>
        <span className="goal-title">장기 목표</span>
        <span className="goal-icon">
          {view ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>
    );
}

// 전체 컴포넌트
function GoalSection() {
  const [view, setView] = useState(false);

  return (
    <div className="goal-section">
      <GoalHeader view={view} setView={setView} />
      {view && <Dropdown />}      
    </div>
  );
}

export default GoalSection;