import User from "../../../models/User";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

const unfollow = async (req, res) => {
  const session = await getSession({ req });
  const { followingID } = req.body;
  if (!session) return res.status(401).json({ success: false });
  await mongoose.connect(process.env.MONGO_URI);
  let user = await User.findById(session.user._id);
  let foll = await User.findById(followingID);
  if (!foll) {
    return res
      .status(400)
      .json({ success: false, message: "User does not exist!" });
  } else if (foll === session.user.username)
    return res
      .status(400)
      .json({ success: false, message: "Oops! Something went wrong." });
  //.some((id) => id == followerID)
  else {
    user.following.filter((id) => id !== followerID);
    foll.followers.filter((id) => id !== session.user._id);
    return res
      .status(201)
      .json({ success: true, message: `User {$followerID} removed.` });
  }
};

export default unfollow;
