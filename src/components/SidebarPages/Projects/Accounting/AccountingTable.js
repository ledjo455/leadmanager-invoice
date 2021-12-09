import React, { useEffect, useState, useContext } from "react";
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
import jsonData from "../../../../dataLayer/projects.json";
import * as moment from "moment";
import "./AccountingTable.css";
import { DoubleRightOutlined, DownCircleFilled } from "@ant-design/icons";
import { ProjectContext } from "../../../../dataLayer/context/ContextProvider";

function AccountingTable({
  tableDataPassed,
  retrieveSelected,
  sendResetSelected,
  setSendResetSelected,
  setActionType,
  actionType,
  getJsonData,
  mark,
}) {
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
  // const [tableData, setTableData] = useState(tableDataPassed);
  const [tableData, setTableData] = useContext(ProjectContext);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);
  const dateFormatter = (params) => {
    // var timestamp = Math.round(params.value / 1000);
    var timestamp = params.value;

    return moment.unix(timestamp).format("DD/MM/YYYY HH:MM");
  };
  const columnDefs = [
    {
      headerName: "Invoice",
      field: "invoice",
      enableRowGroup: true,
      checkboxSelection: true,
      // filter: "agTextColumnFilter",
    },
    { headerName: "Date", field: "date", enableRowGroup: true },
    {
      headerName: "Project",
      field: "project",
      enableRowGroup: true,
      minWidth: 400,
      maxWidth: 350,
    },
    {
      headerName: "Billed Amount",
      field: "billed_amount",
      aggFunc: "sum",

      enableRowGroup: true,
    }, //editable: true
    { headerName: "Paid", field: "paid", enableRowGroup: true },
    { headerName: "Balance", field: "balance", enableRowGroup: true },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const getSelectedRowData = () => {
    let selectedNodes = gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    // alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    // console.log("this is the selected data", selectedData);
    return selectedData;
  };
  const handleSelectionChanged = () => {
    setSelectedRows(getSelectedRowData());
    console.log("Selection Changed", selectedRows);
  };

  //for getting rows from ag-grid (slower approach)
  // const getRowData = () => {
  //   let rowData = [];
  //   gridApi.forEachNode((node) => rowData.push(node.data));
  //   console.log("row data:", rowData);
  // };

  // useEffect(() => {
  //   if (gridApi !== null) {
  //     getRowData();
  //   }
  // }, [gridApi]);

  useEffect(() => {
    if (deletedRows.length > 0) {
      gridApi.applyTransaction({ remove: deletedRows });
      console.log("MARKED", mark);
    }
  }, [tableData.length]);

  useEffect(() => {
    if (actionType !== "None") {
      switch (actionType) {
        case "delete":
          let ids = [];
          gridApi.applyTransaction({ remove: selectedRows });
          selectedRows.map((element) =>
            setDeletedRows((prev) => [...prev, element])
          );
          deletedRows.map((element) => ids.push(element.invoice));
          console.log("ids", ids);
        default:
          console.log("Default");

          console.log("Deleted Rows:", deletedRows, "james", gridApi);
          setActionType("None");
      }
    }
  }, [actionType, selectedRows]);

  useEffect(() => {
    const sendSelected = retrieveSelected(selectedRows);
    if (sendResetSelected) {
      gridApi.deselectAll();
      setSendResetSelected(false);
    }
  }, [selectedRows, sendResetSelected]);

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    // floatingFilter: true,
  };

  return (
    <div id="grid-theme-wrapper" className="red-theme">
      <div
        className="ag-theme-alpine"
        style={{
          height: "400px",
          width: "1147px",
          marginLeft: "48px",
          marginTop: "30px",
        }}
      >
        {" "}
        <AgGridReact
          rowData={tableData}
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
          pagination={true}
          paginationPageSize={5}
          // enableRangeSelection={true}
          suppressCellSelection={true}
          // suppressDragLeaveHidesColumns={true}
          // suppressMakeColumnVisibleAfterUnGroup={true}
          rowSelection={"multiple"}
          onSelectionChanged={handleSelectionChanged}

          // rowSelection={'single'}
        />
      </div>

      <strong className="ag-paging-helper">
        {tableData.length > 5 && (
          <strong>
            there are more <DoubleRightOutlined />
          </strong>
        )}{" "}
      </strong>
    </div>
  );
}

export default AccountingTable;
