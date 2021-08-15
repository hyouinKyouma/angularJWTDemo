const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const db = process.env.DB

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error("unable to connect to the server...")
    } else {
        console.log("connected to the db successfully...")
    }
})

router.get('/api', (req, res) => {
    res.send('api route called')
})
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secret')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

// post user to the collection
router.post('/register', (req, res) => {
    let userdata = req.body; //getting user data from the request body
    let newUserModel = new User(userdata) //creating instance of user model
    newUserModel.save((error, newUser) => {
        if (error) {
            console.error(`An error occured...${error}`)
        } else {
            let payload = {subject:newUser._id}
            let token = jwt.sign(payload,'secret')
            res.status(200).send({token})
        }
    })
})

// login method
router.post('/login', (req, res) => {
    let userCred = req.body
    User.findOne({ email: userCred.email }, (error, user) => {
        if (error) {
            res.status(400).send(error)
        } else {
            if (!user) {
                res.status(401).send("Invalid User")
            } else {
                if (user.password !== userCred.password) {
                    res.status(401).send("incorrect password entered")
                } else {
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload,'secret')
                    res.status(200).send({token})
                }
            }
        }

    })
})

router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })
  
  router.get('/special', verifyToken, (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })    

module.exports = router