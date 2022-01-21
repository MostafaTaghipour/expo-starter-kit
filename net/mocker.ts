import { AxiosResponse, AxiosRequestConfig } from "axios";

let mockingEnabled = false;

const defaultMethod = "get";
const mocks = {};

/**
 * addMock url and data
 *
 * @param {string} url
 * @param {*} data
 */
function addMock(url: string, data: any) {
  if (!data) {
    data = { method: defaultMethod };
  }
  if (!data.method) {
    data.method = defaultMethod;
  }

  var key = `${data.method}-${url.toLowerCase()}`;
  //@ts-ignore
  mocks[key] = data;
}

const getMockValue = (config: AxiosRequestConfig): any | undefined => {
  const url = config.url ? config.url.toLowerCase() : "";
  const method = config.method ? config.method.toLowerCase() : defaultMethod;

  for (var key in mocks) {
    const u = key.split("-")[1];
    if (url == u) {
      //@ts-ignore
      const value = mocks[key];

      if (value.method.toLowerCase() === method) return value;
    }
  }

  for (var key in mocks) {
    const u = key.split("-")[1];

    if (url.includes(u)) {
      //@ts-ignore
      const value = mocks[key];
      
      if (value.method.toLowerCase() === method) return value;
    }
  }


  return undefined;
};
/**
 * check if mock provided for this url
 *
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
const isUrlMocked = (config: AxiosRequestConfig) => {
  const value = getMockValue(config);

  return value != undefined;
};

/**
 * enable mocking possibility
 *
 */
const enableMocking = () => (mockingEnabled = true);

/**
 * disable mocking possibility
 *
 */
const disableMocking = () => (mockingEnabled = false);

const getMockError = (config: AxiosRequestConfig) => {
  const value = getMockValue(config);

  const mockError = new Error();
  //@ts-ignore
  mockError.mockData = value;
  //@ts-ignore
  mockError.config = config;
  return Promise.reject(mockError);
};

const isMockError = (error: any) => Boolean(error.mockData);

const getMockResponse = (mockError: any) => {
  const { mockData, config } = mockError;
  // Handle mocked error (any non-2xx status code)
  if (mockData.status && String(mockData.status)[0] !== "2") {
    const err = mockData.error || new Error("mock error");
    //@ts-ignore
    err.code = mockData.status;
    return Promise.reject(err);
  }

  const timeout = mockData.timeout || 0;
  // Handle mocked success
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);

      let data;

      if (mockData.data && typeof mockData.data === "function") {
        data = mockData.data(mockError.config);
      } else {
        data = mockData.data;
      }

      if (data instanceof Error) {
        return reject(data);
      }

      resolve(
        Object.assign(
          {
            data: {},
            status: 200,
            statusText: "OK",
            headers: {},
            config,
            isMock: true,
          },
          { ...mockData, data }
        )
      );
    }, timeout);
  });
};

const requestInterceptor = (config: AxiosRequestConfig) => {
  
  if (mockingEnabled && isUrlMocked(config)) {
    return getMockError(config);
  }
  return config;
};
const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

const errorInterceptor = (error: any) => {
  if (isMockError(error)) {
    return getMockResponse(error);
  }
  return Promise.reject(error);
};

export default {
  requestInterceptor,
  responseInterceptor,
  errorInterceptor,
  addMock,
  enableMocking,
  disableMocking,
};
