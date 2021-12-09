import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SearchPage from "./components/Views/SearchPage";
import Page3 from "./components/Views/Page3";
import Printing from "./components/Views/Printing";
import PrintAccounting from "./components/SidebarPages/Projects/Accounting/PrintAccounting";
import { sidebarMock } from "./components/Sidebars/SidebarsMock";
function Main() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {sidebarMock.map((element) => (
            <Route path={element.to} element={<Page3 />} />
          ))}
          <Route path="/" element={<App />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/printing" element={<Printing />} />
          <Route path="/accounting_print" element={<PrintAccounting />} />
          {/* <Route path="/dashboard" element={<Page3 />} />
          <Route path="/dob" element={<Page3 />} />
          <Route path="/leads" element={<Page3 />} />
          <Route path="/opportunities" element={<Page3 />} />
          <Route path="/estimations" element={<Page3 />} />
          <Route path="/projects" element={<Page3 />} />
          <Route path="/scheduling" element={<Page3 />} />
          <Route path="/permitdrawings" element={<Page3 />} />
          <Route path="/subcontractors" element={<Page3 />} />
          <Route path="/accounts" element={<Page3 />} />
          <Route path="/contacts" element={<Page3 />} />
          <Route path="/inspections" element={<Page3 />} />
          <Route path="/tasksManager" element={<Page3 />} />
          <Route path="/fleet" element={<Page3 />} />
          <Route path="/documentation" element={<Page3 />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
