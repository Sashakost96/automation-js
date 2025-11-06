const axios = require('axios');
const jsonData = require('../env.json');
const { randomPostId, randomUserId, getPutData, getNewPostData, newUser, patchData } = require('../testData');
const matchers = require('jest-extended');
expect.extend(matchers);

const postId = randomPostId(1, 100);
const userId = randomUserId(postId);
const putData = getPutData(postId, userId);
const newPostData = getNewPostData(userId);

describe('JSONPlaceholder API Testing with Axios', () => {

  test('1. Check getting the list of posts [GET /posts]', async () => {
    const response = await axios.get(`${jsonData.baseUrl}/posts`);
    expect(response.status).toEqual(200);
    expect(response.data).toBeArray();
    expect(response.data[0]).toContainKey('userId', 'id', 'title', 'body');
  });

  test('2. Check getting the exact post [GET /posts/{id}]', async () => {
    const response = await axios.get(`${jsonData.baseUrl}/posts/${postId}`);
    expect(response.status).toEqual(200);
    expect(response.data).toBeObject();
    expect(response.data.id).toEqual(postId);
    expect(response.data.userId).toEqual(randomUserId(postId));
  });

  test('3. Check getting comments to post [GET /posts/{id}/comments]', async () => {
    const response = await axios.get(`${jsonData.baseUrl}/posts/${postId}/comments`);
    expect(response.status).toEqual(200);
    expect(response.data).toBeArray();
    expect(response.data[0]).toContainKey(
      'postId',
      'id',
      'name',
      'email',
      'body'
    );
    expect(response.data[0].postId).toEqual(postId);
  });

  test('4. Check creating new post [POST /posts]', async () => {
    const response = await axios.post(`${jsonData.baseUrl}/posts`, newPostData);
    expect(response.status).toEqual(201);
    expect(response.data).toBeObject();
    expect(response.data.title).toEqual(newPostData.title);
    expect(response.data.userId).toEqual(newPostData.userId);
    expect(response.data.id).toBeNumber();
    expect(response.data.id).toEqual(101);
  });

  test('5. Check creating new user [POST /users]', async () => {
    const response = await axios.post(`${jsonData.baseUrl}/users`, newUser);
    expect(response.status).toEqual(201);
    expect(response.data).toBeObject();
    expect(response.data.username).toEqual(newUser.username);
    expect(response.data.id).toBeNumber();
    expect(response.data.id).toEqual(11);
  });

  test('6. Check full updating the post [PUT /posts/id]', async () => {
    const response = await axios.put(`${jsonData.baseUrl}/posts/${postId}`, putData);
    expect(response.status).toEqual(200);
    expect(response.data).toBeObject();
    expect(response.data.title).toEqual(putData.title);
    expect(response.data.body).toEqual(putData.body);
    expect(response.data.id).toEqual(postId);
    expect(response.data.userId).toEqual(userId);
  });

  test('7. Check partial updating the post [PATCH /posts/{id}])', async () => {
    const response = await axios.patch(`${jsonData.baseUrl}/posts/${postId}`, patchData);
    expect(response.status).toEqual(200);
    expect(response.data).toBeObject();
    expect(response.data.title).toEqual(patchData.title);
    expect(response.data).toContainKey('body');
    expect(response.data.id).toEqual(postId);
  });

  test('8. Check deleting the post [DELETE /posts/{id}]', async () => {
    const response = await axios.delete(`${jsonData.baseUrl}/posts/${postId}`);
    expect(response.status).toEqual(200);
    expect(response.data).toBeEmptyObject();
  });
});