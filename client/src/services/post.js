import servicesHelper from ".";
import axios from "axios";

function getPosts(pagination, filters, order, lang='bg') {
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

    return axios.get(url, {
        headers: servicesHelper.header()
    })
}

function getPost(postId, lang='bg') {
    const url = `${servicesHelper.url}/post/${postId}?lang=${lang}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    })
}

function addPost(data) {
    const url = `${servicesHelper.url}/post`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    })
}

function removePost(postId) {
    const url = `${servicesHelper.url}/post/${postId}`;

    return axios.delete(url, {
        headers: servicesHelper.header()
    })
}

PostService = {
    getPost,
    addPost,
    removePost
}