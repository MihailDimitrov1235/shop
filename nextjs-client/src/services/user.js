import servicesHelper from ".";
import axios from "axios";

function getUsers(pagination, filters, order) {
    let url = `${servicesHelper.url}/users?page=${pagination.page}&total=${pagination.total}`;

    if(filters.length > 0) {
        filters.forEach((filter) => {
            url += `&${filter.label}=${filter.value}`
        })
    }

    if(order.field && order.direction) {
        url += `&field=${order.field}&direction=${order.direction}`;
    }
 
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
    console.log(process.env.REACT_APP_API_ENDPOINT)
    console.log(servicesHelper.url)
    

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

function createUser(data) {
    const url = `${servicesHelper.url}/users`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function editUser(data, id) {
    const url = `${servicesHelper.url}/users/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteUsers(selected) {
    const url = `${servicesHelper.url}/users`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function getUserById(id) {
    const url = `${servicesHelper.url}/users/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    })
}

const userService = {
    getUsers,
    login,
    register,
    profile,
    logout,
    createUser,
    editUser,
    deleteUsers,
    getUserById
}

export default userService;