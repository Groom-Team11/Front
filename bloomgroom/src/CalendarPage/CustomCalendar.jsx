import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일
import "./CustomCalendar.css"

function CustomCalendar() {
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

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        formatMonthYear={(locale, date) => formatMonthYear(date)}
        formatShortWeekday={(locale, date) => formatShortWeekday(date)}
        calendarType={"hebrew"}
      />
    </div>
  );
}

export default CustomCalendar;
