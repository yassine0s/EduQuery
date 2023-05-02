import axios from "axios";

export const get_subjects = async () => {
    try {
        const data = await axios.get(`/subjects`);
        return data;
    } catch (e) {
        return e.response;
    }
}

export const get_subject = async (id) => {
    try {
        const data = await axios.get(`/subjects/${id}`);
        return data;
    } catch (e) {
        return e.response;
    }
}

export const get_dep_subjects = async (did) => {
    try {
        const data = await axios.get(`/subjects/depsubjects/${did}`);
        return data;
    } catch (e) {
        return e.response;
    }
}
export const modify_subject = async (id,info) => {
    try {
        const data = await axios.put(`/subjects/${id}`,info);
        return data;
    } catch (e) {
        return e.response;
    }
}
export const delete_subject = async (id) => {
    try {
        const data = await axios.delete(`/subjects/${id}`);
        console.log(data)
        return data;
    } catch (e) {
        return e.response;
    }
}
export const add_subject = async (body) => {
    try {
        const data = await axios.post(`/subjects`,body);
        console.log(data)
        return data;
    } catch (e) {
        return e.response;
    }
}