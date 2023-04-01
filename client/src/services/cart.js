import servicesHelper from ".";
import axios from "axios";

function getCart(userId, lang='bg') {
    const url = `${servicesHelper.url}/cart/${userId}?lang=${lang}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    })
}

function addProduct(data) {
    const url = `${servicesHelper.url}/cart/add`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    })
}

function removeProduct(id) {
    const url = `${servicesHelper.url}/cart/remove/${id}`;

    return axios.delete(url, {
        headers: servicesHelper.header()
    })
}

const cartService = {
    getCart,
    addProduct,
    removeProduct
}

export default cartService;