import express, { Request, Response } from 'express';
import { User } from '../models/userModel';

const locationRoute = express.Router();


locationRoute.patch("/:userId", async (req:Request, res:Response) => {
  try {
    const { userId } = req.params;
    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
      return res.status(400).json({ message: "Missing location data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.location.latitude = latitude;
    user.location.longitude = longitude;
    user.location.updatedAt = new Date();

    await user.save();

    res.json({
      message: "Location updated",
      location: user.location,
    });
  } catch (err) {
    res.status(500).json({ message: "Location update error", error: err });
  }
});

export default locationRoute