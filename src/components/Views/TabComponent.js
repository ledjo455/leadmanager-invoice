import { useState } from "react";
import "./tabComponent.scss";
const tabs = [
  { key: "1", tab: "Schedule Of Values" },
  { key: "2", tab: "Applications" },
  { key: "3", tab: "Invoicing" },
  { key: "4", tab: "Charges" },
  { key: "5", tab: "Rentals" },
];
const Accounting = (props) => {
  const [activeKey, setActiveKey] = useState("1");
  console.log("LOG: ", props);
  return (
    <div className="accountingTab">
      <h1>
        Insert Component for <strong>{props.stas}</strong> View Here
      </h1>
      {/* {tabs.map(({ key, tab }) => {
        return (
          <div
            className={activeKey === key ? "tabItemSelected" : "tabItem"}
            onClick={() => {
              setActiveKey(key);
            }}
          >
            <span className="tabItemLabel">{tab}</span>
          </div>
        );
      })} */}
    </div>
  );
};

export default Accounting;
