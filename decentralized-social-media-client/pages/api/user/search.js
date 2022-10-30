import User from "../../../models/User";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

const follow = async (req, res) => {
  const session = await getSession({ req });
  const { subString } = req.body;
  if (!session) return res.status(401).json({ success: false });
  await mongoose.connect(process.env.MONGO_URI);
  let user = await User.findById(session.user._id);
  User.find(
    { authors: { $regex: subString, $options: "i" } },
    function (err, user) {
      if (user) {
        return res.status(200).json({ success: true, user });
      } else if (err) {
        return res
          .status(404)
          .json({
            success: false,
            message: "User with id `{$user}` not found.",
          });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Something went wrong" });
      }
    }
  );
};

export default follow;
