const express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 6000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.get('/', (req, res) => {
    res.send("Welcome!!!")
})

app.post('/rest/api/v1.3/lists/Resp_Banking_Customers/members', (req, res) => {
    const data = req.body
    console.log('data', data)
    // res.json({
    //     url: '/responsys/signup_s2s',
    //     data
    // })
    res.json(data)
})

app.post('/rest/api/v1.3/folders/Banking/suppData/Activity_:activityName/members', (req, res) => {
    const dynamicActivity = req.params.activityName;
    const data = req.body
    // res.json({
    //     url: '/responsys/trigger_s2s',
    //     data
    // })
    res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
