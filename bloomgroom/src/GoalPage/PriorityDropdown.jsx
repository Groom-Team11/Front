import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import "./PriorityDropdown.css"; // CSS 파일도 이름에 맞게 변경

// checkMenu 함수에서 view와 selectedMenu를 업데이트
function checkMenu(props, setActiveMenu, setView, setSelectedMenu) {
  if (props.goToMenu) {
    setActiveMenu(props.goToMenu); // 메뉴 전환
    setView(false); // 드롭다운 닫기
    setSelectedMenu(props.goToMenu); // 선택된 메뉴 값 설정
  }
}

function PriorityDropdown({ view, setView, selectedMenu, setSelectedMenu }) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState();

  // 메뉴 높이를 계산해서 적용
  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  // Dropdown 항목 컴포넌트
  function PriorityItem(props) {
    return (
      <div
        className="priority-item"
        onClick={() => {
          checkMenu(props, setActiveMenu, setView, setSelectedMenu); // checkMenu에서 상태 변경
        }}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </div>
    );
  }

  return (
    <div className="priority-dropdown" style={{ height: menuHeight }}>
      {/* 메인 메뉴 */}
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        onEnter={calcHeight}
        classNames="menu-primary"
      >
        <div className="menu">
          <PriorityItem goToMenu="매우중요">매우 중요</PriorityItem>
          <PriorityItem goToMenu="중요">중요</PriorityItem>
          <PriorityItem goToMenu="보통">보통</PriorityItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default PriorityDropdown;
