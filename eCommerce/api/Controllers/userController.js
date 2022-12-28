const User = require('../Modules/userModule');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')

//User Register
exports.registerUser = catchAsyncErrors(async(req, res) =>{
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password, avatar:{
            public_id: "This is public id",
            url: "ProfilePicture"
        },
    });

    sendToken(user, 201, res);
    // const token = user.getJWTToken();
    // res.status(201).json({ success:true, token });

});

//User Login 
exports.loginUser = catchAsyncErrors(async(req, res, next) =>{
    const { email, password } = req.body;

    //Checking if user has given password and email both 

    if (!email || !password) {
        return next(new ErrorHander("Please enter email or password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
    // const token = user.getJWTToken();
    // res.status(200).json({ success:true, token });

});

//User Logout
exports.logoutUser = catchAsyncErrors(async(req, res, next) =>{    
    res.cookie('Token', null, {
        expires:new Date(Date.now()),
        httpOnly:true,
    });        
    res.status(200).json({ success:true, message:"Logout successfully" });
});

//Forget Password 
exports.forgetPassword = catchAsyncErrors(async(req, res, next) =>{    
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }
    //get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave:false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, Please ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subject:"Ecommerce Password Recovery Mail",
            message
        });
        res.status(200).json({
            success:true,
            message: `Email send to ${user.email} successfullty`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave:false });
        return next(new ErrorHander(error.message, 500));
    }

    res.status(200).json({ success:true, message:"Logout successfully" });
});

