import multer from 'multer';
import path from 'path';
import fs from 'fs';

const tempDir = path.join(process.cwd(), 'public', 'temp');

// Ensure the temp folder exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Optional: use Date.now() to avoid duplicates
  }
});

const upload = multer({ storage });
export default upload;
