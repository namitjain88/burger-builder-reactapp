import axios from 'axios';
import * as appConfig from './app.config';

const instance = axios.create({
    baseURL: appConfig.FIREBASE_DB_BASE_URL
});

export default instance;