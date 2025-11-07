const BookStoreController = require("./BookStoreController");
const UserController = require("./UserController");

class BooksController extends BookStoreController {
    
    async getAllBooks() {
        return await this.axiosInstance.get("/BookStore/v1/Books");
    }

    async getBookByISBN(ISBN) {
        return await this.axiosInstance.get(`/BookStore/v1/Book/?ISBN=${ISBN}`);
    }

    async addBookToCollection(userId, isbn, token) {
        const body = {
            userId: userId,
            collectionOfIsbns: [{ isbn: isbn }],
        };
        const tokenHeader = { headers: { Authorization: `Bearer ${token}` } };
        return await this.axiosInstance.post(
            "/BookStore/v1/Books",
            body,
            tokenHeader
        );
    }

    async deleteBookFromCollection(token, isbn, userId) {
        const body = {
            "isbn": isbn,
            "userId": userId,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: body,
        };
        return await this.axiosInstance.delete(`/BookStore/v1/Book`, config);
    }
}

module.exports = new BooksController();
