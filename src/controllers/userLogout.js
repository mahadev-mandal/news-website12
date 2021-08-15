import axiosInstance from "../utils/axios";
import Cookies from "js-cookie";

const userLogout = async (apiPath) => {
    if (Cookies.get('jwt')) {
        await axiosInstance.delete(apiPath)
            .then((res) => {
                Cookies.remove('jwt');
            }).catch((err) => {
                console.log(err)
                throw new Error(err)
            })
    }else{
        throw new Error("you have not logged in")
    }
}
export default userLogout;