import { message as modelMsg } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import throttle from "lodash/throttle";

const CancelToken = axios.CancelToken;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "/api";
axios.defaults.timeout = 20000;
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
  // 'X-ST-Tenant-Name': '__DEFAULT_TENANT__',
  "Accept-Language": "zh_CN",
  Authorization: "",
};

const baseConfig = {
  OriginalRes: false, // 请求成功是否返回原始数据
  Loading: true, // 是否开启Loading
  showErr: true, // 是否弹窗显示错误
};

// 请求拦截器
axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const preFetchTime = Number(window.localStorage.getItem("lastFetch"));
    const currentTime: number = new Date().valueOf();

    // if (preFetchTime) {
    //   const durationObj = timeUtils.duration(preFetchTime, currentTime);
    //   if (
    //     durationObj?.hours > 0 &&
    //     (durationObj.minutes > 0 ||
    //       durationObj.seconds > 0 ||
    //       durationObj.milliseconds > 0)
    //   ) {
    //     const isAnnotator = window.location.href.indexOf("annotator") > -1;
    //     getDvaApp()._store.dispatch({
    //       type: "base/logTimeout",
    //       payload: {
    //         isAnnotator,
    //         callback: () => {
    //           window.localStorage.removeItem("lastFetch");
    //         },
    //       },
    //     });
    //   } else {
    //     window.localStorage.setItem("lastFetch", currentTime.toString());
    //   }
    // } else {
    //   window.localStorage.setItem("lastFetch", currentTime.toString());
    // }

    const sessionToken = `Bearer ${window.localStorage.getItem("token")}`;
    try {
      config.headers.Authorization = sessionToken;
    } catch (e) {
      console.error(`生成 UserToken 失败，sessionToken：${sessionToken}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 语言跟随 getLocale 为 undefined
// const langFollowing = throttle(() => setLang(getLocale()), 3000)
// 响应拦截器即异常处理
axios.interceptors.response.use(
  (response) => response,
  async (err) => {
    // if (err && err.response) {
    //   // 根据后台code 弹出错误提示
    //   if (err.response.data.code) {
    //     let errorMessage = "";
    //     if (i18n.t(err.response.data.code) === err.response.data.code) {
    //       errorMessage = "未知错误";
    //     } else {
    //       errorMessage = i18n.t(
    //         err.response.data.code,
    //         err.response?.data?.data
    //       );
    //     }
    //     errorMsg(errorMessage);
    //   } else {
    //     err.message = locales.formatMessage[`${err.response.status}`];
    //   }
    // } else {
    //   err.message = locales.formatMessage["noResponse"];
    // }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      data: err.response && err.response.data,
      message: (err.response && err.response.data.message) || err.message,
      status: err.response && err.response.status,
    });
  }
);

// NProgress.configure({ showSpinner: false })

/**
 *  是否开启 Loading
 */
// const showLoading = (Loading, open) => {
//   if (Loading) {
//     if (open) {
//       NProgress.start()
//     } else {
//       NProgress.done()
//     }
//   }
// }

/**
 *  接口成功执行
 */
const successMethod = (res, resolve, reject, Original) => {
  if (Original) {
    resolve(res);
  } else if (res.status === 200) {
    resolve(res.data);
  } else {
    reject(res.data);
  }
};

const logoutMsg = throttle(() => {
  // modelMsg.error(locales.formatMessage["http.loginExpired"]);
}, 1000);

const errorMsg = throttle((error) => {
  modelMsg.error(error);
}, 1000);

/**
 * 400 错误信息以 no permission 开头的，为权限错误
 * 401 全部错误都是token相关，直接返回登录页
 *  接口失败执行
 */
const errorMethod = (error, resolve, reject, showErr) => {
  const isAnnotator = window.location.href.indexOf("annotator") > -1;
  const routerConfig = { pathname: "/auth", query: {} };
  if (isAnnotator) {
    Object.assign(routerConfig, { query: { isAnnotator } });
  }
  // if (error.status === 401) {
  //   console.error(error.data.code, "error.data.code");
  //   Object.assign(routerConfig, {
  //     query: { ...routerConfig?.query, hCode: "401" },
  //   });
  //   history.replace(routerConfig);
  // } else if (error.status === 400) {
  //   if (error?.data?.message?.indexOf("no permission") > -1) {
  //     history.replace(routerConfig);
  //   }
  // }
  reject(error);
};

/**
 * axios 工厂
 *
 * @param url 接口地址
 * @param param 接口请求参数
 * @param extraConfig axios的原始配置对象，
 *
 * (
 *  url, //请求地址
 *  { //接口参数对象，(不使用params和data时会有默认方式，默认: get 和 delete 为 url 传参 / post，put 和 patch 为 body 传参)
 * 	  params: {}, //url参数
 * 	  data: {} //body参数
 *  },
 *  {
 * 	  onStart: () => {}，//api调用开始
 * 	  onEnd: () => {}, //api调用结束
 *    onLoading: (l) => {} //设置自定义loading状态
 * 	  onCancel: (c) => {}, //手动结束api调用的处理函数，结束：c()
 * 	  basic: {
 * 		  OriginalRes: false, //请求成功是否返回原始数据
 * 		  Loading: true, //是否开启Loading
 * 		  showErr: true, //是否弹窗显示错误
 * 	  },
 * 	  config: { //axios原始配置参数
 * 		  headers: {}, // 如：{'Content-Type': 'multipart/form-data'}
 * 		  timeout: 60000, //设置超时时间
 * 		  baseURL: '', //为当前接口单独指定baseURL (这里设置的时config文件中配置的key，不是实际的地址)
 * 	  }
 *  },
 *  method //请求类型
 * )
 */
const axiosFactory = (
  url: string,
  params: any = {},
  extraConfig: any = { basic: {}, config: {} },
  method: string
) => {
  const bConfig = { ...baseConfig, ...extraConfig.basic };

  // showLoading(bConfig.Loading, true)

  extraConfig.onStart && extraConfig.onStart();
  extraConfig.onLoading && extraConfig.onLoading(1);

  // 设置参数方式, 默认：get和delete为url传参；post，put和patch为body传参
  let newParams = params;
  // eslint-disable-next-line no-prototype-builtins
  if (!params.hasOwnProperty("params") && !params.hasOwnProperty("data")) {
    if (method === "get" || method === "delete") {
      newParams = { params };
    } else {
      newParams = { data: params };
    }
  }

  const config = {
    method,
    url,
    cancelToken: new CancelToken((c) => {
      extraConfig.onCancel && extraConfig.onCancel(c);
    }),
    ...newParams,
    ...extraConfig.config,
  };

  // 将baseURL换成config文件中实际配置的值
  // if (config.baseURL) {
  //   config.baseURL = serviceUrl[config.baseURL];
  // }

  return new Promise((resolve, reject) => {
    axios(config)
      .then((res) => successMethod(res, resolve, reject, bConfig.OriginalRes))
      .catch((error) => errorMethod(error, resolve, reject, bConfig.showErr))
      .finally(() => {
        // showLoading(bConfig.Loading, false)
        extraConfig.onEnd && extraConfig.onEnd();
        extraConfig.onLoading && extraConfig.onLoading(0);
      });
  });
};

export default {
  get: (u: string, p?: any, e?: any) => axiosFactory(u, p, e, "get"),
  post: (u: string, p?: any, e?: any) => axiosFactory(u, p, e, "post"),
  put: (u: string, p?: any, e?: any) => axiosFactory(u, p, e, "put"),
  delete: (u: string, p?: any, e?: any) => axiosFactory(u, p, e, "delete"),
  patch: (u: string, p?: any, e?: any) => axiosFactory(u, p, e, "patch"),
  axios,
};
