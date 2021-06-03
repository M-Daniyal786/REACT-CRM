import React, { useEffect, useState } from "react";
import { createAPIEndPoint } from "../../api";
import DataList from "../DataList.comp";

function CustomerOrderList(props) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
 
  const { isLoading, setIsLoading, id } = props;

  const columns = [
    { id: "customerId", label: "Customer ID", minWidth: 170 },
    { id: "totalPayment", label: "Total Payment", minWidth: 150, align: "center", },
    { id: "credit", label: "Credit", minWidth: 150, align: "center", },
    { id: "orderName", label: "Order Name", minWidth: 170, align: "center", },
    {
      id: "balance",
      label: "Balance",
      minWidth: 150,
      align: "center",
    },
  ];

  useEffect(() => {
    let filter = { page };
    filter.limit = 5;
    filter.customerId = id;
    createAPIEndPoint("order")
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


  return (
    <div>
      <DataList
        rows={rows}
        columns={columns}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        endPoint={"order"}
        customerId={id}
      />
    </div>
  );
}

export default CustomerOrderList;
