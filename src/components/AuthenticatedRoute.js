import styled from "styled-components";
import { Layout } from "antd";
import Sidebar from "./Sidebars/Sidebar";
import Header from "./Header/Header";
import { DynamicProjectsView } from "./SidebarPages/Projects/DynamicProjectsView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const SidebarWrap = styled.div`
  display: flex;
  width: 250px;
  position: fixed;
  height: 100vh;
  top:0
  left:0;
`;
const AuthenticatedRoute = ({ props }) => {
  return (
    <div>
      <Layout>
        <SidebarWrap>
          <Sidebar {...props} />
        </SidebarWrap>
        <Layout>
          <Header props={props} />
          <DynamicProjectsView {...{ ...props }} />
        </Layout>
      </Layout>
    </div>
  );
};
export default AuthenticatedRoute;
