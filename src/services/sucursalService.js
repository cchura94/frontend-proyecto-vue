import axios from "axios"

let urlApi = "http://127.0.0.1:3000/api"

export const listar = async function(){
    return await axios.get(`${urlApi}/sucursal`)
}

export const guardar = async function(datos){
    return await axios.post(`${urlApi}/sucursal`, datos)
}

export const modificar = async function(id, datos){
    return await axios.put(`${urlApi}/sucursal/${id}`, datos)
}

export const eliminar = async function(id){
    return await axios.delete(`${urlApi}/sucursal/${id}`)
}