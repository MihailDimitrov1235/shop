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

const blogService = {
    getPosts,
}

export default blogService;