import jwt_decode from "jwt-decode";
import { getCookie } from "./cookie";
import { Authenticate } from "../enum/AuthorEnum";

export const getUsername = () => {
  const token = getCookie(Authenticate.AUTH);
  const decode: any = token && jwt_decode(token);
  return decode?.preferred_username || "";
};

export const getTransId = (token?: string) => {
  const decode: any = token && jwt_decode(token);
  return decode?.transaction_id ?? JSON.parse(decode.one_account)?.transaction_id;
};
