export const Users = [
  {
    Id:1,
    ImageUrl: "https://img.etimg.com/thumb/msid-67189891,width-480,height-360,imgsize-591804,resizemode-4/the-logan-paul-mistake.jpg",
    Imgsrc: "/images/avatar/loganpaul.jpeg",
    username:"LoganPaul",
    Bio: "Logan Alexander Paul is an American YouTuber, social media personality, and professional wrestler. He is currently signed to WWE, performing on their Raw brand",
    Followers: [2,3,4,],
    Following: [2,3],
    Likes: kFormatter(3800),
    Balance: 0.257,
  },
  {
    Id:2,
    ImageUrl: "https://img.etimg.com/thumb/msid-67189891,width-480,height-360,imgsize-591804,resizemode-4/the-logan-paul-mistake.jpg",
    username:"LoganPaul",
    Bio: "Logan Alexander Paul is an American YouTuber, social media personality, and professional wrestler. He is currently signed to WWE, performing on their Raw brand",
    Followers: [1,3,4,],
    Following: [1,3],


  },
  {
    Id:3,
    ImageUrl: "https://img.etimg.com/thumb/msid-67189891,width-480,height-360,imgsize-591804,resizemode-4/the-logan-paul-mistake.jpg",
    username:"LoganPaul",
    Bio: "Logan Alexander Paul is an American YouTuber, social media personality, and professional wrestler. He is currently signed to WWE, performing on their Raw brand",
    Followers: [1,2,4,],
    Following: [1,2],


  },
  {
    Id:4,
    ImageUrl: "https://img.etimg.com/thumb/msid-67189891,width-480,height-360,imgsize-591804,resizemode-4/the-logan-paul-mistake.jpg",
    username:"LoganPaul",
    Bio: "Logan Alexander Paul is an American YouTuber, social media personality, and professional wrestler. He is currently signed to WWE, performing on their Raw brand",
    Followers: [1,2,3,],
    Following: [1,2],


  },
]

export const NFTs = [
  {
    Id: 1,
    Badge: "Total Sale: $82,571",
    ImageUrl: "/images/nft/demon.png",
    Edition: 371,
    Stock: 128,
    Title: "Captain Mars",
    Price: "$10M",

    Avatar: "/images/avatar/loganpaul.jpeg",
    Author: "LoganPaul",
    Likes: 652,
    views: kFormatter(18000),
    Description: `Elon Musks great grandkid Captain Mars , protector of the 4th Planet - collection from youtuber Logan paul"`,
  },
  {
    Id: 2,
    Badge: "Total Sale: $82,571",
    ImageUrl: "/images/nft/bking.png",
    Edition: 371,
    Stock: 128,
    Title: "Skeleton King",
    Price: "$10M",
    Avatar: "/images/avatar/loganpaul.jpeg",
    Author: "LoganPaul",
    Likes: kFormatter(1200),
    views: kFormatter(18000),
    Description: `King Bitcoin is the oldest and wisest of the cryptoskeletons.When
    all hope is lost the others look to him for guidance into the lands
    of unlimited profit."`,
  },
  {
    Id: 3,
    Badge: "Total Sale: $82,571",
    ImageUrl: "/images/nft/crystalrobo.png",
    Edition: 31,
    Stock: 128,
    Title: "Crystal Robo",
    Price: "$15M",
    Avatar: "/images/avatar/loganpaul.jpeg",
    Author: "LoganPaul",
    Likes: kFormatter(18300),
    views: kFormatter(18000),
    Description: `Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
    Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum"`,
  },
  {
    Id: 4,
    Badge: "Total Sale: $82,571",
    ImageUrl: "/images/nft/rightclicksave.png",
    Edition: 77,
    Stock: 128,
    Title: "Right Click Save",
    Price: "$10M",
    Avatar: "/images/avatar/loganpaul.jpeg",
    Author: "LoganPaul",
    Likes: kFormatter(22099),
    views: kFormatter(18000),
    Description: `Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
    Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum"`,
  },
  {
    Id: 5,
    Badge: "Total Sale: $82,571",
    ImageUrl: "/images/nft/cyberjunk.jpeg",
    Edition: 71,
    Stock: 128,
    Title: "Cyberjunk",
    Price: "$15M",
    Avatar: "/images/avatar/loganpaul.jpeg",
    Author: "LoganPaul",
    Likes: 452,
    views: kFormatter(18000),
    Description: `Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
    Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum"`,
  },
  {
    Id: 6,
    Badge: "Total Sale: $82,571",
    ImageUrl: "/images/nft/lady.jpeg",
    Edition: 10,
    Stock: 128,
    Title: "Lady Moon",
    Price: "$10M",
    Avatar: "/images/avatar/loganpaul.jpeg",
    Author: "LoganPaul",
    Likes: 652,
    views: kFormatter(18000),
    Description: `Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
    Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum"`,
  },
];

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}