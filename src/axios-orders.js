import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-5c00d.firebaseio.com/"
});

export default instance;
