import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
	mediaUrl: { type: String, required: true },
	description: { type: String },
	likes: { type: Number, default: 0 },
	comments: { type: [ { type: Schema.Types.ObjectId, ref: 'comment' } ], default: [] },
	user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
}, {timestamps: true});

const Post = models.Post || model('Post', postSchema);

export default Post;
