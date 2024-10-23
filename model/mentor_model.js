import mongoose from './index.js'
import validators from '../utils/validators.js'
import { generateUUID } from '../utils/helper.js'

const { Schema ,Types} = mongoose;

const mentorSchema = new Schema({
   
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
    studentsList: [{
        type: Types.ObjectId, 
        ref: 'Student', 
        default: []
  }]
})

const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;