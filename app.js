const express = require('express')
const path = require('path')
const userroute = require('./routes/userRoutes')
const DatabaseConnect = require('./config/db')
const session = require('express-session')
const flash = require('connect-flash');

const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, "public")));



app.set('trust proxy', 1) // trust first proxy
// app.use(session({ secret: "thisismysecrctekeyfhrgfgrfrty84fwir767" }));
app.use(session({
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
  resave: false,
  saveUninitialized: true,
}))

app.use(flash());

app.use('/',userroute)

DatabaseConnect

app.listen(port, () => console.log(`Example app listening on port ${port}!`))