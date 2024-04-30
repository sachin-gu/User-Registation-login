import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController{
    static userRegistation = async (req, res)=>{
        const {name, email, password, password_confirmation, tc} = req.body
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"status":"failed", "message":"Email Already esists"})
        }else{
            if(name && email && password && password_confirmation && tc ){
                 if(password === password_confirmation){
                   try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password,salt)
                    const doc = new UserModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        tc:tc
                    })
                    await doc.save()
                    const saved_user = await UserModel.findOne({email:email})
                    // Generate JWT Token

                    const token = jwt.sign({userID:saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn:'5d'}); 
                    res.status(201).send({"status":"success", "message":"Registation Successfully", "token": token})

                    
                   } catch (error) {
                    console.log(error)
                    res.send({"status":"failed", "message":"Unable to Register"})
                   }

                 }else{
                    res.send({"status":"failed", "message":"password Doens't Match"})
                 }

            }else{
                res.send({"status":"failed", "message":"All Fields are Required"})
            }
        }
    }

    static userLogin = async(req,res) =>{
        try {
            const {email, password} = req.body
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user != null){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatch){
                        res.send({"status":"success", "message":"Login SuccessFul"})
                    }else{
                        res.send({"status":"failed", "message":"Email or Password is not valid"})

                    }
                }else{ 
                    res.send({"status":"failed", "message":"You are not a Registered User"})
                }

            }else{
                res.send({"status":"failed", "message":"All Fields are Required"})
            }
            
        } catch (error) {
            console.log(error)
            res.send({"status":"failed", "message":"Unable to Login"})

            
        }
    }
}

export default UserController;