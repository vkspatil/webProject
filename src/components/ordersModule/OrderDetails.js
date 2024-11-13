import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import React, { useContext, useEffect, useState } from "react";
import CommonButton from "../common/Buttons/CommonButton";
import { OrdersContext } from "./OrderScreen";
import MoreDetailsTabs from "./MoreDetailsTabs";
import axios from "axios";

const OrderDetails = ({ statusColors }) => {
  const { selectedOrder } = useContext(OrdersContext);
  const [moreInfo, setMoreInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);

  

  useEffect(() => {
    const fetchMoreInfo = async () => {
      if (selectedOrder?.orderId) {
        try {
          const moreInfoResponse = await axios.get(
            `http://localhost:5000/orders/moreInfo/${selectedOrder.orderId}`
          );
          setMoreInfo(moreInfoResponse.data.result);

          // Fetch contact info
          const contactInfoResponse = await axios.get(
            `http://localhost:5000/orders/contactInfo/${selectedOrder.orderId}`
          );
          setContactInfo(contactInfoResponse.data.result);
        } catch (error) {
          console.error("Error fetching more info or contact info:", error);
        }
      }
    };

    fetchMoreInfo();
  }, [selectedOrder]);

  return (
    <>
      <div className="grid grid-cols-4 border rounded-xl p-3">
        <div className="col-span-2 flex gap-3">
          <div>
            <div className="text-black font-semibold">
              {selectedOrder?.orderId}
            </div>
            <div className="text-xs">
              <span>{selectedOrder?.category}</span>
              <span>{selectedOrder?.contactPerson}</span>
              <span className="text-blue-600"> - Contact Person</span>
            </div>
          </div>
          <div>
            <span
              className={`${
                statusColors[selectedOrder?.status]
              } rounded p-1 whitespace-nowrap`}
            >
              {selectedOrder?.status}
            </span>
          </div>
        </div>

        <div className="col-span-2 flex gap-3 justify-end">
          <CommonButton
            label="Approval Pending"
            className={"border bg-blue-600 text-white"}
          />
          <CommonButton
            label="Update Status"
            className={"border bg-blue-600 text-white"}
          />
          <CommonButton
            label="Print"
            className={"border bg-white"}
            icon={
              <PrintOutlinedIcon fontSize="small" className="text-gray-700" />
            }
          />
          <CommonButton
            label="Save As PDF"
            className={"border bg-white"}
            icon={
              <SaveAltOutlinedIcon fontSize="small" className="text-gray-700" />
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-3 bg-white border rounded-xl p-3">
        <div className="col-span-3 border-r">
          <div className="grid grid-cols-4 gap-3">
            <div>
              <div className="text-black font-semibold">Placed By</div>
              <div className="text-xs">{moreInfo?.placedBy}</div>
            </div>
            <div>
              <div className="text-black font-semibold">Requestor</div>
              <div className="text-xs">{moreInfo?.requestor}</div>
            </div>
            <div>
              <div className="text-black font-semibold">PO/External ID</div>
              <div className="text-xs">{moreInfo?.poExternalId}</div>
            </div>
            <div>
              <div className="text-black font-semibold">Requestor Email</div>
              <div className="text-xs">{moreInfo?.reqEmailId}</div>
            </div>
            <div>
              <div className="text-black font-semibold">Order Date</div>
              <div className="text-xs">{moreInfo?.orderDate}</div>
            </div>
            <div>
              <div className="text-black font-semibold">Expected Date</div>
              <div className="text-xs">{moreInfo?.expectedDate}</div>
            </div>
            <div>
              <div className="text-black font-semibold">Completion Date</div>
              <div className="text-xs">{moreInfo?.completionDate}</div>
            </div>
            <div>
              <div className="text-black font-semibold">Service Level</div>
              <div className="text-xs">{moreInfo?.serviceLevel}</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-white shadow">
          {contactInfo ? (
            <div className="flex gap-3">
              <img
                src={contactInfo.profilePic}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-black font-semibold">
                  {contactInfo.Name}
                </span>
                <span className="bg-green-100 text-green-600">
                  {contactInfo.contactType}
                </span>
              </div>
            </div>
          ) : (
            <div>Loading contact info...</div>
          )}
          <hr className="my-3" />
          <div className="flex flex-col">
            {contactInfo ? (
              <>
                <div className="flex items-center text-sm mb-1">
                  <PhoneIcon fontSize="small" className="text-blue-600 mr-2" />
                  <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-center text-sm mb-1">
                  <EmailIcon fontSize="small" className="text-blue-600 mr-2" />
                  <span>{contactInfo.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <LocationOnIcon
                    fontSize="small"
                    className="text-blue-600 mr-2"
                  />
                  <span>{contactInfo.address}</span>
                </div>
              </>
            ) : (
              <div>Loading contact details...</div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <MoreDetailsTabs />
      </div>
    </>
  );
};

export default OrderDetails;
