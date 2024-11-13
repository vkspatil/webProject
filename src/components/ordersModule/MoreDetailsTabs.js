import React, { useState } from "react";

const MoreDetailsTabs = () => {
  const [activeTab, setActiveTab] = useState("OrderDetails");

  const tabs = [
    { name: "Order Details", key: "OrderDetails" },
    { name: "Order Requirements", key: "OrderRequirements" },
    { name: "Contacts", key: "Contacts" },
    { name: "Documents", key: "Documents" },
  ];

  return (
    <div className="bg-white border rounded-lg shadow-md p-4">
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`cursor-pointer py-2 text-center ${
              activeTab === tab.key
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "OrderDetails" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg  shadow">
              <div>
                <h2 className=" font-semibold text-blue-600 bg-blue-50 border border-blue-600 p-4 rounded-t-lg">
                  Receipt
                </h2>
              </div>
              <p className="p-4">Your receipt details will be shown here.</p>
            </div>
            <div className="border rounded-lg ">
              <div>
                <h2 className=" font-semibold text-blue-600 bg-blue-50 border border-blue-600 p-4 rounded-t-lg">
                  History
                </h2>
              </div>{" "}
              <p className="p-4">Your order history will be shown here.</p>
            </div>
          </div>
        )}
        {activeTab === "OrderRequirements" && (
          <div>Order Requirements Content</div>
        )}
        {activeTab === "Contacts" && <div>Contacts Content</div>}
        {activeTab === "Documents" && <div>Documents Content</div>}
      </div>
    </div>
  );
};

export default MoreDetailsTabs;
