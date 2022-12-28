import servicesHelper from ".";
import axios from "axios";

function getUsers(data) {
    const url = `${servicesHelper.url}/users`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function login(data) {
    const url = `${servicesHelper.url}/users/login`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function register(data) {
    const url = `${servicesHelper.url}/users/register`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function profile() {
    const url = `${servicesHelper.url}/users/profile`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function logout() {
    const url = `${servicesHelper.url}/users/logout`;

    return axios.post(url, {}, {
        headers: servicesHelper.header()
    });
}

const userService = {
    getUsers,
    login,
    register,
    profile,
    logout
}

export default userService;