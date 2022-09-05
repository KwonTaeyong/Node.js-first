const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { User } = require("./models/User");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connetcted...'))
  .catch(err => console.log(err))




app.get('/', (req, res) => {
  res.send('테스트 진행중입니다11111122332.')
})

app.post('/register', (req, res) => {
  //회원가입 정보
  const user = new User(req.body)
  console.log(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })

})

app.post('/login', (res, req) => {
  console.log({email: req.body.email })
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  })

  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch)
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
    })
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

