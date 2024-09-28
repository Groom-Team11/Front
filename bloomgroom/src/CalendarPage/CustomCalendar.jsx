import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일
import "./CustomCalendar.css"
import waterDrop from './highlight2.png'



function CustomCalendar({ startDate, endDate, eventDates }) {
  const [value, setValue] = useState(new Date());

  const onChange = (date) => {
    setValue(date);
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  const formatShortWeekday = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "narrow" });
  }

  const formatDay = (locale, date) => {
    return date.getDate(); // 숫자만 반환 (1, 2, 3 ...)
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (date.toDateString() === startDate.toDateString()) {
        return "start-date"; // 시작 날짜에 파란색 클래스
      }
      if (date.toDateString() === endDate.toDateString()) {
        return "end-date"; // 종료 날짜에 보라색 클래스
      }
    }
    return null; // 그 외 날짜는 클래스 부여 안함
  };

  // 날짜 타일에 커스텀 콘텐츠(아이콘 등) 추가하는 함수
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      // 시작 날짜에 파란색 원 추가
      if (date.toDateString() === startDate.toDateString()) {
        return <div className="circle blue-circle"></div>; // 파란색 원 추가
      }
  
      // 종료 날짜에 보라색 원 추가
      if (date.toDateString() === endDate.toDateString()) {
        return <div className="circle purple-circle"></div>; // 보라색 원 추가
      }
  
      // 이벤트 날짜에 물방울 아이콘 추가
      if (eventDates.some(eventDate => eventDate.toDateString() === date.toDateString())) {
        return <span ><img src={waterDrop} alt="Water Drop" className="icon" /></span>;
      }
    }
    
    return null; // 기본값: 아무것도 표시하지 않음
  };



  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={tileClassName} // 날짜에 클래스 적용
        tileContent={tileContent} // 날짜에 아이콘 등 추가
        formatMonthYear={(locale, date) => formatMonthYear(date)}
        formatShortWeekday={(locale, date) => formatShortWeekday(date)}
        formatDay={formatDay}
      />
    </div>
  );
}

export default CustomCalendar;
