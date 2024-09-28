import React, { useState, useEffect } from "react";
import "./DatePicker.css"; // CSS 파일 적용

function DatePicker({ period, setPeriod, closeDatePicker, startDate, setStartDate, setEndDate, endDate }) { // closeDatePicker 추가
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  // 날짜 선택 후 period 업데이트 및 DatePicker 닫기
  useEffect(() => {
    if (startDate && endDate) {
      setPeriod(`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
    
      closeDatePicker(); // DatePicker 닫기
    }
  }, [startDate, endDate, setPeriod, closeDatePicker]);

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // 날짜 선택 시 startDate 또는 endDate에 저장
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate); // 시작 날짜 설정
      setEndDate(null); // 종료 날짜 초기화
    } else if (clickedDate >= startDate) {
      setEndDate(clickedDate); // 종료 날짜 설정
    } else {
      setStartDate(clickedDate); // 종료 날짜가 시작 날짜보다 이전일 경우 다시 시작 날짜 설정
      setEndDate(null);
    }
  };

  // 날짜가 선택된 범위 내에 있는지 확인하는 함수
  const isInRange = (day) => {
    const selectedDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return startDate && endDate && selectedDay >= startDate && selectedDay <= endDate;
  };

  // 달력 렌더링
  const renderDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const previousMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();
    
    const days = [];

    // 빈 칸 채우기 (이전 달의 빈 칸)
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="day prev-month">
          {previousMonthDays - i}
        </div>
      );
    }

    // 현재 월의 일자 렌더링
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
      const isSelected = startDate && endDate && isInRange(day);
      const isStart = startDate && startDate.getDate() === day && startDate.getMonth() === currentDate.getMonth();
      const isEnd = endDate && endDate.getDate() === day && endDate.getMonth() === currentDate.getMonth();
      
      days.push(
        <div
          key={day}
          className={`day ${[
            isToday ? "today" : "",
            isStart ? "start" : "",
            isEnd ? "end" : "",
            isSelected ? "in-range" : ""
          ].filter(Boolean).join(" ")}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
          {isToday && <div className="today-marker" />}
        </div>
      );
    }

    // 빈 칸 채우기 (다음 달의 빈 칸을 토요일까지 채움)
    const remainingDays = 6 - lastDayOfMonth;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div key={`next-${i}`} className="day next-month">
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
