const {Router} = require('express')
const router = Router()
const multer = require('multer')
const path = require('path')
const verify = require('./verifyToken')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

// @route   GET api/images
// @desc    Get One images
// @access  Private
router.get('/:itemId', async (req, res) => {
    const image = await res.sendFile(path.join(__dirname, `../../upload/${req.params.itemId}.png`))
    if(image) return res 
})


// @route   POST api/images/:id
// @desc    Upload A Photo
// @access  Private
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
    cb(null, req.params.itemId + '.png')
  }
})
const upload = multer({ storage: storage }).single('file')
router.post('/upload/:itemId', verify, async (req, res) => {
    await upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
    })

});


// @route   POST api/images/delete/:id
// @desc    Delete A Photo
// @access  Private
router.delete('/delete/:imageId', verify, async  (req, res) => {
    unlinkAsync(path.join(__dirname, `../../upload/${req.params.imageId}.png`), (err, resFs) => {
        if(err) return res.send(err)
        return res.send("File delete")
    })
})

module.exports = router