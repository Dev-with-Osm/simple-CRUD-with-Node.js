
const express = require('express')


const router = express.Router()
const courseController = require('../controllers/courses.controller');
const verifyToken = require('../middleware/verifyToken');
const userRole = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');
const { validationSchema } = require('../middleware/validationSchema');





router.route('/')
            .get(courseController.getAllCourses)
            .post(verifyToken,allowedTo(userRole.MANAGER),validationSchema(),courseController.addCourse);


router.route('/:courseId')
           .get(courseController.getCourse)
           .patch(courseController.updateCourse )
           .delete( verifyToken, allowedTo(userRole.ADMIN, userRole.MANAGER), courseController.deleteCourse)



    module.exports = router;