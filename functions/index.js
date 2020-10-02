const functions = require('firebase-functions');
const express = require('express')
const userRouter = require('./routers/user.routes.js')
const projectRouter = require('./routers/project.routes.js')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000
const cors = require('cors')

var corsOptions = {
    origin: 'https://impressive-hall-288310.web.app/',
    optionsSuccessStatus: 200
  }

const app = new express()
app.use(express.json())
app.use(userRouter)
app.use(projectRouter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(corsOptions))

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app)
