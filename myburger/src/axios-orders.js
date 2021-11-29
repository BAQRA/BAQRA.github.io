import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger-r.firebaseio.com/'
})


export default instance;