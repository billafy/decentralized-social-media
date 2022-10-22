import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
	text: { type: String, required: true },
	likes: { type: Number, default: 0 },
	replies: { type: [ { type: Schema.Types.ObjectId, ref: 'comment' } ], default: [] },
});

const Comment = models.Comment || model('Comment', commentSchema);

export default Comment;
