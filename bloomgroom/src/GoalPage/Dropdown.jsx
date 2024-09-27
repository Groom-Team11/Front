import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CSSTransition } from "react-transition-group"; // CSSTransition 컴포넌트 임포트
import "./Dropdown.css";

function Dropdown() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  // 메뉴의 높이를 계산
  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  // DropdownItem 컴포넌트: 메뉴 항목 클릭 시 상태 변경
  function DropdownItem(props) {
    return (
      <div
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </div>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      {/* 첫 번째 메뉴 */}
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        onEnter={calcHeight}
        classNames="menu-primary"
      >
        <div className="menu">
          <DropdownItem goToMenu="setting">Go to Secondary</DropdownItem>
          <DropdownItem>My Settings</DropdownItem>
        </div>
      </CSSTransition>

      {/* 두 번째 메뉴 */}
      <CSSTransition
        in={activeMenu === "setting"}
        unmountOnExit
        timeout={500}
        onEnter={calcHeight}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem goToMenu="main">Back to Main</DropdownItem>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem>Option 3</DropdownItem>
          <DropdownItem>Option 4</DropdownItem>
          <DropdownItem>Option 5</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Dropdown;
