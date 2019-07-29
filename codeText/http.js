import axios from "axios";
import $url from "./url";
import $util from "./util";
import $store from "@/store/";

const TIMEOUT = 5000; //请求超时延迟

//新建一个axios实例  用该实例发起请求并设置拦截器，避免影响全局的axios
var instance = axios.create();

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    //兼容不需要loading的请求 (参数内带hideLoading: true)
    let params = {};
    let copyConfig = $util.deepClone(config);
    switch (copyConfig.method) {
      case "get":
      case "del":
        params = copyConfig.params;
        break;
      case "put":
      case "post":
      case "patch":
        params = copyConfig.data;
        break;
      default:
        params = copyConfig.params;
        break;
    }

    //默认开启loading
    if (!params.hideLoading) {
      $store.commit("showLoading");
    }

    return config;
  },
  error => {
    $store.commit("hideLoading");
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    $store.commit("hideLoading");
    return response;
  },
  error => {
    $store.commit("hideLoading");
    return Promise.reject(error.response || {});
  }
);

/**
 * 异步请求
 * @param {String} method 请求方式
 * @param {String} url 请求地址
 * @param {Object} data 请求数据
 *
 * @returns {Promise}
 */

function request(method, url, _params) {
  //参数处理
  let params = _params || {};
  let ajaxUrl = $url[url] || url;
  params["_"] = Math.random();

  let ajaxParams = {
    url: ajaxUrl,
    method: method,
    timeout: TIMEOUT,
    headers: {
      Authorization: "Bearer" + " " + $util.getLocal("access_token"),
      "X-Requested-With": "XMLHttpRequest"
    }
  };

  switch(method) {
    case "get":
    case "del":
      ajaxParams.params = params;
      break;
    case "put":
    case "post":
    case "patch":
      ajaxParams.data = params
      break;
    default:
      ajaxParams.params = params;
      break;
  }

  return new Promise((resolve, reject) => {
    axios(ajaxParams)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error.data);
      });
  });
}

function get(url, data) {
  return request("get", url, data);
}

function post(url, data) {
  return request("post", url, data);
}

function put(url, data) {
  return request("put", url, data);
}

function patch(url, data) {
  return request("patch", url, data);
}

function del(url, data) {
  return request("delete", url, data);
}

export default {
  get,
  post,
  put,
  patch,
  del
};
