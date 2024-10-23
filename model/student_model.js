import mongoose from './index.js'
import validators from '../utils/validators.js'
import { generateUUID } from '../utils/helper.js'

const { Schema,Types } = mongoose;

const studentSchema = new Schema({
   
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        validate: {
            validator: validators.validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile:{
        type:String,
        required:[true,"Mobile is required"],
        validate: {
            validator: validators.validateMobile,
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    currentMentor: {
        type: Types.ObjectId, // This will store the current Mentor's ID
        ref: 'Mentor', // This refers to the Mentor collection
        default: null // A student might not have a mentor initially
   },
   previousMentors: [{
        type: Types.ObjectId, // Array to hold previous Mentor IDs
        ref: 'Mentor' // This refers to the Mentor collection
   }]
})

const Student = mongoose.model('Student', studentSchema);

export default Student;