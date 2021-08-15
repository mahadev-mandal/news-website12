import axiosInstance from "../utils/axios";
import Cookies from "js-cookie";

const userLogin = async (apiPath, data) => {
    await axiosInstance.post(apiPath, data)
        .then((res) => {
                //set last or current token in cookies
                Cookies.set('jwt', res.data.tokens[res.data.tokens.length - 1].token);
        }).catch((err) => {
            console.log(err.response.data)
            throw new Error(err) 
        })
}
export default userLogin;