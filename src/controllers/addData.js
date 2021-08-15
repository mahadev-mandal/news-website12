import axiosInstance from "../utils/axios"

const addData = async (apiPath, data) => {
    await axiosInstance.post(apiPath, data)
        .then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err.response.data);
            throw new Error(err);
        })
}
export default addData;