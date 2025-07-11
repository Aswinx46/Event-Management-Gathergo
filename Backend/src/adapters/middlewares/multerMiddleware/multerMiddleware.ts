import multer from 'multer'

const storage = multer.memoryStorage()

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb: multer.FileFilterCallback) => {
       
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname))
        }
    }
})