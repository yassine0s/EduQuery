import axios from "axios";

export const get_users = async () => {
    try {
        const data = await axios.get(`/users`);
        return data;
    } catch (e) {
        return e.response;
    }
}


export const get_user_login = async (body) => {
    try {
        const data = await axios.post(`/users/login`,body);
        return data;

    } catch (e) {
        return e.response;
    }
}

export const register = async (body) => {
    try {
        const data = await axios.post(`/users`,body);
        return data;
    } catch (e) {
        return e.response;
    }
}