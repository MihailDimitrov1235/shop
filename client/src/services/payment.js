import servicesHelper from ".";
import axios from "axios";

function checkout(id) {
    const url = `${servicesHelper.url}/checkout/${id}`;

    return axios.post(url, {}, {
        headers: servicesHelper.header(),
    });
}

const paymentService = {
    checkout
}

export default paymentService;