const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateAccessToken = (user) => {
    return jwt.sign(
        {id: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"}
    )
}

const generateRefreshToken = (user) =>{
     return jwt.sign(
        {id: User._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"1m"}
    )

 
}

exports.register = async(req,res)=>{
   const {name,email,password} = req.body;

    const hashedPassword = await bcrypt.hash (password,10);

    await User.create({
        name,
        email,
        password: hashedPassword
    })
    res.redirect("/login")
}

exports.login = async(req,res)=>{
   const {email,password} = req.body;

   const user = await User.findOne({email});
   if (!user) return res.send("user not found");
   
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) return res.send("wrong password");

   const accessToken = generateAccessToken();
   const refreshToken = generateRefreshToken();

   user.refreshToken = refreshToken;
   await user.save();

   res.cookie("refreshToken",refreshToken,{
    httpOnly:true
   })
 res.json({accessToken})
}

exports.refreshToken =  async (req, res)=>{
    const token = req.cookie.refreshToken;
    if(!token) return res.sendStatus(401);
    
    const user = await User.findOne({refreshToken: token});
    if(!user) return res.sendStatus(403);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,(err)=>{
        if(err) return res.sendStatus(403);

        const newAccessToken = generateAccessToken(user);
        res.json ({accessToken: newAccessToken})
    }
    )
}