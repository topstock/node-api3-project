const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const {
  validateUserId, 
  validateUser, 
  validatePost,
} = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const allUsers = await Users.get();
  res.status(200).json(allUsers);
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json({ message: req.user});
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = await Users.insert(req.body);
  res.status(200).json(newUser);
});

router.put('/:id', validateUserId, validateUser , async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const updatedUser = await Users.update(req.params.id, req.body);
  res.status(200).json(updatedUser);
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const deletedUser = await Users.getById(req.params.id);
  await Users.remove(req.params.id);
  res.status(200).json(deletedUser);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const userPosts = await Posts.getById(req.params.id);
  res.status(200).json(userPosts);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
 
});

// do not forget to export the router
module.exports = router;