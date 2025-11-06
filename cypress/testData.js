function randomUserId(postId) {
  if (postId < 1 || postId > 100) {
    return null;
  }

  return Math.ceil(postId / 10);
}

function randomPostId(min, max) {

  return Math.floor(Math.random() * max) + min;
}

function getPutData(postId, userId) {
  return {
    id: postId,
    title: 'PUT: Fully Updated Title',
    body: 'PUT: The entire body content has been replaced.',
    userId: userId
  };
}

function getNewPostData(userId) {
  return {
    title: 'Cypress Axios Test Post',
    body: 'This is a test post created with Axios in Cypress.',
    userId: userId,
  }
}

const newUser = {
  name: 'Test User',
  username: 'testuser',
  email: 'test@example.com',
};
const patchData = {
  title: 'PATCH: Only Title Updated',
};

module.exports = { randomUserId, randomPostId, getPutData, getNewPostData, newUser, patchData };