import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { AppMockProps } from "../../AppMockProps";
import React, { useState, useRef, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "../Sidebars/Sidebar";
import styled from "styled-components";
import "./Page3.css";
import jsondata from "../../dataLayer/scheduleOfValues.json";
import { DynamicView } from "../SidebarPages/DynamicView";
// import Accounting from "../SidebarPages/Projects/Accounting/Accounting";
import Accounting from "./TabComponent";

const SidebarWrap = styled.div`
  display: flex;
  width: 250px;
  position: fixed;
  height: 100vh;
  top: 0;
`;
function Page3() {
  const props = AppMockProps;

  const location = useLocation();
  // console.log("this is location", location);
  return (
    <div className="clicked_page">
      <Layout>
        <SidebarWrap>
          <Sidebar {...props} />
        </SidebarWrap>
        <Layout>
          <Header props={props} />
        </Layout>
        <DynamicView
          {...{
            viewTitle: location.state + " Page",
            tabList: [
              {
                tab: location.state,
                component: Accounting,
                props: {
                  // activeAccountingTab: "Applications",
                  stas: location.state,
                },
              },
            ],
          }}
        />
      </Layout>
      {/* <Layout>
        <SidebarWrap>
          <Sidebar {...props} />
        </SidebarWrap>
        <Layout>
          <Header props={props} />
        </Layout>
        <div className="display_page">
          <h1>{location.state} Page</h1>
        </div>
      </Layout> */}
    </div>
  );
}

export default Page3;
