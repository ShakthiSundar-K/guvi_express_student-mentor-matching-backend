import express from 'express'
import studentRoutes from './student_route.js'
import mentorRoutes from './mentor_route.js'

const router = express.Router()

router.use('/student',studentRoutes)
router.use('/mentor',mentorRoutes)

router.get('*',(req,res)=>res.send(`<div style="text-align:center"><h1>404 NOT FOUND</h1><p>The requested endpoint does not exists</p></div>`))

export default router