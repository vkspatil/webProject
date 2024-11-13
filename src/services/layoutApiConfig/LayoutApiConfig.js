import authToken from "../../auth/Auth_Token";
import apiInstance from "../../http_config";

export const getDrawerMenus = () => {
  return apiInstance.get(`/dashboard/getDrawerMenu`, {
    headers: authToken(),
  });
};
