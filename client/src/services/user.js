import servicesHelper from ".";
import axios from "axios";

function login(data) {
    const url = `${servicesHelper.url}/users/login`;

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
    login,
    profile,
    logout
}

export default userService;