/**
 * Birthday Website Configuration
 * Customize the details below to personalize the birthday website!
 */

const BIRTHDAY_CONFIG = {
  // Birthday Person Details
  recipientName: "Birthday Star",
  nickname: "The Best",
  birthdayDate: "2026-08-14",
  age: null, // Set a number (e.g. 24) or keep null

  // Hero Section
  heroTitle: "Happy Birthday! 🎉",
  heroSubtitle: "Wishing you a wonderful day filled with happiness, laughter, and memorable moments.",
  
  // Surprise Gift Message (revealed when gift box is clicked)
  giftBoxMessage: {
    title: "A Special Birthday Message 🎁",
    body: "Wishing you a fantastic birthday and an even better year ahead! May all your goals and dreams turn into reality. Thank you for bringing so much energy and joy to everyone around you.",
    signature: "With warmest wishes & love ❤️"
  },

  // Interactive Cake
  cakeMessage: {
    instruction: "Make a wish and click the candle to blow it out!",
    blownMessage: "✨ Wish made! May all your wishes come true! ✨"
  },

  // Memory Cards / Highlights
  memories: [
    {
      title: "Epic Adventures",
      caption: "From road trips to scenic hikes and exploring new cities.",
      tag: "Adventures",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "Unforgettable Moments",
      caption: "Late night laughs, great food, and spontaneous hangouts.",
      tag: "Memories",
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
      title: "Big Milestones",
      caption: "Celebrating achievements, hard work, and exciting beginnings.",
      tag: "Milestones",
      gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
    },
    {
      title: "Good Vibes",
      caption: "Always bringing positive energy and endless encouragement.",
      tag: "Friends",
      gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
    }
  ],

  // Initial Sample Wishes on the Interactive Board
  initialWishes: [
    {
      sender: "Alex",
      message: "Happy Birthday! Hope you have an incredible celebration and eat lots of cake! 🎂",
      color: "card-peach"
    },
    {
      sender: "Jamie",
      message: "Cheers to another amazing year around the sun! Keep shining bright! ✨",
      color: "card-blue"
    },
    {
      sender: "Taylor",
      message: "Wishing you health, happiness, and huge success in everything you do! 🎉",
      color: "card-mint"
    }
  ]
};
