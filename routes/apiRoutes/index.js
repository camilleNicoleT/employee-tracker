const express = require('express');
const router = express.Router();

//express middleware
router.use(express.urlencoded({extended: false }));
router.use(express.json());

router.use(require('./employeeRoutes'));
router.use(require('./departmentRoutes'));
router.use(require('./roleRoutes'));

module.exports = router;