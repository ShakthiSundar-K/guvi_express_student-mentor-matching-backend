import express from 'express'
import studentController from '../controller/student_controller.js'
const router = express.Router()

router.post('/createStudent',studentController.createStudent)
router.get('/getAllStudents',studentController.getAllStudents)
router.get('/getStudentById/:id',studentController.getStudentById)
router.put('/editStudentById/:id',studentController.editStudentById)
router.delete('/deleteStudentById/:id',studentController.deleteStudentById)

export default router