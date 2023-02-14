const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userSchema')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') 
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

      req.user = await User.findById(decoded.UserInfo.userId).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
  
const supplierProtect =asyncHandler(async(req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.SUPPLIER_TOKEN)
      
      req.supplier = decoded.SupplierInfo

      next()
    } catch(error) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized and no Token')
  }
})

const adminProtect = asyncHandler( async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.ADMIN_TOKEN)

      req.admin = decoded.AdminInfo

      next() 
    } catch (error) {
      res.status(401)
      throw new Error('No admin authorization')     
    }
  }

  if(!token){
    res.status(401)
    throw new Error('No admin authorization & no token') 
  }
})

const combinedMiddleware = (req, res, next) => {
  protect (req, res, (err) => {
    if(!err){
      return next()
    }
    supplierProtect(req, res, (err) => {
      if(!err) {
        return next()
      }
      return next(err)
    })   
  }) 
}

const checkBlocked = (req, res, next) => {
  console.log(req.user)
  if (req.user && !req.user.isActive) {
    console.log('Blocked user')
    // User is blocked, redirect them to a page explaining the situation
    res.redirect('/blocked');
  } else {
    // User is not blocked, proceed to the next middleware or route handler
    next();
  }
};
 

module.exports = { protect, supplierProtect, adminProtect, combinedMiddleware, checkBlocked }