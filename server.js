import { config } from "dotenv"
config()
import express from "express"
const app = express()
import session from "express-session"
import { connect } from "mongoose"
import methodOverRide from "method-override"
import morgan from "morgan"
import passUserToView from "./middleware/pass-user-to-view.js"
import authRouter from "./routes/auth.js"
import schemeRouter from "./routes/schemes.js"
import getMessages from "./middleware/display-message.js"
import bodyParser from "body-parser"

const port = process.env.PORT || 3000

app.use(bodyParser.json())

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI)
    console.log("Database is connected!")
  } catch (error) {
    console.error("Database connection error:", error)
    console.error("Exiting process with failure.")
    process.exit(1)
  }
}

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverRide("_method"))
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use("/auth", authRouter)
app.use("/schemes", schemeRouter)
app.set("view engine", "ejs")
app.use(getMessages)
app.use(passUserToView)

app.get("/", (req, res) => {
  res.render("auth/sign-in.ejs")
})

app.post("/api/schemes", async (req, res) => {
  const { start, length, search } = req.body

  // Build the search query based on user input
  const searchTerm = search.value || ""
  const query = {
    $or: [
      { "Sch Ref": { $regex: searchTerm, $options: "i" } },
      { "Job no": { $regex: searchTerm, $options: "i" } },
      // Add other fields you want to search
    ],
  }

  // Count total records
  const totalRecords = await Scheme.countDocuments()

  // Fetch records with pagination
  const totalFilteredRecords = await Scheme.countDocuments(query)
  const schemes = await Scheme.find(query).skip(start).limit(length)

  // Convert results to the format needed by DataTables
  const results = schemes.map((scheme, index) => ({
    index: start + index + 1, // calculate index
    ...scheme.toObject(),
  }))

  // Return response in the required format
  res.json({
    draw: req.body.draw,
    recordsTotal: totalRecords,
    recordsFiltered: totalFilteredRecords,
    data: results,
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
