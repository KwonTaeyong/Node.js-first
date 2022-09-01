const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key');
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connetcted...'))
  .catch(err => console.log(err))
const { User } = require("./models/User");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());






app.get('/', (req, res) => {
  res.send('테스트 진행중입니다11111122332.')
})

app.post('/register', (req, res) => {
  //회원가입 정보
  const user = new User(req.body)
  console.log(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

