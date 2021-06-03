import {
  Button,
  ButtonBase,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { indigo, red } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Popup from "./Popup";
import PopupList from "./PopupList";
import { createAPIEndPoint } from "../api";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: "#7279f5",
    color: "white",
    fontWeight: "bold",
  },
}));

function DataListCustom(props) {
  const classes = useStyles();

  const {
    page,
    setPage,
    columns,
    rows,
    setTotalPages,
    totalPages,
    isLoading,
    setIsLoading,
    path,
    endPoint,
  } = props;
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [id, setId] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
    setIsLoading(true);
  };

  const handleEdit = () => {};

  const handleView = () => {};

  const handleDelete = (id) => {
    console.log(id);
    createAPIEndPoint(`${endPoint}`)
      .delete(id)
      .then((res) => {
        setOpenDeletePopup(false);
        setIsLoading(true);
      })
      .catch((err) => {
        alert("ERROR!", err);
      });
  };

  useEffect(() => {
    console.log("Re-render!");
  }, [isLoading]);

  return (
    <div>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={classes.tableHead}
                  // class="text-white bg-indigo-500 pt-4 pb-4"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                className={classes.tableHead}
                // class="text-white bg-indigo-500 pt-4 pb-4"
                style={{ minWidth: 180 }}
              >
                {" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row.referredEmployeeId
                      ? row[column.id] || row.referredEmployeeId[0]["firstName"]
                      : row[column.id];

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <ButtonBase
                      class="bg-indigo-300 p-1 rounded-md focus:outline-none"
                      onClick={() => {
                        setId(row.id);
                        setOpenEditPopup(true);
                      }}
                    >
                      <EditIcon style={{ color: indigo[700] }} />
                    </ButtonBase>
                    {path ? (
                      <Link
                        to={{
                          pathname: `/dashboard/${path}/${row.id}`,
                        }}
                        rel="noopener noreferrer"
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <ButtonBase class="bg-indigo-300 p-1 rounded-md ml-4 focus:outline-none">
                          <VisibilityIcon style={{ color: indigo[700] }} />
                        </ButtonBase>
                      </Link>
                    ) : null}

                    <ButtonBase
                      class="bg-red-300 p-1 rounded-md ml-4 focus:outline-none"
                      onClick={() => {
                        setId(row.id);
                        setOpenDeletePopup(true);
                      }}
                    >
                      <DeleteIcon style={{ color: red[700] }} />
                    </ButtonBase>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div class="bg-white h-10 flex justify-end items-end mt-3">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      {/* POPUPS */}
      {/* DELETE POPUP */}
      <PopupList openPopup={openDeletePopup} setOpenPopup={setOpenDeletePopup}>
        <div class="w-full">
          <Typography variant="h6">Are you sure you want to delete?</Typography>
          <div class="mt-5 flex justify-end">
            <Button
              variant="contained"
              class="bg-red-600 pt-2 pb-2 pr-5 pl-5 rounded-lg text-white"
              onClick={() => handleDelete(id)}
            >
              Yes
            </Button>
          </div>
        </div>
      </PopupList>
      {/* EDIT POPUP */}
      <Popup
        title={"Edit Customer"}
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      ></Popup>
    </div>
  );
}

export default DataListCustom;
