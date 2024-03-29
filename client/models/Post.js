import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
	mediaUrl: { type: String, required: true },
	description: { type: String },
	likes: {
		type: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
		default: [],
	},
	isMinted: {type: Boolean, default: false},
	comments: { type: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ], default: [] },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {timestamps: true});

const Post = models.Post || model('Post', postSchema);

export default Post;
