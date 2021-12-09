/*eslint-disable*/
import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { SidebarData } from "./SidebarData";
import { CompanyLogo, PagesMenu } from "./components";
import { getApiRouteByCompany } from "../SidebarPages/utils";
import { CoreWhiteLogo } from "../../icons";
import { sidebarMock } from "./SidebarsMock";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const Sidebar = (props) => {
  const [sidebarElements, setSidebarElements] = useState([]);
  const [sidebarCollapse, setSideBarCollapse] = useState(false);
  const { companyLogos = [], companyName } = props;
  const formattedCompanyLogos = companyLogos?.reduce(
    (acc, { fileName, base64 }) => ({ ...acc, [fileName]: base64 }),
    {}
  );
  const getSideBarData = () => {
    for (let el of sidebarMock) {
      for (let element of SidebarData) {
        if (el.title === element.title) {
          el.src = element.src;
        }
      }
    }
    setSidebarElements(sidebarMock);
  };

  useEffect(() => {
    getSideBarData();
    console.log("Props passed:", props);
  }, []);

  return (
    <div
      className={
        sidebarCollapse !== false ? "sidebar__collapse" : "sidebarContainer"
      }
    >
      {!!companyName && (
        <CompanyLogo
          src={getApiRouteByCompany(
            companyName,
            CoreWhiteLogo,
            formattedCompanyLogos["CENTRAL logo"]
          )}
        />
      )}

      {sidebarElements && <PagesMenu pages={sidebarElements} />}
      <div className="Collapse">
        <ArrowBackIosNewIcon
          onClick={() => setSideBarCollapse(!sidebarCollapse)}
        />
      </div>
    </div>
  );
};
export default Sidebar;
