import apiInstance from "../../http_config";

export const loginUser = (loginObj) => {
  console.log("service page listing admissionlist obj data", loginObj);
  return apiInstance.post(`/user/loginUser`, loginObj);
};

export const getBatchesFromloginName = (loginName) => {
  return apiInstance.get(`/user/getUserBranch/${loginName}`, {
    // headers: authHeader(),
  });
};
