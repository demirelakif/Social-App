const User = require("../models/User")
const auth = require("../middleware/Auth");
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save()
        .then(() => {
            const { _id, name, email } = user
            res.status(200).json({
                msg: "User successfully inserted",
                user: {
                    _id,
                    name,
                    email
                }
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err.message
            })
        })
}

exports.signin = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Wrong email"
            })
        }

        // test a matching password
        user.comparePassword(password, function (err, isMatch) {
            if (!isMatch) {
                return res.status(400).json({
                    error: "Wrong password"
                })

            }
            //create token
            const token = jwt.sign({ _id: user._id,username:user.username }, process.env.SECRET,{expiresIn:process.env.TOKEN_EXPIRATION})

            const { _id, name, email, username} = user

            res.json({
                accessToken: token,
                user: {
                    _id,
                    name,
                    email,
                    username
                }
            })

        });
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message: "Logout successfully"
    })
}


exports.follow = (req,res) =>{
    
    User.findByIdAndUpdate(req.body.followId,{
        $addToSet:{followers:req.user._id}

    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $addToSet:{following:req.body.followId}
        },{
            new:true
        }).then(result=>{
            res.json(result)
        }).catch(err=>{
            res.status(422).json({error:err})
        })
    })
    
    
}

exports.unfollow = (req,res) =>{
    
    User.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}

    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.followId}
        },{
            new:true
        }).then(result=>{
            res.json(result)
        }).catch(err=>{
            res.status(422).json({error:err})
        })
    })
    
    
}