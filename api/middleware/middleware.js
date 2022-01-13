const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
} = require('../users/users-model')


function logger(req, res, next) {
  // DO YOUR MAGIC
  //request method, request url, and a timestamp
  //- this middleware runs on every request made to the API
  console.log(`[${new Date().toString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`)
  next()
}

function validateUserId(req, res, next) {
  //  DO YOUR MAGIC
  // - this middleware will be used for all user endpoints that include an `id` parameter in the url (ex: `/api/users/:id` and it should check the database to make sure there is a user with that id.
  // - if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
  // - if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }`
  const id = req.params.id
  const idsUser = getById(id)
  if (idsUser) {
    req.user = idsUser;
    next()
  } else {
   res.status(404).json({ message: "user not found" })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = { 
  logger, 
  validateUserId, 
  validateUser, 
  validatePost 
}
