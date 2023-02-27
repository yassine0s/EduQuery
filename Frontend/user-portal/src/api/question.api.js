import axios from "axios";

export const ask_question = async (body) => {
    try {
        const data = await axios.post(`/questions`,body);
        return data;
    } catch (e) {
        return e?.response;
    }
}

export const get_questions = async () => {
    try {
        const data = await axios.get(`/questions`);
        return data;
    } catch (e) {
        return e?.response;
    }
}


export const get_question = async (id) => {
    try {
        const data = await axios.get(`/questions/${id}`);
        return data;
    } catch (e) {
        return e?.response;
    }
}


export const important_question = async (qid) => {
    try {
        const data = await axios.put(`/questions/important/${qid}`);
        return data;
    } catch (e) {
        return e?.response;
    }
}

export const delete_question = async (id) => {
    try {
        const data = await axios.delete(`/questions/${id}`);
        return data;
    } catch (e) {
        return e?.response;
    }
}
