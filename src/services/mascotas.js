import axios from 'axios';

const baseURL="https://sistema-adopcion-mascotas-a7rh.onrender.com/pets";

export const listar = async () => {
    const res = await axios.get(`${baseURL}`);

    return res.data;
}
export const adoptar = async (token,userId,petId) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const body = {
        usuarioId: userId
    }
    const { data } = await axios.post(`${baseURL}/${petId}/adoptar`, body, config)
    return data;
}
export const update = async (token,petId,formData) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    }
    const { data } = await axios.put(`${baseURL}/${petId}`, formData, config);
    return data;

}
export const create = async (formData) => {
    try {
        const res = await axios.post(`${baseURL}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return res.data;

    } catch(e) {
        console.error("Error creando mascota", e);
        throw e;
    }
}
export const deletePet = async (token,petId) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${baseURL}/${petId}`, config);
    return res.data;
}