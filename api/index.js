var router = require('express').Router()

// Add USERS Routes
router.use(require('./wiki'))

module.exports = router
