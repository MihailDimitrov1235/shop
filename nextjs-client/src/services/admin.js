import servicesHelper from ".";
import axios from "axios";

function getAdmins(pagination, filters, order) {
    let url = `${servicesHelper.url}/admins?page=${pagination.page}&total=${pagination.total}`;

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

function createAdmin(data) {
    const url = `${servicesHelper.url}/admins`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function editAdmin(data, id) {
    const url = `${servicesHelper.url}/admins/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteAdmins(selected) {
    const url = `${servicesHelper.url}/admins`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function getAdminById(id) {
    const url = `${servicesHelper.url}/admins/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    })
}

const adminService = {
    getAdmins,
    createAdmin,
    editAdmin,
    deleteAdmins,
    getAdminById
}

export default adminService;