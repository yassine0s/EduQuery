import axios from "axios";

export const get_departments = async () => {
    try {
        const data = await axios.get(`/departments`);
        return data;
    } catch (e) {
        return e?.response?.data;
    }
}

export const get_department = async (id) => {
    try {
        const data = await axios.get(`/departments/${id}`);
        return data;
    } catch (e) {
        return e?.response?.data;
    }
}

export const modify_department = async (id,info) => {
    try {
        const data = await axios.put(`/departments/${id}`,info);
        return data;
    } catch (e) {
        return e?.response?.data;
    }
}
export const delete_department = async (id) => {
    try {
        const data = await axios.delete(`/departments/${id}`);
        console.log(data)
        return data;
    } catch (e) {
        return e?.response?.data;
    }
}