const axios = require("axios");
const BooksController = require("../BooksController");
const UserController = require("../UserController");
let userId;
let token;
describe("Book Store API Tests with Controller", () => {
    const ISBN = "9781449331818"; //9781593277574
    const testUser = {
        userName: `tester${Date.now()}`,
        password: "Password123!",
    };

    describe("User API Test in BookStore with Controller", () => {
        beforeAll(async () => {
            const userResponse = await UserController.createUser(testUser);
            userId = userResponse.data.userID;

            const tokenResponse = await UserController.generateToken(testUser);
            token = tokenResponse.data.token;
            UserController.setToken(token);

            expect(userResponse.status).toEqual(201);
            expect(tokenResponse.status).toEqual(200);
            expect(token).toBeString();
            expect(token).not.toBeEmpty();
        });
        afterAll(async () => {
            if (userId) {
                const deleteResponse = await axios.delete(`https://demoqa.com/Account/v1/User/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                expect(deleteResponse.status).toEqual(204);
            }
        });

        test("1. Check for invalid credentials [POST /GenerateToken]", async () => {
            const invalidUser = { ...testUser, password: "WrongPassword" };
            const response = await UserController.generateToken(invalidUser);
            expect(response.status).toEqual(200);
            expect(response.data.token).toBeNull();
            expect(response.data.result).toInclude("User authorization failed.");
        });

        test("2. Check Invalid token [GET /User/{userId}]", async () => {
            UserController.setToken("invalid-token-123");
            const response = await UserController.getUser(userId);
            expect(response.status).toEqual(401);
            expect(response.data.message).toInclude("User not authorized!");
            UserController.setToken(token);
        });

        test("3. Get user data & check ID [GET /User/{userId}]", async () => {
            const response = await UserController.getUser(userId);
            expect(response.status).toEqual(200);
            expect(response.data.userId).toEqual(userId);
            expect(response.data.username).toEqual(testUser.userName);
        });

        test("4. Get all books [GET /Bookstore/v1/Books]", async () => {
            const response = await BooksController.getAllBooks();
            expect(response.status).toEqual(200);
            expect(response.data).toBeObject();
            expect(response.data).toHaveProperty("books");
            expect(response.data.books).toBeArray();
            expect(response.data.books).toHaveLength(8);
            expect(response.data.books[0]).toContainKey(
                "isbn",
                "title",
                "subTitle",
                "author",
                "publish_date",
                "publisher",
                "pages",
                "description",
                "website"
            );
        });

        test("5. Get Existing Book by ISBN [GET /BookStore/v1/Book]", async () => {
            const response = await BooksController.getBookByISBN(ISBN);
            expect(response.status).toEqual(200);
            expect(response.data).toBeObject();
            expect(response.data.isbn).toEqual(ISBN);
            expect(response.data.title).toInclude("Learning JavaScript Design Patterns");
        });

        test("6. Get Non-existing Book by ISBN [GET /BookStore/v1/Book]", async () => {
            const nonExistentISBN = "1111111111111";
            const response = await BooksController.getBookByISBN(nonExistentISBN);
            expect(response.status).toEqual(400);
            expect(response.data.message).toInclude("ISBN supplied is not available in Books Collection!");
        });

        test('7. Adding Book to the collection [POST /Books]', async () => {
            const addResponse = await BooksController.addBookToCollection(userId, ISBN, token);
            expect(addResponse.status).toEqual(201);
            expect(addResponse.data.books[0].isbn).toEqual(ISBN);

            const userResponse = await UserController.getUser(userId);
            expect(userResponse.status).toEqual(200);
            expect(userResponse.data).toHaveProperty('books');
            expect(userResponse.data.books).toBeArray();

            const deleteResponse = await BooksController.deleteBookFromCollection(token, ISBN, userId);
            expect(deleteResponse.status).toEqual(204);
            expect(deleteResponse.data).toBeEmpty();
        });

        test('8. Trying to add a book that already exists [POST /Books]', async () => {
            await BooksController.addBookToCollection(userId, ISBN, token);
            const addResponse = await BooksController.addBookToCollection(userId, ISBN, token);
            expect(addResponse.status).toEqual(400);
            expect(addResponse.data.message).toInclude("ISBN already present in the User's Collection!");

            const deleteResponse = await BooksController.deleteBookFromCollection(token, ISBN, userId);
            expect(deleteResponse.status).toEqual(204);
            expect(deleteResponse.data).toBeEmpty();

            const userResponse = await UserController.getUser(userId);
            expect(userResponse.status).toEqual(200);
            expect(userResponse.data.books).toBeArray();
            expect(userResponse.data.books).toHaveLength(0);
        });

        test('9. Trying to add a book with not authorized user [POST /Books]', async () => {
            await BooksController.addBookToCollection(userId, ISBN);
            const addResponse = await BooksController.addBookToCollection(userId, ISBN);
            expect(addResponse.status).toEqual(401);
            expect(addResponse.data.message).toInclude("User not authorized!");
        });

        test('10. Delete a book from a collection [DELETE /DeleteBook]', async () => {
            const addResponse = await BooksController.addBookToCollection(userId, ISBN, token);
            expect(addResponse.status).toEqual(201);
            expect(addResponse.data.books).toHaveLength(1);

            const deleteResponse = await BooksController.deleteBookFromCollection(token, ISBN, userId);
            expect(deleteResponse.status).toEqual(204);
            expect(deleteResponse.data).toBeEmpty();

            const userResponse = await UserController.getUser(userId);
            expect(userResponse.status).toEqual(200);
            expect(userResponse.data).toHaveProperty('books');
        });

    });
});
