import { AxiosRequestConfig } from "axios";
import { ListRequestOption } from "./types";

import constants from "@app/constants";
import { decodeBase64, encodeBase64 } from "@app/helpers/GeneralHelpers";

export const objectToQueryString = (a: any): string => {
  var prefix: any, s: any, add: any, name: string, r20: any, output: string;
  s = [];
  r20 = /%20/g;
  add = function (key: string, value: any) {
    // If value is a function, invoke it and return its value
    value = typeof value == "function" ? value() : value == null ? "" : value;
    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
  };
  if (a instanceof Array) {
    for (name in a) {
      add(name, a[name]);
    }
  } else {
    for (prefix in a) {
      buildParams(prefix, a[prefix], add);
    }
  }
  output = s.join("&").replace(r20, "+");
  return output;
};
const buildParams = (prefix: any, obj: any, add: any) => {
  var name, i, l, rbracket;
  rbracket = /\[\]$/;
  if (obj instanceof Array) {
    for (i = 0, l = obj.length; i < l; i++) {
      if (rbracket.test(prefix)) {
        add(prefix, obj[i]);
      } else {
        buildParams(
          prefix + "[" + (typeof obj[i] === "object" ? i : "") + "]",
          obj[i],
          add
        );
      }
    }
  } else if (typeof obj == "object") {
    // Serialize object item.
    for (name in obj) {
      buildParams(prefix + "[" + name + "]", obj[name], add);
    }
  } else {
    // Serialize scalar item.
    add(prefix, obj);
  }
};

export const generateListRequestOptionHeader = (options: ListRequestOption) => {
  const json = JSON.stringify(options);
  var base64 = encodeBase64(json)
  return {
    [constants.HEADER_LIST_GRID_OPTION_KEY]: base64,
  };
};

export const extractListRequestOptionHeader = (request: AxiosRequestConfig) => {
  if (request.headers?.hasOwnProperty(constants.HEADER_LIST_GRID_OPTION_KEY)) {
    const options = request.headers[constants.HEADER_LIST_GRID_OPTION_KEY];
    const json = decodeBase64(options)
    const res: ListRequestOption | undefined = JSON.parse(json);
    return res;
  }

  return undefined;
};

export const generateBodyHeader = (body: Object) => {
  const json = JSON.stringify(body);
  var base64 = encodeBase64(json)

  return {
    [constants.HEADER_BODY_KEY]: base64,
  };
};

export const extractBodyHeader = (request: AxiosRequestConfig) => {
  if (request.headers?.hasOwnProperty(constants.HEADER_BODY_KEY)) {
    const options = request.headers[constants.HEADER_BODY_KEY];
    const json = decodeBase64(options);
    const res = JSON.parse(json);
    return res;
  }

  return undefined;
};
