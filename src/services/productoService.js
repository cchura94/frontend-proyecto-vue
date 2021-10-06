import axios from "axios"

let urlApi = "http://127.0.0.1:3000/api"

export const listar = async function(page, limit){
    return await axios.get(`${urlApi}/producto?page=${page}&limit=${limit}`)
}

export const guardar = async function(datos){
    return await axios.post(`${urlApi}/producto`, datos)
}

export const modificar = async function(id, datos){
    return await axios.put(`${urlApi}/producto/${id}`, datos)
}

export const eliminar = async function(id){
    return await axios.delete(`${urlApi}/producto/${id}`)
}
export const asignarProducto = async function(id, datos){
    return await axios.post(`${urlApi}/producto/${id}/asignar_producto`, datos)
}