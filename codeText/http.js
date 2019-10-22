import axios from "axios";
import $url from "./url";
import $util from "./util";
import $store from "@/store/";

const TIMEOUT = 5000; //请求超时延迟


//新建一个axios实例  用该实例发起请求并设置拦截器，避免影响全局的axios
// var instance = axios.create();

// 添加请求拦截器 
axios.interceptors.request.use(config => {

  //默认开启loading
  if (!config.hideLoading) {
    // loading
  }
  
  return config
}, error => {
  
  //关闭loading
  return Promise.reject(error)

});

// 添加响应拦截器
axios.interceptors.response.use(response => {  

  // 响应成功关闭loading
  return response

}, error => {

  // 对响应错误做点什么
  return Promise.resolve(error);

});


/**
* 异步请求
* @param {String} method 请求方式
* @param {String} url 请求地址
* @param {Object} data 请求数据
*
* @returns {Promise}
*/

function request(method, url, params) {

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

async function get(url, data) {
  return await request("get", url, data);
}

async function post(url, data) {
  return await request("post", url, data);
}




export default {
  get,
  post,
  put,
  patch,
  del
};
