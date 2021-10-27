import React, { useEffect, useState } from "react";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import { createAPIEndPoint } from "../../api";
import {
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const MainAdmin = () => {
  // const [show, setShow] = useState(false);
  // const [profile, setProfile] = useState(false);

  const [dataset1, setDataset1] = useState([]);
  const [dataset2, setDataset2] = useState([]);

  const [switchOrder, setSwitchOrder] = useState(true);
  const [switchRevenue, setSwitchRevenue] = useState(true);

  const firstName = dataset1.map((item) => {
    return item.firstName;
  });
  const orders = dataset1.map((item) => {
    return item.numberOfCustomer;
  });
  const name = dataset2.map((item) => {
    return item.firstName;
  });
  const revenue = dataset2.map((item) => {
    return item.revenueGenerated;
  });

  const toggleOrderChecked = () => {
    setSwitchOrder((prev) => !prev);
  };
  const toggleRevenueChecked = () => {
    setSwitchRevenue((prev) => !prev);
  };

  useEffect(() => {
    createAPIEndPoint("employee/performance")
      .fetchAll()
      .then((res) => {
        console.log(res);
        setDataset1(res.data.employeesBasedOnCustomer);
        setDataset2(res.data.employeesBasedOnRevenue);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div class="min-w-0 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
          <div class="p-4 flex items-center">
            <div class="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total clients
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                6389
              </p>
            </div>
          </div>
        </div>
        <div class="min-w-0 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
          <div class="p-4 flex items-center">
            <div class="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Account balance
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                $ 46,760.89
              </p>
            </div>
          </div>
        </div>
        <div class="min-w-0 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
          <div class="p-4 flex items-center">
            <div class="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                New sales
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                376
              </p>
            </div>
          </div>
        </div>
        <div class="min-w-0 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
          <div class="p-4 flex items-center">
            <div class="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                <path
                  fill-rule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending contacts
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                35
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-2">
        <div class="min-w-0 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
          <div class="p-4 flex items-center justify-center">
            <div class="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4 w-4/6">
              {/* charts go here */}
              {switchOrder ? (
                <BarChart
                  labels={firstName}
                  data={orders}
                  title={"No. of Orders"}
                />
              ) : (
                <DoughnutChart
                  labels={firstName}
                  data={orders}
                  title={"No. of Orders"}
                />
              )}
            </div>
          </div>
          <div class="ml-10 mb-3">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={switchOrder}
                    onChange={toggleOrderChecked}
                  />
                }
                label=""
              />
            </FormGroup>
          </div>
        </div>
        <div class="min-w-0 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
          <div class="p-4 flex items-center justify-center">
            <div class="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4 w-4/6">
              {/* charts go here */}
              {switchRevenue ? (
                <DoughnutChart
                  labels={name}
                  data={revenue}
                  title={"Top Employee w.r.t revenue"}
                />
              ) : (
                <BarChart
                  labels={name}
                  data={revenue}
                  title={"Top Employee w.r.t revenue"}
                />
              )}
            </div>
          </div>
          <div class="ml-10 mb-3">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={switchRevenue}
                    onChange={toggleRevenueChecked}
                  />
                }
                label=""
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainAdmin;
