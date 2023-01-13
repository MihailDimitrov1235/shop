import servicesHelper from ".";
import axios from "axios";

function getProducts(pagination, filters, order, lang='bg') {
    let url = `${servicesHelper.url}/products?page=${pagination.page}&total=${pagination.total}&lang=${lang}`;

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

function createProduct(data) {
    const url = `${servicesHelper.url}/products`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function editProduct(data, id) {
    const url = `${servicesHelper.url}/products/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteProducts(selected) {
    const url = `${servicesHelper.url}/products`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function getProductById(id) {
    const url = `${servicesHelper.url}/products/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    })
}

const productService = {
    getProducts,
    createProduct,
    editProduct,
    deleteProducts,
    getProductById
}

export default productService;