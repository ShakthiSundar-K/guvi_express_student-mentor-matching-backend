import Mentor from "../model/mentor_model.js";
import Student from "../model/student_model.js";
import "dotenv/config";

const getAllMentors = async (req, res) => {
  try {
    let mentors = await Mentor.find({});
    res.status(200).send({
      message: "Mentors data fetched successfully",
      data: mentors,
    });
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const createMentor = async (req, res) => {
  try {
    let mentor = await Mentor.findOne({ email: req.body.email });
    if (!mentor) {
      await Mentor.create(req.body);
      res.status(201).send({ message: "Mentor created successfully" });
    } else {
      res
        .status(400)
        .send({ message: `User with ${req.body.email} already exists!!` });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const getMentorById = async (req, res) => {
  try {
    let { id } = req.params;
    let mentor = await Mentor.findOne({ _id: id });
    if (!mentor) {
      return res.status(404).send({ message: "Mentor not found" });
    }
    res.status(200).send({
      message: "Mentor data fetched successfully",
      data: mentor,
    });
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const editMentorById = async (req, res) => {
  try {
    let { id } = req.params;
    let mentor = await Mentor.findOne({ _id: id });

    if (mentor) {
      const { name, email, mobile, studentsList } = req.body;

      // Update the basic details if provided
      mentor.name = name ? name : mentor.name;
      mentor.email = email ? email : mentor.email;
      mentor.mobile = mobile ? mobile : mentor.mobile;

      // Validate and append new student IDs to studentsList
      if (studentsList && studentsList.length > 0) {
        for (let studentId of studentsList) {
          // Check if the student exists in the Student model
          const studentExists = await Student.findById(studentId);
          if (!studentExists) {
            return res.status(400).send({
              message: `Student with ID ${studentId} does not exist`,
            });
          }

          // Add student ID to mentor.studentsList only if it's not already present
          if (!mentor.studentsList.includes(studentId)) {
            mentor.studentsList.push(studentId);
            try {
              await Student.findByIdAndUpdate(studentId, {
                currentMentor: mentor._id,
              });
              //   await student.save();
            } catch (error) {
              console.log(
                `Error updating student with ID ${studentId}:`,
                error.message
              );
              return res
                .status(500)
                .send({ message: "Failed to update current mentor." });
            }
          }
        }
      }

      // Save the updated mentor
      await mentor.save();

      res
        .status(200)
        .send({ message: "Mentor data updated successfully", data: mentor });
    } else {
      res.status(404).send({ message: "Mentor does not exist!" });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const deleteMentorById = async (req, res) => {
  try {
    let { id } = req.params;
    let mentor = await Mentor.deleteOne({ _id: id });
    if (mentor.deletedCount) {
      res.status(200).send({ message: "Mentor Deleted Successfully" });
    } else {
      res.status(404).send({ message: "Mentor does not exist!!" });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

export default {
  getAllMentors,
  createMentor,
  getMentorById,
  editMentorById,
  deleteMentorById,
};
