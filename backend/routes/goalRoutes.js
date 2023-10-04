const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updGoal, rmGoal} = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updGoal).delete(rmGoal)


module.exports = router