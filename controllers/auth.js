import { Router } from "express"
import { hashSync, compareSync } from "bcrypt"
import messages from "../middleware/display-message.js"
import session from "express-session"
import User from "../models/user.js"

const router = Router()

const signup_get = (req, res) => {
  // Extract messages from the session if they exist
  const messages = req.session.messages || ""
  // Clear messages from the session to avoid showing them again
  req.session.messages = null

  // Render the signup page and pass the messages to the EJS template
  res.render("auth/sign-up", { messages })
}

const signup_post = async (req, res) => {
  const userInDatabase = await User.findOne({ cpr: req.body.cpr })
  if (userInDatabase) {
    // return res.send("CPR already in database")
    req.session.messages = `User Already In Database`
    return res.redirect("/auth/sign-up")
  }
  if (req.body.password !== req.body.confirmPassword) {
    req.session.messages = "Passwords Do No Matching."
    return res.redirect("/auth/sign-up")
  }
  try {
    const hashedPassword = hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const cpr = await User.create(req.body)
    req.session.messages = `Thank You ${req.body.cpr} Now You Can Sign In`
    res.redirect("/auth/sign-in")
  } catch (err) {
    console.log(err)
    return res.send("Failed To Create User.")

    // console.log(err)
    req.session.messages =
      "Failed To Create User. Please Try Again Or Call The Admin On 17991236."
    return res.redirect("/auth/sign-up")
  }
}

const signin_get = (req, res) => {
  res.render("auth/sign-in.ejs")
}

const signin_post = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ cpr: req.body.cpr })
    if (!userInDatabase) {
      return res.redirect("/auth/sign-in")
    }
    const validPassword = compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.send("Login Failed. Please try again.")
    }
    req.session.user = {
      cpr: userInDatabase.cpr,
      _id: userInDatabase._id,
      email: userInDatabase.email,
    }
    res.locals.messages = `Welcome Back ${req.session.user.cpr}`
    return res.render("schemes/dashBoard", {
      user: req.session.user,
      messages: res.locals.messages,
    })
  } catch (err) {
    console.log(err)
    res.redirect("/auth/sign-in")
  }
}

const signout = (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}

const signin = (req, res) => {
  try {
    res.render("auth/sign-in.ejs", {
      messages: res.locals.messages,
    })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

export default {
  signout,
  signin_post,
  signin_get,
  signup_post,
  signup_get,
  router,
}
