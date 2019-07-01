import axios from "axios"
import $url from './url'
// import $public from './utils/public.js'


const TIMEOUT = 5000; //请求超时延迟


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
  params['_'] = Math.random();
  let ajaxUrl = $url.request[_url] || url

  let ajaxParams = {
    url: ajaxUrl,
    method: method,
    timeout: TIMEOUT,
    headers: {
      'access-token':$public.getStorage('USER_ACCESS_TOKEN'),
      'Content-Type': 'application/json',
    },
  }

  method == 'post' ? ajaxParams.data = params || {} : ajaxParams.params = params || {}

  return new Promise((resolve, reject) => {
    axios(ajaxParams).then(res => {
        resolve(res)
    }).catch(error => {
        reject(error)
    });
  })
}


async function get(url, data) {
  return await request("get", url, data);
}

async function post(url, data) {
  return await request("post", url, data);
}




export default {
  get, post
}