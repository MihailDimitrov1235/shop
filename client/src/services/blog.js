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

const blogService = {
    getPosts,
    createPost,
    deletePosts
}

export default blogService;