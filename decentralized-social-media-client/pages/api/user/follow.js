import User from "../../../models/User";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

const follow = async (req, res) => {
  const session = await getSession({ req });
  const { followerID } = req.body;
  if (!session) return res.status(401).json({ success: false });
  await mongoose.connect(process.env.MONGO_URI);
  let user = await User.findById(session.user._id);
  let foll = await User.findById(followerID);
  if (!foll) {
    return res
      .status(400)
      .json({ success: false, message: "User does not exist!" });
  } else if (foll === session.user.username)
    return res
      .status(400)
      .json({ success: false, message: "Cannot Follow Yourself." });
  //.some((id) => id == followerID)
  else {
    user.following.map = (id) => {
      if (id === followerID) {
        return res
          .status(400)
          .json({ success: false, message: "Already Following!" });
      } else {
        user.following.push(foll.profileID);
        foll.followers.push(user.profileID);
        user = user.save();
        return res
          .status(201)
          .json({ success: true, message: `Now Following {$foll_id}` });
      }
    };
  }
};

export default follow;
