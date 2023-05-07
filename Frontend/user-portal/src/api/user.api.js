import axios from "axios";

export const get_users = async () => {
    try {
        const data = await axios.get(`/users`);
        return data;
    } catch (e) {
        return e.response;
    }
}

export const get_user = async (id) => {
    try {
        const data = await axios.get(`/users/${id}`);
        return data;
    } catch (e) {
        return e.response;
    }
}


export const get_user_login = async (body) => {
    try {
        const data = await axios.post(`/users/login`,body);
        console.log(data)
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


export const reset = async (body) => {
    try {
      const data = await axios.post(`/users/reset`,{email:body});
      return data;
    } catch (e) {
        return e.response;
    }
  };

  export const changepass = async (body,token) => {
    try {
        const response = await axios({
            method: 'PUT',
            url: `/users/changepass`,
            headers: {
              Authorization: `Bearer ${token}`
            },
            data:
            {password:body}
          });
      return response;
    } catch (e) {
        return e.response;
    }
  };
