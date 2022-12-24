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

const userService = {
    login,
    profile
}

export default userService;