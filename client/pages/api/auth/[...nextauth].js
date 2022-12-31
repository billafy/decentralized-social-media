import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import Moralis from 'moralis';
import User from '../../../models/User';
import mongoose from 'mongoose';

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'MoralisAuth',
			credentials: {
				message: {
					label: 'Message',
					type: 'text',
					placeholder: '0x0',
				},
				signature: {
					label: 'Signature',
					type: 'text',
					placeholder: '0x0',
				},
			},
			async authorize(credentials) {
				try {
					const { message, signature } = credentials;
					await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
					const { address, profileId } = (await Moralis.Auth.verify({ message, signature, network: 'evm' })).raw;
					const user = { address, profileId, signature };
					return user;
				} catch (err) {
					console.error(err);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }) {
			if (!session) return;
			const { address, profileId } = token.user;
			await mongoose.connect(process.env.MONGO_URI);
			let user = await User.findOne({ profileId });
			if (!user) {
				user = new User({ address, profileId });
				user = await user.save();
			}
			user = await User.findById(user._id, { updatedAt: 0, __v: 0, profileId: 0 })
				.populate('followers', [ 'username', 'address' ])
				.populate('following', [ 'username', 'address' ])
				.exec();
			session.user = { ...user._doc, signature: token.user.signature };
			return session;
		},
	},
});
