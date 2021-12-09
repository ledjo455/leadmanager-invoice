import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router";
import { jsxNamespacedName } from "@babel/types";

const PagesMenu = ({ pages = [] }) => {
  const navigate = useNavigate();

  const handleNav = (page, statePassed) => {
    navigate(page, { state: statePassed });
  };

  return (
    <div className="menu">
      <Menu
        className="Menu2"
        defaultSelectedKeys={["5"]}
        style={{
          marginTop: 50,
          backgroundColor: "transparent",
        }}
        mode="vertical"
      >
        {pages?.map((el, key) => {
          let Icon = el?.src;
          return (
            <Menu.Item key={key}>
              <div className="pageContainer">
                <span
                  className="pageIconContainer"
                  onClick={() => handleNav(el.to, el.title)}
                >
                  {Icon && <Icon className="pageIcon" />}
                </span>
                <span
                  className="icon_label"
                  onClick={() => handleNav(el.to, el.title)}
                  style={{
                    color: "white",
                    fontSize: 17,
                    marginTop: 2,
                    paddingLeft: 10,
                  }}
                >
                  {el?.title}
                </span>
              </div>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default PagesMenu;
