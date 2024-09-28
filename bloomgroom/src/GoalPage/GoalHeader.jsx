import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Dropdown from "./PriorityDropdown"; // Dropdown 컴포넌트 임포트
import "./GoalHeader.css"; // GoalHeader용 CSS

// 장기 목표와 아이콘을 포함하는 Header 컴포넌트
function GoalHeader({ view, setView, priority}) {
    return (
      <div className="goal-header" onClick={() => setView(!view)}>
        <span className="goal-title">장기 목표</span>
        <span className="goal-icon">
          {view ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
        <span className="selected-menu">{priority}</span>
      </div>
    );
}

function GoalInput({content, setContent}){
    return(
        <input
            type="text"
            placeholder="이루고자하는 목표를 입력하세요"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
            className="goal-input"
        />
    )
}

// 전체 컴포넌트
function GoalSection({view, setView, content, setContent, priority, setPriority}) {
  
  

  return (
    <div className="goal-section">
      <GoalHeader view={view} setView={setView}  priority={priority}/>
      {view && <Dropdown view={view} setView={setView} priority={priority} setPriority={setPriority}/>}  
      <GoalInput  content={content} setContent={setContent}/>    
    </div>
  );
}

export default GoalSection;