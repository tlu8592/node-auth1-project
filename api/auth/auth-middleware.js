const User = require('../users/users-model')

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
  if (!req.session) {
    res.status(401).json({
      message: "You shall not pass!",
      err: err.message
    })
  } else {
    next()
  }

}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
function checkUsernameFree() {
  const existingUser = await User.findBy({ username: req.body.username })
  if (existingUser) {
    next({ status: 422, message: 'Username taken' })
  } else {
    next()
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists() {
  const existedUserName = await User.findBy({ username: req.body.username })
  if (existedUserName) {
    next({ status: 401, message: 'Invalid credentials' })
  } else {
    next()
  }
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength() {
  if (!req.body.password || req.body.password <= 3) {
    res.status(422).json({
      message: "Password must be longer than 3 chars",
      err: err.message
    })
  } else {
    next()
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}