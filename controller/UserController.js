const User = require("../model/user");
const Account = require("../model/accounts")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = "expesnemanage";

const index = async (req, res) => {
  try {
    res.render("user/index",{message: req.flash('message')});
  } catch (error) {
    res.send("Page Not Found.");
  }
};

const AddUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      req.flash('message','User Already Exists')
      return res.redirect('/');
    }

    if (req.body.password.length < 8) {
      req.flash('message','Password must be at least 8 characters long')
      return res.redirect('/');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const token = jwt.sign({ email: req.body.email }, secretkey);

    const adduser = await new User({
      email: req.body.email,
      password: hashedPassword,
      token: token,
    });

    adduser.save((err, result) => {
      if (err) {
        res.send("something went wrong...");
      } else {
        const name = "Personal Account"
        const userId = adduser._id
        const AddAccount = new Account({
            name: name,
            userId: userId
        });
        AddAccount.save((err,result) => {
            if (err){
              req.flash('message','Something Went Wrong...')
              return res.redirect('/');
            }else{
                req.flash('message', 'Register Successfully')
                res.redirect("/");
            }
        })
      }
    });
  } catch (error) {
    req.flash('message','Page Not Found.')
  }
};

const AuthCheck = async (req, res) => {
    const { email, password } = req.body

    try {

        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            req.flash('message','User Not Found.')
            return res.redirect('/')
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            req.flash('message','Invalid Credintials.')
            return res.redirect('/')
        }

        // console.log(existingUser,"existing user")
        req.session.user = existingUser
        req.session.save()
        // console.log(req.session.user,"session");
        req.flash('message','WelCome To Dashboard')
        return res.redirect('/home')

    } catch (error) {
        req.flash('message','Page Not Found.')
        return res.redirect('/')
    }
};

const UserLogout = async (req,res) => {
    try {
        req.session.destroy((err) => {
            if (err){
                console.log(err)
            }
            return res.redirect('/')
        })
    } catch (error) {
      req.flash('message','UnAuthorized User.')
    }
}

module.exports = { index, AddUser, AuthCheck, UserLogout };