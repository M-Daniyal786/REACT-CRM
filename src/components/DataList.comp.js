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
import { green, indigo, red } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import VisibilityIcon from "@material-ui/icons/Visibility";
import Popup from "./Popup";
import PopupList from "./PopupList";
import { createAPIEndPoint } from "../api";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { Link } from "react-router-dom";
import GeneratePaymentForm from "./checkout/GeneratePaymentForm";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: "#7279f5",
    color: "white",
    fontWeight: "bold",
  },
}));

function DataList(props) {
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
  } = props;
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [id, setId] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleEdit = () => {};

  const handleView = () => {};

  const handleDelete = (id) => {
    console.log(id);
    createAPIEndPoint("order")
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
                style={{ minWidth: 200 }}
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
                    const value = row[column.id];

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
                    {/* <Link
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
                    </Link> */}
                    <ButtonBase
                      class="bg-red-300 p-1 rounded-md ml-4 focus:outline-none"
                      onClick={() => {
                        setId(row.id);
                        setOpenDeletePopup(true);
                      }}
                    >
                      <DeleteIcon style={{ color: red[700] }} />
                    </ButtonBase>

                    <ButtonBase
                      class="bg-green-200 p-1 rounded-md ml-4 focus:outline-none"
                      onClick={() => {
                        setId(row.id);
                        setOpenPaymentPopup(true);
                      }}
                    >
                      {/* <span class="text-green-600 font-montserrat font-semibold text-base">PAY</span> */}
                      <CreditCardIcon style={{ color: green[700] }} />
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
      <Popup
        title={"Generate Payment Link"}
        openPopup={openPaymentPopup}
        setOpenPopup={setOpenPaymentPopup}
      >
        <GeneratePaymentForm orderId={id} customerId={props.customerId}/>
      </Popup>
    </div>
  );
}

export default DataList;
