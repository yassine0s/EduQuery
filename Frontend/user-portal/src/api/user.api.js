import axios from "axios";

export const get_users = async () => {
    try {
        const data = await axios.get(`/users`);
        return data;
    } catch (e) {
        return e?.response?.data;
    }
}


export const get_user_login = async (body) => {
    try {
        const data = await axios.get(`/users/login`,{ params:body  });
        return data;

    } catch (e) {
        return e?.response?.data;
    }
}
