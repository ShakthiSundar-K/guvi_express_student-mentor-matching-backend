import express from 'express'
import mentorController from '../controller/mentor_controller.js'
const router = express.Router()

router.post('/createMentor',mentorController.createMentor)
router.get('/getAllMentors',mentorController.getAllMentors)
router.get('/getMentorById/:id',mentorController.getMentorById)
router.put('/editMentorById/:id',mentorController.editMentorById)
router.delete('/deleteMentorById/:id',mentorController.deleteMentorById)

export default router