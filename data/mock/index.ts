import { AxiosRequestConfig } from "axios";
import mocker from "../../net/mocker";
import AuthMock from "@app/data/mock/AuthMock";
import UserMock from "@app/data/mock/UserMock";
import { ListResponseBody } from "@app/net/types";
import I18N from "@app/helpers/I18N";
import {
  extractBodyHeader,
  extractListRequestOptionHeader,
} from "@app/net/helpers";
import ConfigMock from "./ConfigMock";

const delay = 2000;
export const addMockData = () => {
  mocker.addMock("authentication", {
    data: AuthMock.authResponse,
    timeout: delay,
    method: "post",
  });
  mocker.addMock("authentication/verifyOTP", {
    data: AuthMock.verifyResponse,
    timeout: delay,
    method: "post",
  });
  mocker.addMock("authentication/resendOTP", {
    data: {},
    timeout: delay,
    method: "post",
  });
 
  mocker.addMock("user", {
    data: UserMock.userResponse,
    timeout: delay,
    method: "put",
  });

  mocker.addMock("user", {
    data: UserMock.userResponse,
    timeout: delay,
    method: "get",
  });


  mocker.addMock("appVersion", {
    data: ConfigMock.appVersion,
    timeout: delay,
    method: "get",
  });

};
