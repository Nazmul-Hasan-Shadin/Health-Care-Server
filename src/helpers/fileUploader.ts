import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: "dxhf5qlpi",
  api_key: "724492432523489",
  api_secret: "dEar05WFXC4nOuiajcS39ExprWE",
});
const uploadToCloudinary = async (file: any) => {
    try {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        public_id: file.filename,
      });
      fs.unlinkSync(file.path)
      console.log("✅ Cloudinary Upload Result:", uploadResult);
      return uploadResult;
    } catch (error) {
      console.error("❌ Cloudinary Upload Failed:", error);
      throw error; // ❗ Important: rethrow to let `createAdmin` catch it
    }
  };
  
export const fileUploader = {
  upload,
  uploadToCloudinary,
};
