import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const fileName = file.originalname.replace(
            path.extname(file.originalname),
            ''
        )
        cb(
            null,
            `${file.fieldname}-${fileName}-${Date.now()}${path.extname(
                file.originalname
            )}`
        )
    },
})

const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|png/
    const extName = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    )
    const mimeType = fileTypes.test(file.mimetype)
    if (extName && mimeType) {
        return cb(null, true)
    } else {
        cb('Images Only')
    }
}

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    },
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router
