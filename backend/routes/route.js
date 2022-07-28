
const Express = require("express");
const Razorpay =  require("razorpay")

const paymentControler = require("../Controllers/Payment");

const router = Express.Router();

router.post("/pay", paymentControler.Razorpay);

module.exports = router;