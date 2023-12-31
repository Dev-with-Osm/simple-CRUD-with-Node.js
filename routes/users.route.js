const express = require('express')
const router = express.Router()
const multer  = require('multer')
const usersController = require('../controllers/users.controller')
const verifyToken =  require('../middleware/verifyToken')
const appError = require('../utils/appError')

const diskStorage = multer.diskStorage({
        destination : function (req, file, cb) {
                console.log('file:', file)
                cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
                const ext = file.mimetype.split('/')[1]
                const fileName = `user-${Date.now()}.${ext}`
                cb(null, fileName)
        }

})

const fileFilter = (req, file, cb) =>{
        const imagetype = file.mimetype.split('/')[0]

        if (imagetype === 'image') {
                return cb(null,true)
        }  else {
                return cb(appError.create('the file must be an image', 400), false)
        }
}

const upload = multer({
        storage: diskStorage,
        fileFilter: fileFilter
})

// get all users


// register


// login


router.route('/')
            .get(verifyToken, usersController.getAllUsers)

router.route('/register')
           .post(upload.single('avatar'),usersController.register)

router.route('/login')
            .post(usersController.login)



    module.exports = router;