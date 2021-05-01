//Loading Packages
const express = require('express')
const app = express()
const logger = require('morgan')
const flash = require('express-flash')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
const connectDB = require('./config/database')
require('dotenv').config({ path: './config/.env' })

//Passport Config
require('./config/passport')(passport)

//Connect DB
connectDB()

//Setup the Server
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
app.use(methodOverride("_method"))

//Passport and Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)
app.use(passport.initialize())
app.use(passport.session())

//Starting Flash
app.use(flash())

// \/ MVC AND ROUTING \/

//1) CONTROLLERS
const indexRoute = require('./routes/index')
const dashboardRoute = require('./routes/dashboard')

//2) ROUTES
app.use('/', indexRoute)
app.use('/dashboard', dashboardRoute)

//Running the Server
app.listen(process.env.PORT, () => {
  console.log(`server running on port: ${process.env.PORT}`)
})

