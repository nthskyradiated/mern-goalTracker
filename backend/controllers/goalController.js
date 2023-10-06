const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')
const { use } = require('../routes/goalRoutes')
//@description GET goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

//@description Set goal
//@route POST /api/goals
//@access private
const setGoal =  asyncHandler(async (req, res) => {
        if (!req.body.text) {
            res.status(400)
            throw new Error('please add text')
        }

        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
        res.status(201).json(goal)
    
})

//@description Update goal
//@route PUT /api/goals/:id
//@access private
const updGoal =  asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error ('goal not found')
    }
    // const user = await User.findById(req.user.id) // this one as well. reference Brad's 4th vid

    //check for user
    if (!req.user) {
      res.status(401)  
        throw new Error ('user not found')
    }

        //logged in user should match the goal-user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)  
        throw new Error ('unauthorized Request')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(goal, req.body, { new: true})

    res.status(200).json(`Updated goal ${updatedGoal.id}`)
})

//@description Delete goal
//@route DELETE /api/goals/:id
//@access private
const rmGoal =  asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error ('goal not found')
    }

    // const user = await User.findById(req.user.id) // this too

    //check for user
    if (!req.user) {
      res.status(401)  
        throw new Error ('user not found')
    }

        //logged in user should match the goal-user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)  
        throw new Error ('unauthorized Request')
    }
    await goal.deleteOne()
    res.status(200).json({'message' : `Deleted Goal ${goal.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updGoal,
    rmGoal
}