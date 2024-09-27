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

  // 날짜 클릭 시 선택
  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  // 달력 렌더링
  const renderDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    
    const days = [];

    // 빈 칸 채우기 (이전 달의 빈 칸)
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />);
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

    return days;
  };

  return (
    <div className="date-picker">
      <div className="header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <span>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</span>
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
