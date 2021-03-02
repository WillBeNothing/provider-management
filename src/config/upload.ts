import {join} from 'path'
import multer from 'multer'


export default {
    storage: multer.diskStorage({
        destination:  join(__dirname, '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`
            cb(null, filename)
        }
    })
}
