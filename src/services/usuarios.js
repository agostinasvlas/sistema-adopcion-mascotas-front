import axios from 'axios';

const baseURL="https://sistema-adopcion-mascotas-a7rh.onrender.com/users";

export const login = async (credentials) => {
    const { data } = await axios.post(`${baseURL}/login`, credentials);
    return data;
}

export const register = async (credentials) => {
    const { data } = await axios.post(`${baseURL}/register`, credentials);
    return data;
}

export const profile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.get(`${baseURL}/profile`, config);
    return data;
}

export const listarMisMascotas = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(`${baseURL}/${id}/mismascotas`, config);
    return data;
}