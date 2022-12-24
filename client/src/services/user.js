import servicesHelper from ".";
import axios from "axios";

function login(data) {
    const url = `${servicesHelper.url}/users/login`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

const userService = {
    login
}

export default userService;