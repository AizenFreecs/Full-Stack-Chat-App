const dummyChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Aizen Freecs",
    _id: "1",
    groupChat: false,
    members: [1, 2, 3, 4],
  },
  {
    avatar: ["https://randomuser.me/api/portraits/men/75.jpg"],
    name: "John Doe",
    _id: "2",
    groupChat: false,
    members: [5, 6],
  },
  {
    avatar: ["https://randomuser.me/api/portraits/women/82.jpg"],
    name: "Friendship Group",
    _id: "3",
    groupChat: true,
    members: [7, 8, 9, 10, 11],
  },
  {
    avatar: ["https://randomuser.me/api/portraits/men/92.jpg"],
    name: "Michael Smith",
    _id: "4",
    groupChat: false,
    members: [12, 13],
  },
  {
    avatar: ["https://randomuser.me/api/portraits/women/93.jpg"],
    name: "Work Colleagues",
    _id: "5",
    groupChat: true,
    members: [14, 15, 16, 17, 18, 19],
  },
];

const dummyUsers = [
  {
    _id: 1,
    name: "Aizen",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    _id: 2,
    name: "Ichigo Kurosaki",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg"
  },
  {
    _id: 3,
    name: "Rukia Kuchiki",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg"
  },
  {
    _id: 4,
    name: "Kisuke Urahara",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg"
  },
  {
    _id: 5,
    name: "Yoruichi Shihoin",
    avatar: "https://randomuser.me/api/portraits/women/89.jpg"
  },
  {
    _id: 6,
    name: "Harry Potter",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    _id: 7,
    name: "Hermione Granger",
    avatar: "https://randomuser.me/api/portraits/women/85.jpg"
  },
  {
    _id: 8,
    name: "Ron Weasley",
    avatar: "https://randomuser.me/api/portraits/men/72.jpg"
  },
  {
    _id: 9,
    name: "Albus Dumbledore",
    avatar: "https://randomuser.me/api/portraits/men/93.jpg"
  },
  {
    _id: 10,
    name: "Severus Snape",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg"
  }

];

const dummyNotifications = [
  {
    _id: 1,
    sender: {
      name: "Luke Skywalker",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg"
    }
  },
  {
    _id: 2,
    sender: {
      name: "Frodo Baggins",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg"
    }
  },
  {
    _id: 3,
    sender: {
      name: "Hermione Granger",
      avatar: "https://randomuser.me/api/portraits/women/85.jpg"
    }
  },
  {
    _id: 4,
    sender: {
      name: "Katniss Everdeen",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  },
  {
    _id: 5,
    sender: {
      name: "Arya Stark",
      avatar: "https://randomuser.me/api/portraits/women/61.jpg"
    }
  }
];

export {dummyChats, dummyUsers, dummyNotifications}
