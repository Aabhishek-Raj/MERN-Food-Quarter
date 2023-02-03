// const User = require('../models/userSchema')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const asyncHandler = require('express-async-handler')
// const { off } = require('../models/userSchema')


// //@desc Login
// //@route POST /auth
// //@access Public
// module.exports.login = asyncHandler(async (req, res) => {
//     const { email, password } = req.body

//     if (!email || !password) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }
//     const foundUser = await User.findOne({ email }).exec()

//     if (!foundUser || !foundUser.isActive) {
//         return res.status(401).json({ message: 'Unauthorized' })
//     }
//     const match = await bcrypt.compare(password, foundUser.password)

//     if (!match) return res.status(401).json({ message: 'Unauthorized' })

//     const accessToken = jwt.sign(
//         {
//             'UserInfo': {
//                 'userId': foundUser._id,
//                 'username': foundUser.username,
//                 'roles': foundUser.roles
//             }
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: '1m' }
//     )

//     const refreshToken = jwt.sign(
//         { userId: foundUser._id },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: '1d' }
//     )

//     //Create secure cookie with refresh token
//     res.cookie('jwt', refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'None',
//         maxAge: 7 * 24 * 60 * 60 * 1000
//     })
//     res.json({ accessToken })


// })

// //@desc Refresh
// //@route POST /refresh
// //@access Public 
// module.exports.refresh = asyncHandler(async (req, res) => {
//     const cookies = req.cookies

//     if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

//     const refreshToken = cookies.jwt

//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,  
//         asyncHandler(async (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden' })

//             const foundUser = await User.findById( decoded.userId) 

//             if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

//             const accessToken = jwt.sign(
//                 {
//                     'UserInfo': {
//                         'userId': foundUser._id,
//                         'username': foundUser.username,
//                         'roles': foundUser.roles
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 {expiresIn: '1m'}
//             )
//             res.json({ accessToken })
//         })
//     )

// })

// //@desc Logout
// //@route POST /auth/logout
// //@access public
// module.exports.logout = asyncHandler(async (req, res) => {
//     const cookies = req.cookies
//     if(!cookies?.jwt) return res.status(204)  // but no content
//     res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
//     res.json({message: 'Cookie cleared'})

// })