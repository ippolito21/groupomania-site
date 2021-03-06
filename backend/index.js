const express = require('express')
const passport = require('passport')
require('dotenv').config()
const cors = require('cors')
require('./middlewares/auth')
const app = express()
const database = require('./models/database')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const adminRoutes = require('./routes/admin.routes')
const {PORT} = process.env

database()
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use( "/public", express.static("./public"))
app.use("/api/auth", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/admin", adminRoutes )
app.listen(PORT, () => console.log(PORT))