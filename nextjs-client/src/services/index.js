const url = 'http://127.0.0.1:8000/api';

const token = () => {
    return localStorage.getItem('refresh-token');
}

const header = () => {
    return {
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_HEADER}`,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token()
    };
}

const servicesHelper = {
    url,
    token,
    header
}

export default servicesHelper;