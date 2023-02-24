const User = require("../model/user");
const Account = require("../model/accounts")
const Transaction = require('../model/transaction')

const getAccount = async (req,res) => {
    try {
        Account.find({userId: req.session.user._id},(err,result) => {
            if(err){
                res.send('Wrong..')
            }
            return res.render('index',{ses: req.session.user, data: result, message: req.flash('message')});
        })
    } catch (error) {
        res.redirect('/')
    }
}

const addAccount = async (req,res) => {
    return res.render('account/addAccount',{ses: req.session.user, message: req.flash('message')})
}

const storeAccount = async (req,res) => {
    try {
        const AccountStore = new Account({
            name: req.body.accountname,
            userId: req.session.user._id
        })
        
        await AccountStore.save((err,result) => {
            if (err){
                req.flash('message','Something Went Wrong.')
            }
            req.flash('message','Account Added Successfully...')
            return res.redirect('/home')
        })
    } catch (error) {
        res.redirect('/')
    }
}

const edit = async (req,res) => {
    // console.log(req.params.id)
    try {
        Account.findOne({_id: req.params.id},(err,result) => {
            if(err){
                req.flash('message','Something Went Wrong.')
            }
            return res.render('account/editAccount',{ses: req.session.user, data: result});
        }) 
    } catch (error) {
        res.redirect('/')
    }
}

const updateAccount = async (req,res) => {
    try {
        Account.findOneAndUpdate({_id: req.params.id},{
            $set: {
                name: req.body.accountname
            }
        },(err,result) => {
            if(err){
                req.flash('message','Something Went Wrong.')
            }
            req.flash('message','Account Updated Successfully...')
            return res.redirect('/home');
        }) 
    } catch (error) {
        res.redirect('/')
    }
}

const deleteAccount = async (req,res) => {
    try {
        //Transaction.deleteMany({accountId: req.params.id})
        console.log(req.params.id)
        Account.deleteOne({_id: req.params.id},(err,result) => {
            if(err){
                req.flash('message','Something Went Wrong.')
            }
            req.flash('message','Account Deleted Successfully...')
            return res.redirect('/home')
        })
    } catch (error) {
        res.redirect('/')
    }
}

module.exports = { getAccount, addAccount, storeAccount, edit, updateAccount, deleteAccount };