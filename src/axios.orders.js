import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-reactapp-d148a.firebaseio.com'
});

export default instance;