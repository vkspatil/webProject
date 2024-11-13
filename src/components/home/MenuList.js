import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import DescriptionIcon from "@mui/icons-material/Description";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { getDrawerMenus } from "../../services/layoutApiConfig/LayoutApiConfig";

const MenuView = ({ node, collapsed }) => {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === node.route;

  const handleToggle = () => {
    if (node.children && node.children.length > 0) {
      setIsOpenMenu(!isOpenMenu);
    } else {
      navigate(node.route, { state: { menuId: node.menu_id } });
    }
  };

  const isDescendantActive = (childNode) =>
    location.pathname === childNode.route ||
    (childNode.children && childNode.children.some(isDescendantActive));

  const getIcon = (menuName) => {
    switch (menuName.toLowerCase()) {
      case "settings":
        return <SettingsIcon sx={{ color: "gray" }} />;
      case "support":
        return <SupportIcon sx={{ color: "gray" }} />;
      case "business":
        return <BusinessIcon sx={{ color: "gray" }} />;
      case "work":
        return <WorkIcon sx={{ color: "gray" }} />;
      case "employees":
        return <EmojiPeopleIcon sx={{ color: "gray" }} />;
      case "childcare":
        return <ChildCareIcon sx={{ color: "gray" }} />;
      case "orders":
        return <DescriptionIcon sx={{ color: "gray" }} />;
      default:
        return <PersonIcon sx={{ color: "gray" }} />;
    }
  };

  return (
    <div className={`relative transition-all duration-300 px-2`}>
      <div
        className={`flex flex-col items-center justify-center rounded-md cursor-pointer transform transition-transform hover:bg-gray-200 p-7 ${
          isActive
            ? "bg-blue-100"
            : isDescendantActive(node)
            ? "bg-gray-100"
            : "bg-white"
        }`}
        onClick={handleToggle}
      >
        <div className="flex items-center justify-center text-2xl">
          {getIcon(node.menu_name)}
        </div>
        <div
          className={`text-sm font-medium ${
            isActive ? "text-blue-800" : "text-gray-700"
          }`}
        >
          {node.menu_name}
        </div>
      </div>

      {isOpenMenu && node.children && (
        <div className="pl-4 mt-2">
          {node.children.map((child) => (
            <MenuView key={child.menu_id} node={child} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  );
};

const MenuList = ({ collapsed, staticArray = [] }) => {
  const [dashboardMenus, setDashboardMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dashboardMenus.length === 0) {
      getDrawerMenus()
        .then((response) => response.data)
        .then((res) => {
          setDashboardMenus(res.result);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [dashboardMenus]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="px-4 mt-2">
            <Skeleton variant="rectangular" width={80} height={80} />
            <Skeleton width={80} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {dashboardMenus.length > 0
        ? dashboardMenus.map((node) => (
            <MenuView key={node.menuid} node={node} collapsed={collapsed} />
          ))
        : !collapsed && (
            <div className="flex justify-center items-center text-gray-700 font-normal">
              No Menus Found...
            </div>
          )}
    </div>
  );
};

export default MenuList;
