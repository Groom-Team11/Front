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
          <MdCalendarToday className="calendar-icon" onClick={onInputClick}/>
        </div>
    )
}

// 전체 컴포넌트
function PeriodSection({period, setPeriod, startDate, endDate, setStartDate, setEndDate}) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggleDatePicker = () => {
    if (isDatePickerOpen) {
      // DatePicker 닫기 애니메이션 시작
      setClosing(true);
      setTimeout(() => {
        setIsDatePickerOpen(false);
        setClosing(false);
      }, 400); // 트랜지션 시간 (0.3초)과 일치
    } else {
      setIsDatePickerOpen(true);
    }
  };

  // DatePicker를 닫는 함수
  const closeDatePicker = () => {
    setClosing(true);
    setTimeout(() => {
      setIsDatePickerOpen(false);
      setClosing(false);
    }, 400); // 트랜지션 시간과 일치
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
          setStartDate={setStartDate} 
          setEndDate={setEndDate} 
          startDate={startDate} 
          endDate={endDate}
        />
      )}      
    </div>
  );
}

export default PeriodSection;