// CRUD operations (Create, Read, Update, Delete)
require('dotenv').config()


const express = require('express');

const path = require('path')
const app = express();
app.use('/uploads/', express.static(path.join(__dirname, 'uploads')));
const cors = require('cors')

const mongoose = require('mongoose');

const httpStatusText = require('./utils/httpStatusText')

const url = process.env.MONGO_URL

mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB');
})

const port = 4001
app.use(cors())
app.use(express.json())

const coursesRouter = require('./routes/courses.route')
const usersRouter = require('./routes/users.route')

app.use('/api/courses', coursesRouter) //   /api/courses
app.use('/api/users', usersRouter ) // /api/users

// global middleware for not found routes
app.all('*', (req, res, next) => {
    return res.status(404).json({status: httpStatusText.ERROR, message: 'This page could not be found.'})
})

// global error handler 
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusMessage || httpStatusText.ERROR, message: error.message, code:error.statusCode || 500 , data: null})
})


app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`);
});