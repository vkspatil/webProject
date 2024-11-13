import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonButton from "../common/Buttons/CommonButton";
import DropdownField from "../common/FormInputs/DropdownField";
import InputField from "../common/FormInputs/InputField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import OrderDetails from "./OrderDetails";
import { OrdersContext } from "./OrderScreen";
import axios from "axios";

const statusColors = {
  Completed: "bg-green-100 text-green-600",
  Review: "bg-yellow-100 text-yellow-600",
  "In Progress": "bg-blue-100 text-blue-600",
  "Query Raised": "bg-red-100 text-red-600",
  Draft: "bg-gray-100 text-gray-600",
  "Approval pending": "bg-orange-100 text-orange-600",
};

const OrdersList = () => {
  const { setSelectedOrder } = useContext(OrdersContext);
  const { control, handleSubmit, reset } = useForm();
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [dropdownData, setDropdownData] = useState({
    domiciles: [],
    companies: [],
    statuses: [],
  });
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Track selected order ID

  const apiUrl = "http://localhost:5000/orders/ordersList";
  const dropdownApiUrl = "http://localhost:5000/orders";

  const fetchOrders = async (data) => {
    console.log(data);

    const customObject = {
      orderId: data.orderId,
      domicile: data.domicile?.value,
      company: data.company?.value,
      status: data.status?.value,
    };

    try {
      const response = await axios.post(apiUrl, customObject);
      setOrders(response.data.result || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [domicilesResponse, companiesResponse, statusesResponse] =
        await Promise.all([
          axios.get(`${dropdownApiUrl}/domiciles`),
          axios.get(`${dropdownApiUrl}/companies`),
          axios.get(`${dropdownApiUrl}/statuses`),
        ]);

      setDropdownData({
        domiciles: domicilesResponse.data.result || [],
        companies: companiesResponse.data.result || [],
        statuses: statusesResponse.data.result || [],
      });
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const sortOrders = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      return sortOrder === "asc"
        ? a.orderId - b.orderId
        : b.orderId - a.orderId;
    });
    setOrders(sortedOrders);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const initialFetchOrders = async () => {
      await fetchOrders({});
      await fetchDropdownData();
    };
    initialFetchOrders();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(fetchOrders)}>
        <div className="grid grid-cols-5 gap-3">
          <div>
            <InputField
              control={control}
              label="Order Id"
              name="orderId"
              searchIcon={true}
              isClearable={true}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              placeholder="Filter by domicile"
              name="domicile"
              dataArray={dropdownData.domiciles}
              isClearable={true}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              placeholder="Filter by company"
              name="company"
              dataArray={dropdownData.companies}
              isClearable={true}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              placeholder="Filter by status"
              name="status"
              dataArray={dropdownData.statuses}
              isClearable={true}
            />
          </div>
          <div className="flex gap-3">
            <CommonButton
              label="Filter"
              className={"bg-blue-600 text-white"}
              type="submit"
            />
            <CommonButton
              label="Reset filter"
              className={"bg-white border"}
              onClick={() => {
                reset();
                fetchOrders({}); // Fetch all orders again
              }}
            />
          </div>
        </div>
      </form>
      <div className="grid grid-cols-5 gap-3 text-sm bg-white mt-3 overflow-hidden">
        <div className="col-span-1 border rounded-xl overflow-auto max-h-[550px]">
          <div className="p-3 flex gap-3">
            <div className="text-black font-semibold text-base">Orders</div>
            <div className="bg-blue-100 text-blue-600 flex items-center px-1">
              {Array.isArray(orders) ? orders.length : 0}
            </div>
          </div>
          <div
            className="p-3 flex gap-3 border-b cursor-pointer border-t"
            onClick={sortOrders}
          >
            <div className="">Order ID</div>
            <div className="px-1">
              {sortOrder === "asc" ? (
                <ArrowDownwardIcon fontSize="14px" />
              ) : (
                <ArrowUpwardIcon fontSize="14px" />
              )}
            </div>
          </div>
          {orders.map((item) => (
            <div
              key={item.id}
              className={`grid grid-cols-4 gap-2 border-b p-3 items-center hover:bg-gray-100 active:bg-gray-200 transition duration-150 ${
                selectedOrderId === item.id ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                setSelectedOrder(item);
                setSelectedOrderId(item.id); // Set the selected order ID
              }}
            >
              <div className="col-span-2">
                <div className="text-black font-semibold">{item.orderId}</div>
                <div className="text-xs">{item.category}</div>
              </div>
              <div>
                <span
                  className={`${
                    statusColors[item.status]
                  } rounded p-1 whitespace-nowrap`}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex justify-end">
                <ArrowForwardIosIcon fontSize="14px" />
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-4">
          <OrderDetails statusColors={statusColors} />
        </div>
      </div>
    </>
  );
};

export default OrdersList;
