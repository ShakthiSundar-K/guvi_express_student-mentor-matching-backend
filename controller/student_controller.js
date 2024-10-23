import Student from '../model/student_model.js'
import 'dotenv/config'

const getAllStudents = async (req,res)=>{
    try{
        let students = await Student.find({})
        res.status(200).send({
            message: "Students data fetched successfully",
            data: students
        })
    }catch(error){
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({message:error.message || "Internal Server Error"})
    }
}

const createStudent = async (req,res) => {
    try{
        let student = await Student.findOne({email: req.body.email})
        if(!student){
            await Student.create(req.body)
            res.status(201).send({message: "Student created successfully"})
        }
        else{
            res.status(400).send({message: `User with ${req.body.email} already exists!!`})
        }
    }catch(error){
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({message:error.message || "Internal Server Error"})
    }
}

const getStudentById = async (req,res) => {
    try{
        let {id} = req.params
        let student = await Student.findOne({_id:id})
        res.status(200).send({
            message: "Student data fetched successfully",
            data: student
        })
    }catch(error){
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const editStudentById = async (req,res)=>{
    try{
        let {id} = req.params
        let student = await Student.findOne({_id:id})
        if(student){
            const {name,email,mobile,currentMentor} = req.body
            student.name = name?name: student.name
            student.email = email?email: student.email
            student.mobile = mobile?mobile: student.mobile
            student.currentMentor = currentMentor?currentMentor: student.currentMentor

            await student.save()

            res.status(200).send({message:"Student Data Updated Successfully",data:student})
        }
        else{
            res.status(400).send({message: "Student does not exists!!"})
        }
    }catch(error){
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const deleteStudentById = async (req,res)=>{
    try{
        let {id} = req.params
        let student = await Student.deleteOne({_id:id})
        if(student.deletedCount){
            res.status(200).send({message:"Student Deleted Successfully"})
        }
        else{
            res.status(400).send({message:"Student Does not exists!!"})
        }
    }catch(error){
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}
export default {
    getAllStudents,
    createStudent,
    getStudentById,
    editStudentById,
    deleteStudentById
}