import servicesHelper from ".";
import axios from "axios";

function getComments( id, pagination, filters, order, lang='bg') {
    let url = `${servicesHelper.url}/comments/${id}?page=${pagination.page}&total=${pagination.total}&lang=${lang}`;

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

function createComment(data) {
    const url = `${servicesHelper.url}/comments`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function editComment(data, id) {
    const url = `${servicesHelper.url}/comments/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteComment(id) {
    const url = `${servicesHelper.url}/comments`;

    return axios.delete(url, {
        data: { id: id },
        headers: servicesHelper.header()
    });
}

function like(data) {
    const url = `${servicesHelper.url}/comments/like`;

    return axios.patch(url, data, {
        headers: servicesHelper.header()
    });
}

function dislike(data) {
    const url = `${servicesHelper.url}/comments/dislike`;

    return axios.patch(url, data, {
        headers: servicesHelper.header()
    });
}

function clearLike(data) {
    const url = `${servicesHelper.url}/comments/clear`;

    return axios.delete(url,{
        data:data,
        headers: servicesHelper.header()
    });
}

const commentService = {
    getComments,
    createComment,
    editComment,
    deleteComment,
    like,
    dislike,
    clearLike
}

export default commentService;