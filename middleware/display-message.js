const displayMessage = (req, res, next) => {
  if (req.session.messages) {
    res.locals.messages = req.session.messages
    req.session.messages = null
  } else {
    res.locals.messages = null
  }
  next()
}

export default displayMessage
