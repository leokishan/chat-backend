const Express = require('express')
const router = Express.Router()
const { listCustomer, addCustomer, addCard, listCard, initPayment, provideRefund } = require('../controllers/stripeController')

router.get('/customer/list', listCustomer)
router.post('/customer/add', addCustomer)
router.get('/card/list/:id', listCard)
router.post('/card/add', addCard)
router.post('/payment/init', initPayment)
router.post('/payment/refund', provideRefund)

module.exports = router