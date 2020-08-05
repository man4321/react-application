import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-builder-eaad3.firebaseio.com/'
})


export default instance;