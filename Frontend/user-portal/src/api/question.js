import axios from "axios";

export const ask_question = async (body) => {
    try {
        const data = await axios.post(`/questions`,body);
        return data;
    } catch (e) {
        return e.response;
    }
}