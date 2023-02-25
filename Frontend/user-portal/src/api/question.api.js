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