import React, { useState } from "react";
import { Badge, Select, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { companyOptions } from "./HeaderData";
import "./Header.scss";
import {
  SettingIcon,
  NotificationIcon,
  CalendarIcon,
  TimerIcon,
} from "./subcomponents";
import { ReactComponent as LogOutIcon } from "./subcomponents/logouticon.svg";
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "./subcomponents/SearchModal/SearchModal";
const { Option } = Select;

const Header = ({ props }) => {
  let { companyLogos = [] } = props;
  const [searchModal, setSearchModal] = useState(false);

  return (
    <div className="title-header-comp">
      <div className="left-title-header-comp"></div>
      <div className="right-title-header-comp">
        <div className="companyComponent">
          <Select
            labelInValue
            value={{ value: "Core Scaffold Systems Inc" }}
            dropdownStyle={{
              borderRadius: 8,
              padding: 0,
              maxWidth: 300,
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            {companyOptions({ companyLogos }).map((el, key) => {
              return (
                <Option
                  key={key}
                  style={{
                    display:
                      el.value === "Core Scaffold Systems Inc"
                        ? "none"
                        : "block",
                  }}
                  className="companyOptionStyle"
                  value={el.value}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 300,
                      height: 30,
                      alignItems: "center",
                      backgroundColor: el.color,
                      borderRadius: 12,
                    }}
                  >
                    <img alt="" className="dropdownLogo" src={el.src} />

                    <div style={{ marginLeft: 10 }}>
                      <span style={{ color: "white" }}>{el.value}</span>
                    </div>
                  </div>
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="search-Div">
          <AutoComplete
            className="search-comp"
            dropdownClassName="search-dropDown"
            placeholder="Search for Projects, tasks etc..."
          />
          <SearchOutlined className="SearchLogoIcon" />
        </div>
        <div className="searchButton">
          <SearchModal modal={searchModal} />
        </div>
        <span className="timerIconStyle">
          <Badge count={6} overflowCount={10}>
            <TimerIcon style={{ cursor: "pointer" }} />
          </Badge>
        </span>
        <div className="calendarStyle">
          <Badge className="ignore-onclickoutside" count={4}>
            <span className="calendarIconStyle">
              <CalendarIcon />
            </span>
          </Badge>
        </div>
        <div className="notificationStyle">
          <Badge className="ignore-onclickoutside" count={4}>
            <span className="notifcationIconStyle">
              <NotificationIcon />
            </span>
          </Badge>
        </div>
        <span className="settingsStyle">
          <SettingIcon />
        </span>
        <div className="userLatterContainer">
          <span className="userLetter">E</span>
        </div>
        <span className="logOutStyle">
          <LogOutIcon />
        </span>
      </div>
    </div>
  );
};
export default Header;
