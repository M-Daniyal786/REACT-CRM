import React, { useEffect, useState } from "react";
import { createAPIEndPoint } from "../../api";
import DataListCustom from "../DataListCustom.comp";

function CustomerList(props) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [employee, setEmployee] = useState([]);

  const { isLoading, setIsLoading } = props;

  const getEmployeeName = () => {
    rows.map((emp, index) => {
      setEmployee(emp.referredEmployeeId[0]);
    });
  };

  const columns = [
    { id: "customerName", label: "Customer Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "customerCountry", label: "Customer Country", minWidth: 170 },

    {
      id: "contactNumber",
      label: "Contact Number",
      minWidth: 170,
      align: "center",
    },
    {
      id: "referredEmployeeId[0].firstName",
      label: "Employee Name",
      minWidth: 170,
      align: "center",
    },
  ];

  useEffect(() => {
    let filter = { page };
    filter.limit=5
    createAPIEndPoint("customer")
      .fetchFiltered({ params: filter })
      .then((res) => {
        setRows(res.data.results);
        setTotalPages(res.data.totalPages);
        setPage(res.data.page);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoading, page]);

  useEffect(() => {
    getEmployeeName();
  }, [rows]);

  return (
    <div>
      <DataListCustom
        rows={rows}
        columns={columns}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        // path for view open
        path={"customerdetails"}
        endPoint={"customer"}
      />
    
    </div>
  );
}

export default CustomerList;
