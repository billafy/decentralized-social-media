import { Schema, model, models } from 'mongoose';

const commentSchema: Schema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	text: { type: String, required: true },
	likes: { type: Number, default: 0 },
	replies: { type: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ], default: [] },
}, {timestamps: true});

const Comment = models.Comment || model('Comment', commentSchema);

export default Comment;
