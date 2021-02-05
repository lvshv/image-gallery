import cloudinary from '../config/cloudinary.js';
import User from '../models/UserModel.js';

export const uploadFiles = async (req, res) => {
  const file = req.file;

  cloudinary.v2.uploader
    .upload_stream({ resource_type: 'auto' }, async (error, result) => {
      if (error || !result) {
        return res.status(500).json({
          status: 'error',
          message: error || 'upload error',
        });
      }
      const user = await User.findById(req.user._id);
      user.images.push(result.url);

      user.save();
      res.status(201).json({
        images: user.images,
        url: result.url,
        size: Math.round(result.bytes / 1024),
        height: result.height,
        width: result.width,
      });
    })
    .end(file.buffer);
};
