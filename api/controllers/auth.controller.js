import Role from "../models/Role.js"
import user from "../models/user.js";
import User from "../models/user.js"
import bcrypt from "bcryptjs";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req,res,next) =>{

    const role = await Role.find({role:'User'});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         username: req.body.userName,
         email: req.body.email,
         password: hashPassword,
         roles: role
    })
      await newUser.save();  
      return res.status(200).json("User Registered Successfully");
   
    }

export const registerAdmin = async (req,res,next) =>{

        const role = await Role.find();
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        const newUser = await User({
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             username: req.body.userName,
             email: req.body.email,
             password: hashPassword,
             isAdmin:true,
             roles: role
        })
          await newUser.save();  
        return next(CreateSuccess(200, "Admin Registered Successfully"));
}

export const login = async(req,res,next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles","role");

        const {roles} = user;

        if(!user)
        {
            return res.status(404).send("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(404).send("Incorrect Password");
        }
         const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin, roles: roles},
            process.env.JWT_SECRET
        )

        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({
            status:200,
            message:"Login Success",
            data: user
        })

    } 
    catch (error) {
        return res.status(500).send("Something went wrong");
    }
}

export const sendEmail = async (req, res, next)=> {

    const email = req.body.email;
    const user = await User.findOne({email: {$regex: '^' +email+ '$', $options: 'i'}});
    if(!user){
        return next(CreateError(404, "User not found to reset the password"));
    }
    const payload = {
        email : user.email
    }
    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiryTime});
    const newToken = new UserToken({
        userId: user._id,
        token : token
    });

    const mailTransporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

   const mailDetails = {
        from: "syedaimtiyaz19@gmail.com",
        to: email,
        subject:"Reset Password",
        html: `<html>
        <head>
        <title>Password Reset Request</title>
        </head>
        <body>
        <h1>Password Reset Request</h1>
        <p>Dear ${user.userName},</p>
        <p>Please click on the button below:</p>
        <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color:indigo; color:white; padding:14px 20px ; cursor:pointer; border-radius ;4px">Reset</button></a>
        </body>
        </html>
        `,
    };
    
    console.log(`Attempting to send email to: ${email}`);
    mailTransporter.sendMail(mailDetails, async(err, data)=>{
        if(err){
            console.log(err);
            return next(CreateError(500, "Something went wrong while sending an email"));
        }
        else{
            await newToken.save();
            return next(CreateSuccess(200, "Reset link sent to your mail"));
        }
    });
}

export const resetPassword = (req, res, next) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    jwt.verify(token, process.env.JWT_SECRET, async(err, data)=>{

        if(err){
            return next(CreateError(500, "Reset Link is expired"));
        }
        else{
            const response = data;
            const user = await User.findOne({email: {$regex: '^'+ response.email + '$', $options: 'i' }});
            const salt = await bcrypt.genSalt(10);
            const encryptPassword = await bcrypt.hash(newPassword, salt);
            user.password = encryptPassword;

            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id: user._id},
                    {$set: user},
                    {new: true}
                )
                return next(CreateSuccess(200, "Password Reset Successfully"));
            }
            catch(error){
                return next(CreateError(500, "Something went wring while resetting the password"));
            }
        }
    })
}

export const checkUsername = async(req, res, next) => {
    const {userName} = req.body;
    const user = await User.findOne({username: userName});
    return res.json({ usernameTaken: !!user });

};

export const getUsername = async(req, res, next) => {
    const {userId} = req.body;
    console.log(userId);
    const user = await User.findOne({_id: userId});
    if(!user)
        return res.status(404).json({message:'User not found'});

    return res.status(200).json({username: user.username});
}