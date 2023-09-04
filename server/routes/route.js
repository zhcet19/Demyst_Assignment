const express = require('express');
const {startApplication}=require('../controllers/startApplication.js');
const {requestBalanceSheet}=require('../controllers/requestBalanceSheet.js');
const {submitApplication}=require('../controllers/submitApplication.js');


const router = express.Router();

router.post("/start-application", startApplication);
router.post("/submit-application",submitApplication);
router.post("/request-balancesheet", requestBalanceSheet);
module.exports = router;