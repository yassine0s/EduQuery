import axios from "axios";

export const get_users = async () => {
    try {
        const data = await axios.get(`/users`);
        return data;
    } catch (e) {
        return e?.response?.data;
    }
}
export const get_user = async (id) => {
    try {
        const data = await axios.get(`/users/${id}`);
        return data;
    } catch (e) {
        return e?.response?.data;
    }
}
export const modify_user = async (id,info) => {
    try {
        const data = await axios.put(`/users/${id}`,info);
        return data;
    } catch (e) {
        return e?.response?.data;
    }
}
export const delete_user = async (id) => {
    try {
        const data = await axios.delete(`/users/${id}`);
        console.log(data)
        return data;
    } catch (e) {
        return e?.response?.data;
    }
}