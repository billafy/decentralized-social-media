import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
	mediaUrl: { type: String, required: true },
	description: { type: String },
	likes: { type: Number },
	comments: { type: [ { type: Schema.Types.ObjectId, ref: 'comment' } ], default: [] },
});

const Post = models.Post || model('Post', postSchema);

export default Post;
