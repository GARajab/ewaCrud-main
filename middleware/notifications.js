function setNotification(req, res, next) {
  // Check if a notification exists in the session
  res.locals.notification = req.session.notification || null

  // Clear the notification after it's been read
  delete req.session.notification

  next()
}

export default setNotification
