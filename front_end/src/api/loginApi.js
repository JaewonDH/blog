import Api from './index';

class LogInApi extends Api {
  constructor() {
    super();
    //this.setInterCeptors()
  }

  login(formData) {
    return this.axios.post('/login', formData);
  }
}

export default LogInApi;
