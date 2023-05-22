import servicesHelper from ".";
import axios from "axios";

function getPosts(pagination, filters, order, lang='bg') {
    let url = `${servicesHelper.url}/posts?page=${pagination.page}&total=${pagination.total}&lang=${lang}`;

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

function createPost(data) {
    const url = `${servicesHelper.url}/posts`;

    return axios.post(url, data, {
        headers: {
            ...servicesHelper.header(),
            'Content-Type': 'multipart/form-data',
        }
    });
}

function deletePosts(selected) {
    const url = `${servicesHelper.url}/posts`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function getRequests(pagination, filters, order, lang='bg') {
    let url = `${servicesHelper.url}/posts/requests?page=${pagination.page}&total=${pagination.total}&lang=${lang}`;

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

function approvePosts(selected) {
    const url = `${servicesHelper.url}/posts`;

    return axios.put(url, {
        selected: selected,
        headers: servicesHelper.header()
    });
}

function getBySlug(slug, lang='bg') {
    const url = `${servicesHelper.url}/posts/${slug}?lang=${lang}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const blogService = {
    getPosts,
    getRequests,
    createPost,
    deletePosts,
    approvePosts,
    getBySlug
}

export default blogService;