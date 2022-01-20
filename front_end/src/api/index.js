import axios from 'axios';

class API {
  constructor() {
    this.axios = this.createInstance();
  }

  setInterCeptors() {
    //요청 인터셉터
    this.axios.interceptors.request.use(
      function(config) {
        console.log('interceptors.request config', config);
        // 요청 성공 직전 호출됩니다.
        // axios 설정값을 넣는다 보통 인증정보 적용
        return config;
      },
      function(error) {
        // 요청 에러 직전 호출됩니다.
        return Promise.reject(error);
      }
    );

    //응답 인터셉터
    this.axios.interceptors.response.use(
      function(response) {
        console.log('interceptors.response config', response);
        /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다. 
        .then() 으로 이어집니다.
    */
        return response;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
  }

  createInstance() {
    return axios.create({
      baseURL: process.env.VUE_APP_API_URL
    });
  }
}
export default API;
