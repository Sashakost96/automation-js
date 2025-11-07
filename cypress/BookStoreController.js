const axios = require('axios');

class BookStoreController{
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://bookstore.toolsqa.com',
            validateStatus: function() {
                return true;
            }
        })
    }
}

module.exports = BookStoreController;