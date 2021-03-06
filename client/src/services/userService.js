import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

export function getJwt() {
    return localStorage.getItem("token");
}

export function logout() {
    localStorage.removeItem("token");
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem("token");
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export async function getCurrentUserDetails(){
    return await http.get(`${apiUrl}/users/`);
}

export async function signin(email, password) {
    const { data } = await http.post(`${apiUrl}/signin`, { email, password });
    localStorage.setItem("token", data.token);
}

export async function updateUser(user){
    return await http.put(`${apiUrl}/users/edit`, user);
}

export async function createUserAndLogin(user){
    await http.post(`${apiUrl}/users`, user);
    const {email, password} = user;
    const { data } = await http.post(`${apiUrl}/signin`, { email, password });
    localStorage.setItem("token", data.token);
}

export async function deleteUser(){
    await http.delete(`${apiUrl}/users/delete`);
}

export async function addToFav(cardId){
    await http.put(`${apiUrl}/users/addToFav`, {cardId});
}

export async function removeFromFav(cardId){
    await http.delete(`${apiUrl}/users/removeFromFav`, { params: { cardId }});
}

export async function getFavorites(){
    return await http.get(`${apiUrl}/users/favorites`);
}


const exportedObject =  {
    signin,
    getCurrentUser,
    logout,
    getJwt,
    getCurrentUserDetails,
    updateUser,
    createUserAndLogin,
    deleteUser,
    addToFav,
    removeFromFav,
    getFavorites
}

export default exportedObject;