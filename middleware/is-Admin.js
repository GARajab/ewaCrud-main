const isAdmin = (req, res, next) => {
  if (req.session.user.username == "Admin") {
    return next()
  }
  console.log("You Are Not An Admin")
  res.redirect("/auth/sign-in")
}

export default isAdmin
