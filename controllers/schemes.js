import Scheme from "../models/schemes.js"

const index = async (req, res) => {
  try {
    const populatedSchemes = await Scheme.find()
    res.render("schemes/allSchemes", { populatedSchemes })
  } catch (err) {
    console.error(err)
    res.redirect("/") // Redirect to a homepage or an error page
  }
}

const newScheme = (req, res) => {
  res.render("schemes/new.ejs")
}

const createSchemeFunc = async (req, res) => {
  // Check if user is authenticatedzz
  if (!req.session.user) {
    return res.send("Unauthorized: Please log in.")
  }

  try {
    const scheme = new Scheme(req.body) // Create a new scheme instance
    await scheme.save() // Save the scheme to the database
    res.redirect("/schemes/allSchemes")
  } catch (error) {
    console.error(error)
    res.send("An error occurred while creating the scheme: " + error.message) // Better error response
  }
}

const editScheme = async (req, res) => {
  try {
    const currentScheme = await Scheme.findById(req.params.schemeId)
    // Check if the scheme exists
    if (!currentScheme) {
      return res.redirect("/not-found")
    }
    res.render("schemes/edit.ejs", { scheme: currentScheme })
  } catch (error) {
    console.error(error)
    res.redirect("/") // Redirect on error
  }
}

const updateScheme = async (req, res) => {
  try {
    const currentScheme = await Scheme.findById(req.params.schemeId)
    // Check if the scheme exists
    if (!currentScheme) {
      return res.send("not-found")
    }

    await Scheme.findByIdAndUpdate(req.params.schemeId, req.body) // Better to use findByIdAndUpdate
    res.redirect("/schemes/allSchemes")
  } catch (error) {
    console.error(error)
    res.redirect("/") // Redirect on error
  }
}

const deleteScheme = async (req, res) => {
  try {
    const deletedScheme = await Scheme.findByIdAndDelete(req.params.schemeId)
    if (!deletedScheme) {
      return res.send("not-found")
    }
    res.redirect("/schemes/allSchemes")
  } catch (error) {
    console.error(error)
    res.redirect("/") // Redirect on error
  }
}

const getById = async (req, res) => {
  try {
    const populatedScheme = await Scheme.findById(req.params.schemeId)
    if (!populatedScheme) {
      return res.redirect("/not-found")
    }
    res.render("schemes/dashBoard.ejs", { service: populatedScheme })
  } catch (error) {
    console.error(error)
    res.redirect("/")
  }
}

const dashBoard = async (req, res) => {
  try {
    res.render("schemes/dashBoard.ejs", {
      messages: res.locals.messages,
    })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

const showSchemesList = async (req, res) => {
  try {
    const allUsers = await Scheme.find()
    res.render("schemes/usersList.ejs", { users: allUsers })
  } catch (err) {
    console.error(err)
    res.redirect("/")
  }
}

export default {
  showSchemesList,
  dashBoard,
  index,
  getById,
  deleteScheme,
  updateScheme,
  editScheme,
  createSchemeFunc,
  newScheme,
}
