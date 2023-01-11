import servicesHelper from ".";
import axios from "axios";

function getCategories(pagination, filters, order) {
    let url = `${servicesHelper.url}/categories?page=${pagination.page}&total=${pagination.total}`;

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

function createCategory(data) {
    const url = `${servicesHelper.url}/categories`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function editCategory(data, id) {
    const url = `${servicesHelper.url}/categories/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteCategories(selected) {
    const url = `${servicesHelper.url}/categories`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function getCategoryById(id) {
    const url = `${servicesHelper.url}/categories/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    })
}

function getAll() {
    const url = `${servicesHelper.url}/categories/all`;

    return axios.get(url, {
        headers: servicesHelper.header()
    })
}

const categoryService = {
    getCategories,
    createCategory,
    editCategory,
    deleteCategories,
    getCategoryById,
    getAll
}

export default categoryService;