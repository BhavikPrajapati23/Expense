const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')
const AccountController = require('../controller/AccountController')
const TransactionController = require('../controller/TransactionController')
const bodyParser = require('body-parser')
const Auth = require('../middleware/Auth')
const urlencodedParser = bodyParser.urlencoded({ extended: true })

router
    .get('/',UserController.index)
    .get('/home',Auth,AccountController.getAccount)
    .get('/logout',Auth,UserController.UserLogout)
    .post('/signup',urlencodedParser,UserController.AddUser)
    .post('/login',urlencodedParser,UserController.AuthCheck)

    .get('/addaccount',Auth,AccountController.addAccount)
    .post('/addAcount',Auth,urlencodedParser,AccountController.storeAccount)
    .get('/edit/:id',Auth,AccountController.edit)
    .post('/updateAccount/:id',Auth,urlencodedParser,AccountController.updateAccount)
    .get('/delete/:id',Auth,AccountController.deleteAccount)

    .get('/viewtransaction/:id',Auth,TransactionController.getTransaction)
    .get('/transaction',Auth,TransactionController.getAllTransaction)
    .get('/addtransaction/:id',Auth,TransactionController.addTransaction)
    .post('/addTransaction/:id',Auth,urlencodedParser,TransactionController.storeTransaction)
    .get('/transactionedit/:id',Auth,TransactionController.editTransaction)
    .get('/transactiondelete/:id',Auth,TransactionController.deleteTransaction)
    .post('/updateTransaction/:id',Auth,urlencodedParser,TransactionController.updateTransaction)

module.exports = router