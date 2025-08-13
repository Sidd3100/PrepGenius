const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define absolute uploads directory
const uploadDir = path.join(__dirname, '../../uploads');

// Ensure the folder exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
