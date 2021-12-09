import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./PrintAccounting.scss";
import { ErrorComponent } from "./Errors";
import PdfTron from "./Pdftron";
function PrintAccounting() {
  const location = useLocation();
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState(null);

  const [tableData, setTableData] = useState([
    {
      invoice: "",
      date: "",
      project: "",
      billed_amount: "",
      paid: "",
      balance: "",
    },
  ]);
  useEffect(() => {
    console.log("Print Accounting", location);
    let rowsData = [];

    try {
      if (location.state) {
        setHasError(false);
        setTableData(location.state);
        location.state.map((element) =>
          rowsData.push([
            element.invoice,
            element.date,
            element.project,
            element.balance,
          ])
        );
        setRows(rowsData);
        console.log("these are the rows,", rows);
      } else {
        setHasError(true);
      }
    } catch {
      setHasError(true);
    }
  }, [location]);

  return (
    <div className="print-container">
      {!hasError && (
        <div className="limiter">
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table">
                <div className="row header">
                  <div className="cell">Invoice</div>
                  <div className="cell">Date</div>
                  <div className="cell">Project</div>
                  <div className="cell">Billed </div>
                  <div className="cell">Paid</div>
                  <div className="cell">Balance</div>
                </div>
                {tableData?.map((element) => (
                  <div className="row">
                    <div className="cell">{element.invoice}</div>
                    <div className="cell">{element.date}</div>
                    <div className="cell">{element.project}</div>
                    <div className="cell">{element.billed_amount}</div>
                    <div className="cell">{element.paid}</div>
                    <div className="cell">{element.balance}</div>
                  </div>
                ))}
                <div className="row footer" style={{ color: "white" }}>
                  <div className="cell"></div>
                  <div className="cell"></div>
                  <div className="cell">TOTAL:</div>

                  <div className="cell">
                    $
                    {tableData
                      ?.map((item) => parseInt(item.billed_amount))
                      .reduce((prev, next) => prev + next)}
                  </div>
                  <div className="cell">
                    $
                    {tableData
                      ?.map((item) => parseInt(item.paid))
                      .reduce((prev, next) => prev + next)}
                  </div>
                  <div className="cell">
                    $
                    {tableData
                      ?.map((item) => parseInt(item.balance))
                      .reduce((prev, next) => prev + next)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!hasError && <PdfTron data={rows} />}
          </div>
        </div>
      )}
      <div className="error"> {hasError && <ErrorComponent />}</div>
    </div>
  );
}

export default PrintAccounting;
