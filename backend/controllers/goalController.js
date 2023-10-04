const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
//@description GET goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
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
            text: req.body.text
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
    await goal.deleteOne()
    res.status(200).json({'message' : `Deleted Goal ${goal.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updGoal,
    rmGoal
}