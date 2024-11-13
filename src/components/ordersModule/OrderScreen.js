import React, { createContext, useState } from "react";
import CommonButton from "../common/Buttons/CommonButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import OrdersList from "./OrdersList";

// Correct context creation and name
export const OrdersContext = createContext();

const OrderScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  return (
    <OrdersContext.Provider value={{ selectedOrder, setSelectedOrder }}>
      <div className="mt-12">
        <div className="flex justify-between">
          <h1 className="text-2xl text-black ">Orders</h1>
          <div className="flex gap-3">
            <CommonButton
              label="View Drafts"
              className={"border bg-white "}
              icon={
                <BorderColorOutlinedIcon
                  fontSize="small"
                  className="text-gray-700"
                />
              }
            />
            <CommonButton
              label="Export CSV"
              className={"border bg-white "}
              icon={
                <SaveAltOutlinedIcon
                  fontSize="small"
                  className="text-gray-700"
                />
              }
            />
            <CommonButton
              label="Create new order"
              className={"border bg-blue-600 text-white "}
              icon={<AddOutlinedIcon fontSize="small" className="text-white" />}
            />
          </div>
        </div>
        <div className="text-gray-600">Manage all your orders here</div>
        <div className="my-3">
          <OrdersList />
        </div>
      </div>
    </OrdersContext.Provider>
  );
};

export default OrderScreen;
