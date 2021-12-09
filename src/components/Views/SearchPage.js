import "./SearchPage.css";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Layout } from "antd";
import Sidebar from "../Sidebars/Sidebar";
import Header from "../Header/Header";
import { AppMockProps } from "../../AppMockProps";
import Table from "./SearchPage/Table";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import dateFiltering from "./SearchPage/dateFiltering";
import * as moment from "moment";
import { getCustomRange } from "./SearchPage/dateFiltering";
import addWeeks from "date-fns/addWeeks";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import jsondata from "../../dataLayer/scheduleOfValues.json";
import PrintIcon from "@mui/icons-material/Print";
import IosShareIcon from "@mui/icons-material/IosShare";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SidebarWrap = styled.div`
  display: flex;
  width: 250px;
  position: fixed;
  height: 100vh;
  top:0
  left:0;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "44%",
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

function SearchPage() {
  const props = AppMockProps;
  let { companyLogos = [] } = props;
  const optionDate = useRef(null);
  const [passeddate, setDate] = useState(null);
  const [filter, setFilter] = useState("");
  const [value, setValue] = useState([null, null]);
  const [rowData, setRowData] = useState(null);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [toggleDatePicker, setToggleDatePicker] = useState(false);

  const getTableRows = (value) => {
    console.log("this is the value:", value);
    if (value !== null) {
      const gridApi = value;
      let rowData = [];
      gridApi.forEachNodeAfterFilter((node) => {
        rowData.push(node.data);
      });
      setRowData(rowData);
      console.log("get table rows:", value, rowData);
    }
  };
  const handleReset = () => {
    setDate("reset");
    setValue([null, null]);
    handleClose();
  };

  // for navigation
  const navigate = useNavigate();

  // const getTableRows = (value) => {
  //   if (value !== null) {
  //     const gridApi = value;
  //     let rowData = [];
  //     gridApi.forEachNodeAfterFilter((node) => {
  //       rowData.push(node.data);
  //     });
  //     setRowData(rowData);
  //     console.log("get table rows:", value, rowData);
  //   }
  // };

  const handleprint = (page) => {
    handleReset();
    navigate(page, { state: rowData, target: "_blank" });
  };
  const handleChange = (event) => {
    setToggleDatePicker(false);
    setValue([null, null]);

    setFilter(event.target.value);
    if (event.target.value === "today") {
      setDate(dateFiltering("today"));
      console.log("Passed Day range:", passeddate);
    }
    if (event.target.value === "yesterday") {
      setDate(dateFiltering("yesterday"));
      console.log("Passed Day range:", passeddate);
    }
    if (event.target.value === "this week") {
      setDate(dateFiltering("this week"));
      console.log("Passed Day range:", passeddate);
    }
    if (event.target.value === "past 7") {
      setDate(dateFiltering("past 7"));
      console.log("Passed Day range:", passeddate);
    }
    if (event.target.value === "past 30") {
      setDate(dateFiltering("past 30"));
      console.log("Passed Day range:", passeddate);
    }
    if (event.target.value === "custom") {
      setToggleDatePicker(true);
    }
  };

  useEffect(() => {
    if (value[0] !== null && value[1] !== null) {
      setDate(getCustomRange(value));
      console.log("result of change call", getCustomRange(value));
    }
    // console.log("Length: ", value);
  }, [value]);
  return (
    <div>
      <Layout>
        <SidebarWrap>
          <Sidebar {...props} />
        </SidebarWrap>
        <Layout>
          <Header props={props} />
        </Layout>
        <Layout>
          <div
            style={{
              marginTop: "80px",
              marginLeft: "250px",
              width: "100%",
              height: "100px",
              display: "fixed",
            }}
          >
            <h1 style={{ marginLeft: "-1800px", fontSize: "34px" }}>Search</h1>
          </div>
          <br />
          <div className="filterView">
            <div className="filter_labels">
              <Link
                to={{ pathname: "/search/printing", state: { name: rowData } }}
                target="_blank"
              >
                About
              </Link>
              ;<p>Search: All Transactions</p>
              {passeddate && passeddate !== "reset" && (
                <h3>Found {passeddate && passeddate.length} matches.</h3>
              )}
            </div>
            <button className="date_filter__button" onClick={handleOpen}>
              Date Filter ▼
            </button>
            <h1>
              <div className="date_helper_text">
                {value[0] !== null && value[1] !== null ? (
                  <p>
                    {" "}
                    {moment(value[0]).format("MM/DD/YYYY")} to{" "}
                    {moment(value[1]).format("MM/DD/YYYY")}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </h1>
            <div className="export_options">
              <PrintIcon
                className="print"
                onClick={() => {
                  handleprint("printing");
                }}
              />
              <IosShareIcon className="share" onClick={handleReset} />
              <SettingsIcon
                className="settings"
                onClick={() => console.log("settings")}
              />
            </div>
          </div>
          <div>
            <Modal
              BackdropProps={{
                style: {
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                },
              }}
              style={{ border: "red" }}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ backgroundColor: "none" }}
            >
              <Box sx={style}>
                <div className="modalContainer">
                  <div className="modalFilter">
                    <p>Date:</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filter}
                      label="Age"
                      // inputRef={optionDate}
                      onChange={handleChange}
                      style={{
                        marginLeft: "0px",
                        width: "150px",
                        height: "40px",
                      }}
                    >
                      <MenuItem value={"today"} primaryText="today">
                        Today
                      </MenuItem>
                      <MenuItem value={"yesterday"}>Yesterday</MenuItem>
                      <MenuItem value={"this week"}>This Week</MenuItem>
                      <MenuItem value={"past 7"}>Past 7 Days</MenuItem>
                      <MenuItem value={"past 30"}>Past 30 days</MenuItem>
                      <MenuItem value={"custom"}>Custom</MenuItem>
                    </Select>
                  </div>
                  <div className="date_range">
                    {toggleDatePicker && (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                          value={value}
                          // maxDate={getWeeksAfter(value[0], 4)}
                          onChange={(newValue) => {
                            setValue(newValue);
                            console.log("New Value", value);
                          }}
                          renderInput={(startProps, endProps) => (
                            <React.Fragment>
                              <TextField {...startProps} size="small" />
                              <Box sx={{ mx: 2 }}> to </Box>
                              <TextField {...endProps} size="small" />
                            </React.Fragment>
                          )}
                        />
                      </LocalizationProvider>
                    )}
                  </div>
                </div>
                <br />
                <br />
                <div className="modal_footer">
                  <button className="resetBtn" onClick={handleReset}>
                    Reset
                  </button>
                  <button className="applyBtn" onClick={handleClose}>
                    Apply
                  </button>
                </div>
              </Box>
            </Modal>
          </div>
          <Table
            className="table"
            passeddate={passeddate}
            getTableRows={getTableRows}
          />
        </Layout>
      </Layout>
    </div>
  );
}

export default SearchPage;

{
  /* <div className="search_modal">

<Dialog
  className="search_modal__dialogue"
  open={open}
  onClose={handleClose}
  classes={{
    // scrollPaper: classes.topScrollPaper,
    // paperScrollBody: classes.topPaperScrollBody,
    paper: classes.newPosOfDialog,
  }}
  BackdropProps={{ style: { backgroundColor: "transparent" } }}
>
  <DialogTitle>Search</DialogTitle>
  <DialogContent>
    <DialogContentText>
      To use the search functionality, search for transactions by
      transaction number, or amount ($340.00)
    </DialogContentText>
    <div className="modal__searchbar">
      <TextField
        autoFocus
        margin="dense"
        id="name"
        // label="Email Address"
        type="text"
        placeholder="Search"
        fullWidth
        variant="standard"
        modal__searchbar
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
    
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleClose}>Search</Button>
  </DialogActions>

</Dialog>
</div> */
}
