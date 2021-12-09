import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import { InputAdornment } from "@mui/material";
import population from "../../../../dataLayer/population.json";
import "./SearchModal.css";
import { whileStatement } from "@babel/types";

export default function SearchModal({ modal }) {
  const [open, setOpen] = useState(modal);
  const [searchBar, setSearch] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // for testing

  useEffect(() => {
    console.log(
      "printing search text:",
      searchBar,
      "AND:",
      population.filter((data) => data.type.includes(searchBar))
    );
  }, [searchBar]);

  const searchResults = !searchBar
    ? population
    : population.filter(
        (data) => data.type.toLowerCase().includes(searchBar.toLowerCase())
        // && data.amount.includes(searchBar)
      );

  //
  const advancedSearchHandler = () => {
    navigate("/search");
    handleClose();
  };

  const useStyles = makeStyles({
    topScrollPaper: {
      alignItems: "flex-start",
      margin: "-397px -200px",
    },

    topPaperScrollBody: {
      verticalAlign: "top",
      minHeight: "80vh",
      maxHeight: "80vh",
    },
    newPosOfDialog: {
      top: "22%",
      left: "80%",
      transform: "translate(-50%, -50%)",
    },
  });
  const classes = useStyles();

  return (
    <div className="search_modal">
      <SearchIcon
        style={{
          width: "35px",
          height: "70px",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={handleClickOpen}
      />
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
            transaction type or view all results with Advanced Search option.
          </DialogContentText>
          <div className="modal__searchbar">
            <TextField
              autoFocus
              autoComplete="off"
              margin="dense"
              id="name"
              // label="Email Address"
              type="text"
              placeholder="Search"
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
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
          <br />
          <hr />
          <ul className="search_results">
            {searchResults.slice(0, 5).map((item) => (
              <div className="search_list">
                <p>{item.type}</p>
                <p>{item.date}</p>
                <p>{item.amount}</p>
              </div>
            ))}
          </ul>
          {/* {population.slice(0, 5).map((el) => (
            <div className="search_list">
              <p>{el.type}</p>
              <p>{el.date}</p>
              <p>{el.amount}</p>
            </div>
          ))} */}
          <p
            className={"search_list__viewmore"}
            onClick={advancedSearchHandler}
          >
            View more
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Search</Button>
        </DialogActions>
        <div className="search_modal__footer">
          <p>to navigate</p>
          <p>enter to select</p>
          <p>esc to dismiss</p>
          <p
            onClick={advancedSearchHandler}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Advanced Search
          </p>
        </div>
      </Dialog>
    </div>
  );
}
