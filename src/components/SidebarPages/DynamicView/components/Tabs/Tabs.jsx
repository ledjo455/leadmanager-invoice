import { Tabs } from "antd";
import "./Tabs.scss";
import React, { useState } from "react";
import { UpIcon } from "../../src";

const { TabPane } = Tabs;

const TabsComp = ({ viewTitle, tabList = [] }) => {
  const [upVisible, setUpVisible] = useState(false);
  let tabRef = document.getElementsByClassName("tabBody");

  return (
    <div className="tabContainer">
      <span className="titleComp">{viewTitle}</span>
      <Tabs className="tabComponent">
        {tabList.map(
          (
            {
              tab,
              props,
              getEditedValue,
              component: Component,
              stepperParams,
              sideButtons,
            },
            key
          ) => {
            return (
              <TabPane {...{ tab, key }}>
                <div
                  id="tabBody"
                  className="tabBody"
                  onScroll={({ target: { scrollTop } }) => {
                    if (scrollTop >= 200) {
                      if (upVisible === false) {
                        setUpVisible(true);
                      }
                    } else {
                      if (upVisible === true) {
                        setUpVisible(false);
                      }
                    }
                  }}
                >
                  <div
                    style={{
                      width: "95%",
                      marginLeft: 50,
                    }}
                  >
                    <Component
                      {...props}
                      {...{
                        props,
                        sideButtons,
                        stepperParams,
                        getEditedValue,
                        currentStep:
                          stepperParams && stepperParams?.currentStep,
                      }}
                    />
                  </div>
                  {upVisible && (
                    <div
                      className="backTop"
                      onClick={(e) => {
                        for (var i = 0; i < tabRef.length; i++) {
                          tabRef[i].scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      <span className="backTopIcon">
                        <UpIcon />
                      </span>
                    </div>
                  )}
                </div>
              </TabPane>
            );
          }
        )}
      </Tabs>
    </div>
  );
};
export default TabsComp;
