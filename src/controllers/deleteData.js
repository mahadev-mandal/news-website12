import axiosInstance from "../utils/axios";

const deleteData = async (apiPath) => {
    await axiosInstance.delete(apiPath)
        .then((res) => {
            console.log(res.data);
            return res.data
        }).catch((err) => {
            console.log(err.response.data);
            throw new Error(err)
        })

}
export default deleteData;