import axios from 'axios';

export const login = (values) => {
    return axios.post("http://localhost:3000/api/v1/signin", values);
}

export const create = (values, token) => {
    return axios.post("http://localhost:3000/api/v1/stories", values, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getUserStories = (token) => {
    return axios.get("http://localhost:3000/api/v1/stories", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}


export const sortData = (data, criteria) => {

    const complexityOrders = {
        low: 0,
        mid: 1,
        high: 2
    }

    if (criteria === 'IDIO') {
        data.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        })
    }
    if (criteria === 'IDDO') {
        data.sort((a, b) => {
            if (a.id < b.id) {
                return 1;
            }
            if (a.id > b.id) {
                return -1;
            }
            return 0;
        })
    }

    if (criteria === 'CLTH') {
        data.sort((a, b) => {
            if (complexityOrders[a.complexity] > complexityOrders[b.complexity]) {
                return 1;
            }
            if (complexityOrders[a.complexity] < complexityOrders[b.complexity]) {
                return -1;
            }
            return 0;
        })
    }

    if (criteria === 'CHTL') {
        data.sort((a, b) => {
            if (complexityOrders[a.complexity] < complexityOrders[b.complexity]) {
                return 1;
            }
            if (complexityOrders[a.complexity] > complexityOrders[b.complexity]) {
                return -1;
            }
            return 0;
        })
    }
    return data;
}