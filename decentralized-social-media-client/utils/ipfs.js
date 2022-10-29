import { create } from 'ipfs-http-client';

const auth = 'Basic ' + Buffer.from('2Gl2TQAEeTC0xy2WrfIsREEbIn1 : 2f590d86523457021c3971028d5c6bf7').toString('base64')

console.log(auth);

export const client = create({
	host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
      authorization: auth
    }
});
