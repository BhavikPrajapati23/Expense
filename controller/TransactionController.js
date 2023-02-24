const User = require("../model/user");
const Account = require("../model/accounts")
const Transaction = require('../model/transaction')

const addTransaction = async (req,res) => {
    try {
        Account.find({_id: req.params.id}, (err,result) => {
            if(err){
                res.send('Account Not Found...')
            }
            res.render('transaction/AddTransaction',{ses: req.session.user, account: result})
        })
    } catch (error) {
        res.redirect('/')
    }
}

const storeTransaction = async (req,res) => {
    try {
        const TransactionStore = new Transaction ({
            accountname: req.body.accountname,
            category: req.body.category,
            amount: req.body.amount,
            transaction: req.body.transaction,
            userId: req.session.user._id,
            accountId: req.params.id
        })

        await TransactionStore.save((err,result) => {
            if (err){
                res.send('Account Not Store.')
            }
            return res.redirect('/home')
        })
    } catch (error) {
        res.redirect('/')
    }
}

const getTransaction = async (req,res) => {
    try {
        Transaction.find({accountId: req.params.id}, (err,result) => {
            if (err){
                res.send('Transaction not Find for this account...')
            }
            return res.render('transaction/Transaction.ejs',{ses: req.session.user, data: result})
        }).sort({createdAt: -1})
    } catch (error) {
        res.redirect('/')
    }
}

const getAllTransaction = async (req,res) => {
    try {
        Transaction.find({userId: req.session.user._id}, (err,result) => {
            if (err){
                res.send('transaction not get..')
            }
            return res.render('transaction/AllTransaction',{ses: req.session.user, data: result})
        }).sort({createdAt: -1})
    } catch (error) {
        res.redirect('/')
    }
}

const editTransaction = async (req,res) => {
    try {
        Transaction.findOne({_id: req.params.id},(err,result) => {
            if(err){
                res.send('Wrong..')
            }
            return res.render('transaction/EditTransaction',{ses: req.session.user, data: result});
        }) 
    } catch (error) {
        res.redirect('/')
    }
}

const updateTransaction = async (req,res) => {
    try {
        Transaction.findOneAndUpdate({_id: req.params.id},{
            $set: {
                category: req.body.category,
                amount: req.body.amount,
                transaction: req.body.transaction
            }
        },(err,result) => {
            if(err){
                res.send('Wrong..')
            }
            return res.redirect('/home');
        }) 
    } catch (error) {
        res.redirect('/')
    }
}

const deleteTransaction = async (req,res) => {
    try {
        Transaction.deleteOne({_id: req.params.id},(err,result) => {
            if(err){
                res.send('Wrong..')
            }
            return res.redirect('/home')
        })
    } catch (error) {
        res.redirect('/')
    }
}

module.exports = { addTransaction, storeTransaction, getTransaction, getAllTransaction, editTransaction, deleteTransaction, updateTransaction };