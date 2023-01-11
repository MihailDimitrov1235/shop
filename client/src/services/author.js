import servicesHelper from ".";
import axios from "axios";

function getAuthors(pagination, filters, order) {
    let url = `${servicesHelper.url}/authors?page=${pagination.page}&total=${pagination.total}`;

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

function createAuthor(data) {
    const url = `${servicesHelper.url}/authors`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function editAuthor(data, id) {
    const url = `${servicesHelper.url}/authors/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteAuthors(selected) {
    const url = `${servicesHelper.url}/authors`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function getAuthorById(id) {
    const url = `${servicesHelper.url}/authors/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    })
}

const adminService = {
    getAuthors,
    createAuthor,
    editAuthor,
    deleteAuthors,
    getAuthorById
}

export default adminService;