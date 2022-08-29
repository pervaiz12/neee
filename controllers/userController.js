var UserModel = require('../model/users')
var userAccount = require('../model/userAccount')
// var userProfile =require('../model/userProfile')
var bcrypt = require('bcryptjs')

var jwt = require('jsonwebtoken')
var  config= require('../config/config')
const UserProfile = require('../model/userProfile')

class UserController {

    //for userRegistration 
    static userRegistration = async (req, res) => {
        console.log(req.body)
        const { username, fname, password, password_confirmation, lastname,title,company,email } = req.body

        const user = await UserModel.findOne({ email: email })
        if (user) {
          res.send({ "status": "failed", "message": "Email already exists" })
        } else {
          if (username && email && password && password_confirmation ) {
            if (password === password_confirmation) {
              try {
               
                const doc = new UserModel({
                  fname:fname,
                  lastname:lastname,
                  username: username,
                  company:company,
                  title:title,
                  email: email,
                  password: password,
                  
                })
                await doc.save()
                const saved_user = await UserModel.findOne({ email: email })
                // Generate JWT Token
                const token = jwt.sign({ userID: saved_user._id },  config.secret, { expiresIn: '5d' })
                res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
              } catch (error) {
                // console.log(error)
                // res.send({ "status": "failed", "message": "Unable to Register" })
                res.status(500).send(error.message);
              }
            } else {
              res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
            }
          } else {
            res.send({ "status": "failed", "message": "All fields are required" })
          }
        }
      }

// for userLogin
      static userLogin = async (req, res) => {
       
        try {
          const { email, password } = req.body
          console.log(req.body)
          if (email && password) {
            const user = await UserModel.findOne({ email: email })
            console.log(user.password)
            if (user != null) {
              const isMatch =await bcrypt.compare(req.body.password, user.password);
              console.log(isMatch)
              if ((user.email === email) && isMatch) {
                // Generate JWT Token
                const token = jwt.sign({ userID: user._id }, config.secret, { expiresIn: '5d' })
                res.send({ "status": "success", "message": "Login Success", "token": token })
              } else {
                res.send({ "status": "failed", "message": "Email or Password is not Valid" })
              }
            } else {
              res.send({ "status": "failed", "message": "You are not a Registered User" })
            }
          } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
          }
        } catch (error) {
          console.log(error)
          res.send({ "status": "failed", "message": "Unable to Login" })
        }
      }


      // for changeUserPassword

      static changeUserPassword = async (req, res) => {
        console.log(req.user._id)
        const { password_confirmation, password } = req.body
        if(password && password_confirmation){

            if(password===password_confirmation)
            {
                const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password, salt)
                 await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
    
                 res.send({ "status": "failed", "message": "password change successfully " })
    
            }else{
                res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
    
            }
            
        }else{
            res.send({ "status": "failed", "message": "All field are required " })

        }
       

      }




       // for changeUserProfile

       static userProfile = async (req, res) => {
        console.log(req.user._id)
        const { img, salutation,fatherName,gender,maritalStatus,religion,nationality,bloodgroup,dob } = req.body


        try {
               
          const doc = new UserProfile({
            img:img,
            salutation:salutation,
            fatherName: fatherName,
            gender:gender,
            maritalStatus:maritalStatus,
            religion: religion,
            nationality: nationality,
            bloodgroup:bloodgroup,
            dob:dob,
            user_id:req.user.id
            
            
          })
          await doc.save()
          res.status(201).send({ "status": "success", "message": "Profile update  Successfully" })
        } catch (error) {
          // console.log(error)
          // res.send({ "status": "failed", "message": "Unable to Register" })
          res.status(500).send(error.message);
        }

       console.log(req.body)

      }





}








module.exports = UserController
// export default UserController