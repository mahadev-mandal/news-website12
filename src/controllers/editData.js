import axiosInstance from "../utils/axios";

const editData = async (apiPath, data) => {
    await axiosInstance.put(apiPath, data)
        .then((res) => {
            console.log(res.data);
            return res.data
        }).catch((err) => {
            console.log(err.response.data);
            throw new Error(err)
        })
}
export default editData;