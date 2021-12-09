import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "./SearchPage/Table";
import "../Views/Printing.css";
import * as moment from "moment";
function Printing() {
  const passed = useLocation();
  const table = passed.state;
  console.log("printing state...", passed);
  const [headers, setHeaders] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (table !== null) {
      setHeaders(Object.keys(table[0]));
      console.log("headers", headers);
      setTableData(table);
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [passed]);

  return (
    <div className="print_page">
      <table>
        <tr>
          {headers?.map((header) => (
            <th style={{ padding: "20px" }}>{header}</th>
          ))}
        </tr>
        <br />
        {tableData?.map((element) => (
          <tr>
            <td>{element.createdBy}</td>
            <td>{element.projectName}</td>
            <td>{moment.unix(element.createdAt).format("DD/MM/YYYY HH:MM")}</td>
          </tr>
        ))}
      </table>
    </div>
  );
  //   window.open(url, '_blank').focus();
}

export default Printing;

const style = {
  display: "flex",
  justifyContent: "center",
  marginTop: "2%",
};
