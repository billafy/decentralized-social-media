import { Schema, model, models } from 'mongoose';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

const userSchema = new Schema({
	profileId: { type: String, required: true },
	address: { type: String, required: true },
	username: {
		type: String,
		default: () => uniqueNamesGenerator({
			dictionaries: [ adjectives, animals ],
			style: 'capital',
		}),
	},
	aboutMe: {
		type: String,
		default: 'Hello, Welcome to My Profile!',
	},
	followers: {
		type: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
		default: [],
	},
	following: {
		type: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
		default: [],
	},
});

const User = models.User || model('User', userSchema);

export default User;
