// controllers/userController.js
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
    user.theme = req.body.theme || user.theme;

    if (req.body.email && user.email !== req.body.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        res.status(400);
        throw new Error("Email already in use");
      }
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      theme: updatedUser.theme,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { currentPassword, newPassword } = req.body;

  if (!user || !(await user.matchPassword(currentPassword))) {
    res.status(401);
    throw new Error("Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: "Password updated successfully" });
});

const updateUserSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.settings = {
      sidebarOpen: req.body.sidebarOpen ?? user.settings.sidebarOpen,
      compactMode: req.body.compactMode ?? user.settings.compactMode,
    };

    const updatedUser = await user.save();
    res.json(updatedUser.settings);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const uploadUserAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload a file");
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "noteflow/avatars",
    width: 250,
    height: 250,
    crop: "fill",
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url },
    { new: true },
  ).select("-password");

  res.json(user);
});

const deleteUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Delete associated data
  await Page.deleteMany({ user: user._id });
  await Block.deleteMany({ user: user._id });

  await user.deleteOne();

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "User account deleted" });
});

export {
  updateUserProfile,
  updateUserPassword,
  updateUserSettings,
  uploadUserAvatar,
  deleteUserAccount,
};
