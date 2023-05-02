import axios from "axios";

export const get_departments = async () => {
    try {
        const data = await axios.get(`/departments`);
        return data;
    } catch (e) {
        return e.response;
    }
}

export const get_department = async (id) => {
    try {
        const data = await axios.get(`/departments/${id}`);
        return data;
    } catch (e) {
        return e.response;
    }
}