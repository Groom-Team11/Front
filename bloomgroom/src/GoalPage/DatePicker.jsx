import React, { useState } from "react";
import "./DatePicker.css"; // CSS 파일 적용

function DatePicker() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // 날짜 선택 시 selectedDate에 저장
  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  // 날짜가 선택된 범위 내에 있는지 확인하는 함수
  const isInRange = (day) => {
    const selectedDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return selectedDate && selectedDay.getDate() === selectedDate.getDate();
  };

  // 달력 렌더링
  // 달력 렌더링
const renderDays = () => {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();  // 현재 달의 마지막 날짜
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();  // 현재 달의 1일이 시작하는 요일
  const previousMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // 이전 달의 마지막 날짜
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay(); // 현재 달의 마지막 날 요일

  const days = [];

  // 빈 칸 채우기 (이전 달의 빈 칸, 월요일부터 시작하는 경우에만 추가)
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push(
      <div key={`prev-${i}`} className="day-prev-month">
        {previousMonthDays - i}
      </div>
    );
  }

  // 현재 월의 일자 렌더링
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
    const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth();
    
    days.push(
      <div
        key={day}
        className={`day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
        onClick={() => handleDateClick(day)}
      >
        {day}
        {isToday && <div className="today-marker" />}
      </div>
    );
  }

  // 빈 칸 채우기 -> 토요일까지 채움
  console.log(lastDayOfMonth);
  const remainingDays = 6 - lastDayOfMonth;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(
      <div key={`next-${i}`} className="day-next-month">
        {i}
      </div>
    );
  }

  return days;
};


  return (
    <div className="date-picker">
      <div className="header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <span className="header-text">{currentDate.toLocaleString("en-US", { month: "long" })} {currentDate.getFullYear()}</span>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="days-of-week">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {renderDays()}
      </div>
    </div>
  );
}

export default DatePicker;
