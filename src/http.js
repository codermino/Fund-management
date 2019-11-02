import axios from 'axios'
import { Loading, Message } from 'element-ui';
import router from './router'


let loading;
function startLoading() {
  loading=Loading.service({
    lock:true,
    text:'拼命加载中...',
    background:'rgba(0,0,0,0.7)'
  });
}

function endLoading() {
  loading.close();
}

//请求拦截
axios.interceptors.request.use(request=>{
  // 加载loading
  startLoading();

  if(localStorage.eleToken){
    // 设置统一的请求头
    request.headers.Authorization = localStorage.eleToken;
  }
  return request;

},err=>{
  return Promise.reject(error);
});


// 响应拦截
axios.interceptors.response.use(response=>{
  // 结束loading
  endLoading();
  return response;

},err=>{
  endLoading();
  // Message.error({
  //   message:err.response.data,
  //   showClose: true
  // });
  Message.error(err.response.data);

  // 获取错误状态码
  const {status}=err.response;
  if(status===401){
    Message.error("token失效，请重新登录!");
    // 清除token
    localStorage.removeItem('eleToken');
    // 跳转到login
    router.push('/login');
  }

  return Promise.reject(error);
});

export default axios;