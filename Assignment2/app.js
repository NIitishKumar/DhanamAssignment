const express = require('express')
const app = express()
const bodyParser = require('body-parser'); 
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));

  mongoose.connect("mongodb://localhost:27017/Signup",{useNewUrlParser:true});

  const userSchema = new mongoose.Schema({
    email:String,
    password:String
  });

//   userSchema.plugin(encrypt,{secret: process.env.SECRET, encryptedFields: ['password']});

  const User = new mongoose.model("User",userSchema);

  

// Route to Signup Page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.post('/signup', (req, res) => {
  
  let username = req.body.username;
  let password = req.body.password;

  const newUser = new User({
    email:req.body.username,
    password:req.body.password
  });

  newUser.save(function (err) {
    if (err) {
      console.log(err);
    }else {
        res.send(`Username: ${username} Password: ${password}`);
    }
  });

  
});

const port = 3000 

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));