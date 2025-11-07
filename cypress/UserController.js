const BookStoreController = require("./BookStoreController");
const axios = require('axios');

class UserController extends BookStoreController {
    #token = null;
    baseURL = 'https://bookstore.toolsqa.com';

    async createUser(userCredentials) {
        return axios.post(`${this.baseURL}/Account/v1/User`, userCredentials);
    }

    async generateToken(userCredentials) {
        return axios.post(`${this.baseURL}/Account/v1/GenerateToken`, userCredentials);
    }

    async getUser(userId) {
        return await this.axiosInstance.get(`${this.baseURL}/Account/v1/User/${userId}`, {
            headers: { 'Authorization': `Bearer ${this.#token}` }
        });
    }

    setToken(token) {
        this.#token = token;
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

module.exports = new UserController;