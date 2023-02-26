import axios from "axios";

export const get_answers = async (qid) => {
    try {
        const data = await axios.get(`/answers/${qid}`);
        return data;
    } catch (e) {
        return e?.response;
    }
}

export const add_answer = async (body) => {
    try {
        const data = await axios.post(`/answers`,body);
        return data;
    } catch (e) {
        return e?.response;
    }
}


