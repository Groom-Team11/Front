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
            value={period ? period : ""}
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
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen); // 열고 닫기 상태 토글
  };

  // DatePicker를 닫는 함수
  const closeDatePicker = () => {
    setIsDatePickerOpen(false); // DatePicker 닫기
  };


  return (
    <div className="period-section">
        <div className="period-header">
          <span className="period-title">목표 달성 기간</span>
        </div>
        <PeriodInput
        period={period}
        setPeriod={setPeriod}
        onInputClick={toggleDatePicker}
        readOnly
      />
      {isDatePickerOpen && (
        <DatePicker
          period={period}
          setPeriod={setPeriod} // 기간을 업데이트하는 함수 전달
          closeDatePicker={closeDatePicker} // DatePicker를 닫는 함수 전달
        />
      )}      
    </div>
  );
}

export default PeriodSection;