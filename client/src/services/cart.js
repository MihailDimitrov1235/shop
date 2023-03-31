import servicesHelper from ".";
import axios from "axios";

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
    addProduct,
    removeProduct
}

export default cartService;