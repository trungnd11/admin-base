import axios from "axios";
import { authRefreshUrl, authUrl, roleUrl } from "./baseUrl";
import { ResponseDataModel } from "../model/responseModel/ResponseModel";
import { AuthModel, LoginResponseEim, LoginModel } from "../model/authorModel/LoginModel";

const AuthApi = {
  login(reqBody: LoginModel) {
    return axios.post<ResponseDataModel<AuthModel>>(authUrl, reqBody);
  },
  refreshToken(info: URLSearchParams) {
    return axios.post<ResponseDataModel<LoginResponseEim>>(authRefreshUrl, info);
  },
  getSiteMap(props: { appCode: string }) {
    return axios.get(`${roleUrl}/sitemaps-for-role-prl/${props.appCode}&ACCESS`, {
      params: null,
    });
  },
};

export default AuthApi;
