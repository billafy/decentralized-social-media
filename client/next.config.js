const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['img.etimg.com', 'ipfs.moralis.io', 'www.google.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
