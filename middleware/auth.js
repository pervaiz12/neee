const jwt = require('jsonwebtoken')
const Users = require("../model/users")
const auth = async (req, res, next) => {
   try {
      console.log(req.body)
      const token = req.header('Authorization').replace('Bearer ', '')
      console.log(token)
      const decode = await jwt.verify(token, 'supersecret')
      console.log(decode)
      const user = await Users.findOne({ _id: decode.userID })
      console.log(user);
      if (!user)
         throw new Error()
      req.token = token
      req.user = user;
      next();
   } catch (e) {
      res.status(400).send({error:"authentication X"})
      // res.status(200).send({ auth: true, token: token });

   }




   // let token
   // const { authorization } = req.headers
   // if (authorization && authorization.startsWith('Bearer')) {
   //   try {
   //     // Get Token from header
   //     token = authorization.split(' ')[1]
 
   //     // Verify Token
   //     const { userID } = jwt.verify(token, 'supersecret')
 
   //     // Get User from Token
   //     req.user = await Users.findById(userID).select('-password')
 
   //     next()
   //   } catch (error) {
   //     console.log(error)
   //     res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
   //   }
   // }
   // if (!token) {
   //   res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
   // }
}

module.exports = auth