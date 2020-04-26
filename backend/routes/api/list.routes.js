const {Router} = require('express')
const router = Router()
const verify = require('./verifyToken')
const jwt = require('jsonwebtoken')
const config = require('config')


// List Model
const List = require('../../models/list')


// @route   GET api/lists/:userId
// @desc    Get All lists
// @access  Private
router.get('/:userId', verify, async (req, res) => {
    await List.find({userId: req.params.userId}, (err, items) => {
        if(err) return res.status(404).send(err)
        return res.json(items)
    })
    .limit(3)
})

// @route   GET api/lists/counts/:userId
// @desc    Get counts
// @access  Private
router.get('/counts/:userId', verify, async (req, res) => {
    await List.countDocuments({userId: req.params.userId}, (err, count) => {
        if(err) return res.status(404).send(err)
        return res.json(count)
   });
})

// @route   GET api/lists/page/
// @desc    Get page
// @access  Private
router.get('/page/:pageNum', verify, async (req, res) => {
    const pageNum = req.params.pageNum
    const token = req.header('auth-token')
    const decodeToken = jwt.decode(token)
    await List.find({userId: decodeToken._id}, (err, items) => {
        if(err) return res.status(404).send(err)
        return res.json(items)
    }).skip((3 * pageNum) - 3).limit(3)
})


// @route   POST api/lists/add
// @desc    Create An lists
// @access  Private
router.post('/add', verify, async (req, res) => {
    const newItem = new List({
        userId: req.body.userId,
        title: req.body.title,
        login: req.body.login,
        password: req.body.password,
        link: req.body.link,
        image: req.body.image
    })
    try {
        await newItem.save().then(items => res.json(items))
    } catch(err) {
        res.status(400).send(err)
    }
})


// @route   POST api/lists/edit:id
// @desc    Edit A Item from Id
// @access  Private
router.post('/edit/', verify, async (req, res) => {
    await List.findByIdAndUpdate(req.body.id, { [req.body.key]: req.body.value }, {useFindAndModify: false}, (err, items) => {
        if(err) return res.status(404).send(err)
        return res.json(items)
    })
})


// @route   DELETE api/lists/delete:id
// @desc    Delete A Item
// @access  Private
router.delete('/delete/:itemId',  verify, async (req, res) => {
    await List.findById(req.params.itemId, (err, item) => {
        if(err) return res.status(404).send(err)
        return item.remove().then(() => res.json(item))
    })
})


// @route   GET api/lists/find
// @desc    Find A Item by title
// @access  Private
router.get('/find/:title',  verify, async (req, res) => {
    const titleItem = req.params.title
    await List.find({title: { $regex: new RegExp(titleItem, "i") }}, (err, items) => {
        if(err) return res.status(404).send(err)
        return res.json(items)
    })
})


module.exports = router