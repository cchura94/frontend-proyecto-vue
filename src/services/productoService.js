import axios from "axios"

let urlApi = "http://127.0.0.1:3000/api"

export const listar = async function(){
    return await axios.get(`${urlApi}/producto`)
}

export const guardar = async function(datos){
    return await axios.post(`${urlApi}/producto`, datos)
}