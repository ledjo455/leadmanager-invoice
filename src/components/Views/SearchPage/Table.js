import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Grid, Button } from "@mui/material";
import "ag-grid-enterprise";
import jsonData from "../../../dataLayer/scheduleOfValues.json";
import * as moment from "moment";
import getDatesFiltering from "./dateFilter";
import dateFiltering from "./dateFiltering";
import "../SearchPage.css";
function Table({ passeddate, getTableRows }) {
  const statusBar = {
    statusPanels: [
      {
        statusPanel: "agAggregationComponent",
        statusPanelParams: {
          // possible values are: 'count', 'sum', 'min', 'max', 'avg'
          aggFuncs: ["min", "max", "avg", "count", "sum", "min", "max", "avg"],
        },
      },
    ],
  };

  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(jsonData);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const dateFormatter = (params) => {
    // var timestamp = Math.round(params.value / 1000);
    var timestamp = params.value;

    return moment.unix(timestamp).format("DD/MM/YYYY HH:MM");
  };
  const columnDefs = [
    {
      headerName: "Created By",
      field: "createdBy",
      // filter: "agTextColumnFilter",
    },
    { headerName: "Project", field: "projectName" },
    {
      headerName: "Created At",
      field: "createdAt",
      valueFormatter: dateFormatter,
      // filter: "agTextColumnFilter",
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setRowData(jsonData);
  };

  useEffect(() => {
    if (passeddate !== null) {
      if (passeddate === "reset") {
        gridApi.destroyFilter("createdAt");
      } else {
        const today = dateFiltering("today");
        console.log("Passed Date", passeddate.value);
        console.log("dates filtering", getDatesFiltering("today"));
        // const formated = moment
        //   .unix(passeddate.value / 1000)
        //   .format("DD/MM/YYYY");
        // console.log("formated", formated);
        var ageFilterComponent = gridApi.getFilterInstance("createdAt");
        ageFilterComponent.setModel({
          values: passeddate,
        });
        gridApi.onFilterChanged();
      }
      getTableRows(gridApi);
    }
  }, [passeddate]);

  // let rowData = [];
  // gridApi.forEachNodeAfterFilter((node) => {
  //   rowData.push(node.data);
  // });
  // getData(rowData);

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    // floatingFilter: true,
  };

  return (
    <div className="App">
      <div
        className="ag-theme-alpine"
        // style={{
        //   height: "700px",
        //   width: "70%",
        //   marginLeft: "400px",
        //   marginTop: "50px",
        // }}
      >
        {" "}
        <AgGridReact
          modules={[
            MenuModule,
            FiltersToolPanelModule,
            ColumnsToolPanelModule,
            SetFilterModule,
          ]}
          rowGroupPanelShow={"always"}
          //   rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          statusBar={statusBar}
          enableRangeSelection={true}
          suppressDragLeaveHidesColumns={true}
          suppressMakeColumnVisibleAfterUnGroup={true}
          // rowSelection={'single'}
        />
      </div>
    </div>
  );
}

export default Table;
