import axiosInstance from '../utils/axios'

const fetchData = async (apiPath) => {
    const post = await axiosInstance.get(apiPath)
        .then((res) => {
            return (res.data)
        }).catch((err) => {
            console.log(err)
            throw new Error(err)
        })
    return post
}
export default fetchData;