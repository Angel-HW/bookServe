import axios from 'axios' // 引入axios
import qs from 'qs' // 序列化字符串

// 请求超时时间
axios.defaults.timeout = 10000

const BaseUrl = 'http://3091m9d958.zicp.vip' // 靖伦
// const BaseUrl = 'http://2f991p6776.zicp.vip' // 体委

function headerUrl (url) {
  url = BaseUrl + url
  return url
}
// post请求头：告诉服务器请求体的格式为json
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// request 请求拦截器
axios.interceptors.request.use(
  request => {
    const token = JSON.parse(sessionStorage.getItem('key_token'))
    if (token) {
      request.headers.Authorization = token
    }
    return request
  },
  error => {
    return Promise.error(error)
  }
)

// response 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }
)
/**
 * get方法对应get请求
 * @param {String}url 请求地址
 * @param {Object}params携带参数
 * @returns {Promise}
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(headerUrl(url), {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法对应post请求
 * @param {String} url 请求地址
 * @param {Object} params 携带参数
 * @returns {Promise}
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    // console.log(headerUrl(url))
    axios.post(headerUrl(url), qs.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
