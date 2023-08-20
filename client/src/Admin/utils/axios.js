import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default axios;