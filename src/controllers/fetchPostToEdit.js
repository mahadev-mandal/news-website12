import axiosInstance from "../utils/axios"

const fetchPostToEdit = async (path) => {
    const post = await axiosInstance.get(path)
        .then((res) => {
            return (res.data)
        }).catch((err) => {
            console.log(err);
            throw new Error(err);
        })
    return post
}
export default fetchPostToEdit;