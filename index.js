var express = require('express')
path = require('path');
mongoose = require('mongoose')
var userRoutes =require('./routes/userRoutes')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config/config');
var auth=require('./middleware/auth');
  // "type": "module",
// import core from 'cors'  
var cors = require("cors")  
var bodyParser = require('body-parser');
var Users = require('./model/users');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//cors Policy
app.use(cors())

// Load Routes
app.use("/api/user", userRoutes)



mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/schoo", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (!error) {
        console.log("Success");
    }
    else {
        console.log("sorry ");
    }
});

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on port ' + port)
})



//for create new  user 
app.post('/signup', async (req, res) => {

    console.log(req.body.username)

    if (req.body.password === req.body.conformpassword) {

        const emailExist = await Users.findOne({ email: req.body.email });
        console.log(emailExist)
        if (emailExist) {
            return res.status(400).send("emali already exist");
        }
        console.log(req.body)


        const user = new Users(req.body)
        const record = {
            username: req.body.username,
            fname: req.body.fname,
            lastname: req.body.lastname,
            title: req.body.title,
            company: req.body.company,
            email: req.body.email,
            password: req.body.password,

        }

        console.log(record)

        try {
            const result = await Users.create(record)

            res.status(200).send("user signup successFully")
        } catch (error) {

            res.status(500).send(error.message);

        }
    }
    else {
        return res.status(400).send("password do not match");

    }
})



app.post('/login', function (req, res) {
    console.log(req.body)

    Users.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return res.status(500).send('Error on the server.');
        }
        if (!user) {
            return res.status(404).send(' user not found.');
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) { 
            return res.status(401).send({ auth: false, token: null }) };


        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        console.log(user)
        req.session = token
        console.log(req.session)

        res.status(200).send({ auth: true, token: token });
    });

});



app.get('/me', auth, async (req, res, next) => {
    
    
    res.status(200).send("successfully login");

   
   
})


