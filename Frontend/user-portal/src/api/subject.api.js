import axios from "axios";

export const get_dep_subjects = async (did) => {
    try {
        const data = await axios.get(`/subjects/depsubjects/${did}`);
        return data;
    } catch (e) {
        return e.response;
    }
}