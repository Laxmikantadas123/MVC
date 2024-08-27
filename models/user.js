const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    age: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if (value < 18 && value > 45) {
                throw new Error("Age Restriction")
            }
        }

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }
        }

    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

},{timestamps:true})
// --------------------------Authontication----------------
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "laxmiweabsidas"); 
    return token;
};

// ------------------this is for login ------------

userSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Invalid login credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid login credentials');
    }
    return user;
};

// ------------------bcrypt---------------

userSchema.pre("save",async function (next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
    
})
const model = mongoose.model("userdata", userSchema)
module.exports = model
