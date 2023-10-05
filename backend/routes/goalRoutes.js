const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updGoal, rmGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updGoal).delete(protect, rmGoal)


module.exports = router