/*
 * @Author: .Soul
 * @Date: 2020-12-23 12:34:19
 * @Last Modified by: .Soul
 * @Last Modified time: 2021-07-Mo 09:55:39
 */
import axios from 'axios';
// import qs from 'qs';
import { useMessage } from '@/hooks/useMessage';
// import API from '@/api/API';
const API_WHITE_LIST = [];
const RESPONSE_API_WHITE_LIST = [];
const ERROR_MESSAGE_API_WHITE_LIST = [];
// 判断生产环境
const isProduction = import.meta.env.MODE === 'production';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { getBaseUrl } from '@/util/index';

// let isShow = true;
// let loadingCount = 0;

const { useErrorMessage } = useMessage();

// 是否刷新token
let isRefreshingToken = true;
// 请求队列
let requestQueue = [];

// 创建axios实例
const instance = axios.create({
  baseURL: getBaseUrl(),
  // 超时时间
  timeout: 20 * 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (!isProduction) {
      const url = config.url;
    }
    // 在这里做认证，可以从store里面获取token
    if (!API_WHITE_LIST.includes(config.url)) {
      const userStore = useUserStore();
      const { token } = storeToRefs(userStore);
      config.headers['Authorization'] = token.value;
    }
    // 如果get  请求有缓存，可以加这段代码
    if (config.method === 'get' && !API_WHITE_LIST.includes(config.url)) {
      const now = `${Date.now()}`;
      if (config.params) {
        config.params[now] = now;
      } else {
        const hasParams = config.url.includes('?');
        config.url = config.url + (hasParams ? '&' : '?') + `${now}=${now}`;
      }
    }
    return config;
  },
  (error) => {
    //对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器，对返回数据进行预处理
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 提示登录过期
const againLogin = () => {
  //   if (isShow) {
  //     isShow = false;
  //     ElMessageBox.confirm('您的登录已过期，请重新登录?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       showCancelButton: false,
  //       showClose: false,
  //       closeOnClickModal: false,
  //       type: 'error'
  //     })
  //       .then(() => {
  //         store.dispatch('user/LogOut').then(() => {
  //           router.replace('/login');
  //         });
  //       })
  //       .catch(() => {})
  //       .finally(() => {
  //         isShow = true;
  //       });
  //   }
};

/**
 * 对 请求进行封装 只有 status 与 code 都是200 才会进入 then , 否则均进入 catch
 * @param {*} options
 */
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(({ data, status, statusText }) => {
        if (status == 200) {
          if (RESPONSE_API_WHITE_LIST.includes(options.url)) {
            resolve([null, data]);
          } else {
            if (data.success) {
              resolve([null, data]);
            } else {
              if (!ERROR_MESSAGE_API_WHITE_LIST.includes(options.url)) {
                useErrorMessage({
                  message: data.message || '请求失败',
                  theme: 'error',
                  duration: 5 * 1000
                });
              }
              resolve([data, null]);
            }
          }
        } else if (status == 401) {
          // 无感刷新Token
          if (isRefreshingToken) {
            requestQueue.push(() => {
              request(options)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
            });
            isRefreshingToken = false;
            // let modal = Modal.info({
            //   title: '您已长时间未操作，请滑动验证',
            //   width: 400,
            //   centered: true,
            //   keyboard: false,
            //   class: 'c-drag-verify-modal',
            //   autoFocusButton: null,
            //   okText: '取消',
            //   okType: 'default',
            //   zIndex: 999999,
            //   onOk: () => {
            //     isRefreshingToken = true;
            //     modal.destroy();
            //     againLogin();
            //   },
            //   content: () => {
            //     const isPassing = ref(false);
            //     return createVNode(
            //       CDragVerify,
            //       {
            //         isPassing: isPassing.value,
            //         width: 300,
            //         text: '请按住滑块拖动',
            //         successText: '验证通过',
            //         handlerIcon: 'el-icon-d-arrow-right',
            //         successIcon: 'el-icon-circle-check',
            //         handlerBg: '#409EFF',
            //         'onUpdate:isPassing': (value) => {
            //           isPassing.value = value;
            //         },
            //         onPassCallback: () => {
            //           modal.destroy();
            //           instance
            //             .request({
            //               url: API.refreshToken,
            //               method: 'post',
            //               data: qs.stringify({
            //                 refresh_token: store.getters.refreshToken,
            //                 ...store.getters.auth,
            //                 grant_type: 'refresh_token'
            //               }),
            //               headers: {
            //                 'Content-Type': 'application/x-www-form-urlencoded'
            //               }
            //             })
            //             .then((res) => {
            //               if (res.status == 200 && res.data.success) {
            //                 requestQueue.forEach((run) => run());
            //                 requestQueue = [];
            //               } else {
            //                 againLogin();
            //               }
            //             })
            //             .catch((err) => {
            //               // 这种情况一般调到登录页
            //               againLogin();
            //             })
            //             .finally(() => {
            //               isRefreshingToken = true;
            //             });
            //         }
            //       },
            //       {
            //         textBefore: () => {
            //           if (!isPassing.value) {
            //             return h('i', { class: ['el-icon-lock'] });
            //           } else {
            //             return null;
            //           }
            //         }
            //       }
            //     );
            //   }
            // });
          } else {
            // 刷新Token失败
            requestQueue.push(() => {
              request(options)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
            });
          }
        } else {
          reject(statusText);
        }
      })
      .catch((error) => {
        if (!error) {
          reject(error);
          return;
        }
        const err = error.toString();
        if (err.includes('Network Error')) {
          useErrorMessage({
            message: '网络异常，请检查网络设置',
            theme: 'error',
            duration: 5 * 1000
          });
          resolve([error, null]);
          return;
        }
        const { code, message, response } = error || {};
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
          useErrorMessage({
            message: '网络请求超时',
            theme: 'error',
            duration: 5 * 1000
          });
          resolve([error, null]);
          return;
        }
        if (!response) {
          useErrorMessage({
            message: '未知错误',
            theme: 'error',
            duration: 5 * 1000
          });
          resolve([error, null]);
          return;
        } else {
          const { status, data = {} } = response || {};

          switch (status) {
            case 400:
              useErrorMessage({
                message: data.message || '请求参数错误',
                theme: 'error',
                duration: 5 * 1000
              });
              resolve([data, null]);
              break;
            case 401:
              // 无感刷新Token
              if (isRefreshingToken) {
                requestQueue.push(() => {
                  request(options)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
                });
                isRefreshingToken = false;
                // let modal = Modal.info({
                //   title: '您已长时间未操作，请滑动验证',
                //   width: 400,
                //   centered: true,
                //   keyboard: false,
                //   class: 'c-drag-verify-modal',
                //   autoFocusButton: null,
                //   okText: '取消',
                //   okType: 'default',
                //   zIndex: 999999,
                //   onOk: () => {
                //     isRefreshingToken = true;
                //     modal.destroy();
                //     againLogin();
                //   },
                //   content: () => {
                //     const isPassing = ref(false);
                //     return createVNode(
                //       CDragVerify,
                //       {
                //         isPassing: isPassing.value,
                //         width: 300,
                //         text: '请按住滑块拖动',
                //         successText: '验证通过',
                //         handlerIcon: 'el-icon-d-arrow-right',
                //         successIcon: 'el-icon-circle-check',
                //         'onUpdate:isPassing': (value) => {
                //           isPassing.value = value;
                //         },
                //         handlerBg: '#409EFF',
                //         onPassCallback: () => {
                //           modal.destroy();
                //           instance
                //             .request({
                //               url: API.refreshToken,
                //               method: 'post',
                //               data: qs.stringify({
                //                 refresh_token: store.getters.refreshToken,
                //                 ...store.getters.auth,
                //                 grant_type: 'refresh_token'
                //               }),
                //               headers: {
                //                 'Content-Type': 'application/x-www-form-urlencoded'
                //               }
                //             })
                //             .then((res) => {
                //               if (res.status == 200 && res.data.success) {
                //                 requestQueue.forEach((run) => run());
                //                 requestQueue = [];
                //               } else {
                //                 againLogin();
                //               }
                //             })
                //             .catch((err) => {
                //               // 这种情况一般调到登录页
                //               againLogin();
                //             })
                //             .finally(() => {
                //               isRefreshingToken = true;
                //             });
                //         }
                //       },
                //       {
                //         textBefore: () => {
                //           if (!isPassing.value) {
                //             return h('i', { class: ['el-icon-lock'] });
                //           } else {
                //             return null;
                //           }
                //         }
                //       }
                //     );
                //   }
                // });
              } else {
                // 刷新Token失败
                requestQueue.push(() => {
                  request(options)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
                });
              }
              break;
            case 403:
              useErrorMessage({
                message: data.message || '资源不可用',
                theme: 'error',
                duration: 5 * 1000
              });
              resolve([data, null]);
              break;
            case 404:
              useErrorMessage({
                message: data.message || '请求资源不存在',
                theme: 'error',
                duration: 5 * 1000
              });
              resolve([data, null]);
              break;
            case 500:
              useErrorMessage({
                message: data.message || '服务器发生错误',
                theme: 'error',
                duration: 5 * 1000
              });
              resolve([data, null]);
              break;
            case 503:
              useErrorMessage({
                message: data.message || '服务器目前无法使用',
                theme: 'error',
                duration: 5 * 1000
              });
              resolve([data, null]);
              break;
            default:
              useErrorMessage({
                message: '未知错误',
                theme: 'error',
                duration: 5 * 1000
              });
              resolve([data, null]);
              break;
          }
        }
      });
  });
};

const get = (url, params = {}) => {
  return request({
    url,
    method: 'get',
    params
  });
};

const put = (url, data = {}) => {
  return request({
    url,
    method: 'put',
    data
  });
};

const post = (url, data = {}) => {
  return request({
    url,
    method: 'post',
    data
  });
};

const del = (url, data = {}) => {
  return request({
    url,
    method: 'delete',
    data
  });
};

// 将获取cancelToken的方法绑定到每个方法上面，方便调用的时候使用
[request, get, post, put, del, instance].forEach((item) => {
  item.getCancelToken = () => {
    return axios.CancelToken;
  };
});

/**
 * request 对请求进行二次包装，处理了异常编码
 * get
 * set
 * axios 对axios进行包装之后的原生实例
 */
export { request, get, post, put, del, instance as axios };
