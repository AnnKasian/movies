import multer from "multer";
import { FileSize } from "../enums/enums.js";

const handleUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: FileSize,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "text/plain" || file.originalname.endsWith(".txt")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export { handleUpload };
