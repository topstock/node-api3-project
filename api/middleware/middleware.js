const {  getById } = require('../users/users-model');


function logger(req, res, next) {
  // DO YOUR MAGIC
  //request method, request url, and a timestamp
  //- this middleware runs on every request made to the API
  console.log(`[${new Date().toString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);
  next();
}

async function validateUserId(req, res, next) {
  //  DO YOUR MAGIC
  // - this middleware will be used for all user endpoints that include an `id` parameter in the url (ex: `/api/users/:id` and it should check the database to make sure there is a user with that id.
  // - if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
  // - if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }`
  const id = req.params.id;
  const idsUser = await getById(id);
  if (idsUser) {
    req.user = idsUser;
    next();
  } else {
   res.status(404).json({ message: "user not found" });
  }
}

function validateUser(req, res, next) {
  // // DO YOUR MAGIC
  // - `validateUser` validates the `body` on a request to create or update a user
  // - if the request `body` lacks the required `name` field, respond with status `400` and `{ message: "missing required name field" }`
  console.log(req.body.name);
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  // // DO YOUR MAGIC
  // - `validatePost` validates the `body` on a request to create a new post
  // - if the request `body` lacks the required `text` field, respond with status `400` and `{ message: "missing required text field" }`
  if (req.body.text) {
    next();
  } else {
    res.status(400).json({ message: "missing required text field" });
  }
}

// do not forget to expose these functions to other modules
module.exports = { 
  logger, 
  validateUserId, 
  validateUser, 
  validatePost 
}
