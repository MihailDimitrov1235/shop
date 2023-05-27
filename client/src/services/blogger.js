import servicesHelper from ".";
import axios from "axios";

function getById(id, lang='bg') {
    const url = `${servicesHelper.url}/bloggers/${id}?lang=${lang}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const bloggerService = {
    getById
}

export default bloggerService;