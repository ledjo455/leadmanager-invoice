import React from "react";
import moment from "moment-timezone";
import dayjs from "dayjs";
import { AppMockProps } from "./AppMockProps";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { ContextProvider } from "./dataLayer/context/ContextProvider";

const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

const App = (props) => {
  moment.tz.setDefault("America/New_York");
  dayjs.tz.setDefault("America/New_York");
  return (
    <ContextProvider>
      <div style={{ overflow: "auto", height: "100%", width: "100vw" }}>
        <AuthenticatedRoute props={AppMockProps} />
      </div>
    </ContextProvider>
  );
};
export default App;
