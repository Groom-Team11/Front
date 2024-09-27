import React, { useState } from "react";
import "./GoalPeriod.css"; // GoalHeader용 CSS


function PeriodInput({period, setPeriod}){
    return(
        <input
            type="text"
            placeholder="기간을 설정해주세요"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="period-input"
          />
    )
}

// 전체 컴포넌트
function PeriodSection() {
  const [period, setPeriod] = useState(null);

  return (
    <div className="period-section">
        <div className="period-header">
          <span className="period-title">목표 달성 기간</span>
        </div>
        <PeriodInput  period={period} setPeriod={setPeriod} />    
    </div>
  );
}

export default PeriodSection;