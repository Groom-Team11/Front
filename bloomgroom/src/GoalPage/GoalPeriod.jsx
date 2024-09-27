import React, { useState } from "react";
import "./GoalPeriod.css"; // GoalHeader용 CSS
import "react-datepicker/dist/react-datepicker.css"; // 데이트 피커 기본 스타일
import DatePicker from "./DatePicker";

import { MdCalendarToday } from "react-icons/md";


function PeriodInput({period, setPeriod, onInputClick}){
    return(
        <div className="input-container">
          <input
            type="text"
            placeholder="기간을 설정해주세요"
            value={period ? period.toLocaleDateString() : ""}
            onClick={onInputClick}
            className="period-input"            
            readOnly
          />
          <MdCalendarToday className="calendar-icon"/> {/* 아이콘 클릭 시 데이트 피커 열림 */}
        </div>
    )
}

// 전체 컴포넌트
function PeriodSection() {
  const [period, setPeriod] = useState();
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleDateChange = (date) => {
    setPeriod(date);
    setOpenDatePicker(false); // 날짜 선택 후 데이트 피커 닫기
  };

  const toggleDatePicker = () => {
    setOpenDatePicker(!openDatePicker);
  };


  return (
    <div className="period-section">
        <div className="period-header">
          <span className="period-title">목표 달성 기간</span>
        </div>
        <PeriodInput
        period={period}
        setPeriod={setPeriod}
        onInputClick={toggleDatePicker} // 입력란이나 아이콘 클릭 시 데이트 피커 열기
      />
      {openDatePicker && (
        <DatePicker
          selected={period}
          onChange={handleDateChange}
          inline
        />
      )}  
    </div>
  );
}

export default PeriodSection;