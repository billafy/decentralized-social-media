import User from '../../../models/User';
import mongoose from 'mongoose';
import {getSession} from 'next-auth/react'

const handler = async (req, res) => {
    const session = await getSession({req});
    const {username, aboutMe} = req.body;
    if(!session)
        return res.status(401).json({success: false});
    if(username?.length < 6)
        return res.status(400).json({success: false, message: 'Username should be of atleast 6 characters'});
    await mongoose.connect(process.env.MONGO_URI);
    if(username !== session.user.username && (await User.findOne({username})))
        return res.status(400).json({success: false, message: 'Username already exists'});
    let user = await User.findById(session.user._id);
    user.username = username;
    user.aboutMe = aboutMe;
    user = await user.save();
    res.status(201).json({success: true, user});
};

export default handler;
