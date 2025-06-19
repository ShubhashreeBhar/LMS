import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";
import fs from "fs";

const router = express.Router();

router.route("/upload-video").post(upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
  
      const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        fs.unlink(req.file.path, () => {});
        return res.status(400).json({ success: false, message: "Unsupported file type" });
      }
  
      const result = await uploadMedia(req.file.path); // result contains secure_url & public_id
  
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting local file:", err);
      });
  
      // ✅ Return videoUrl and publicId correctly
      res.status(200).json({
        success: true,
        message: "File uploaded successfully.",
        data: {
          videoUrl: result.secure_url,
          publicId: result.public_id,
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ success: false, message: "Error uploading file", error: error.message });
    }
  });
  
export default router;