const { stripeKey } = require('../utilities/constants')
const stripe = require('stripe')(stripeKey)

const listCustomer = (req, res) => {
    stripe.customers.list(( err, data ) => {
        if(err){
            stripeErr(res, err)
        }
        else{
            successObj(res, 1, "success", data)
        }
    })
}

const addCustomer = (req, res) => {
    let userObject = {
        email : req.body.email,
        name : req.body.name
    }
    stripe.customers.create( userObject , ( err, data ) => {
        if(err){
            stripeErr(res, err)
        }
        else{
            // save customer id for operations
            successObj(res, 1, "success", data)
        }
    })
}

const addCard = (req, res) => {
    let tokenObject = {
        card : {
            number: req.body.number,
            exp_month: req.body.month,
            exp_year: req.body.year,
            cvc: req.body.cvc,
            currency : 'usd',
            name : req.body.name
        }
    }
    stripe.tokens.create( tokenObject , ( err, data ) => {
        if(err){
            stripeErr(res, err)
        }
        else{
            stripe.customers.createSource( req.body.customer, { source : data.id }, ( cardErr, cardDetails ) => {
             if(cardErr){
                stripeErr(res, cardErr)
            }
            else{
                successObj(res, 1, "success", data)
            }
        } )
        }
    })
}

const listCard = (req, res) => {
    stripe.customers.listSources( req.params.id, { object : 'card' }, ( err, data ) => {
        if(err){
            stripeErr(res, err)
        }
        else{
            successObj(res, 1, "success", data)
        }
    } )
}

const initPayment = ( req, res ) => {
    let intentObject = {
        amount : req.body.amount,
        currency : 'USD',
        payment_method_types: ['card'],
        customer : req.body.customer,
        payment_method : req.body.cardId,
        off_session : true,
        confirm : true
    }
    stripe.paymentIntents.create( intentObject, ( err, data ) => {
        if(err){
            stripeErr(res, err)
        }
        else{
            // Save charge id from charge ogject for future purpose (refunds)
            successObj(res, 1, "success", data)
        }
    })
}

const provideRefund = (req, res) => {
    // amount of full charge by default. You can specify amount till unfunded amount
    let refundObject = {
        charge : req.body.charge,
        amount : 50
    }
    stripe.refunds.create( refundObject, ( err, data ) => {
        if(err){
            stripeErr(res, err)
        }
        else{
            // Save charge id from charge ogject for future purpose (refunds)
            successObj(res, 1, "success", data)
        }
    } )
}

module.exports = {
    listCustomer,
    addCustomer,
    addCard,
    listCard,
    initPayment,
    provideRefund
}