export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Summit 2026",
    image: "/images/event1.png",
    slug: "react-summit-2026",
    location: "San Francisco, CA",
    date: "June 15-17, 2026",
    time: "9:00 AM - 6:00 PM PST",
  },
  {
    title: "JavaScript Hackathon",
    image: "/images/event2.png",
    slug: "js-hackathon-2026",
    location: "New York, NY",
    date: "July 8-9, 2026",
    time: "10:00 AM - 8:00 PM EST",
  },
  {
    title: "Cloud Native DevOps",
    image: "/images/event3.png",
    slug: "cloud-native-devops",
    location: "Austin, TX",
    date: "August 22-24, 2026",
    time: "8:30 AM - 5:30 PM CST",
  },
  {
    title: "AI & Machine Learning Summit",
    image: "/images/event4.png",
    slug: "ai-ml-summit-2026",
    location: "Seattle, WA",
    date: "September 10-12, 2026",
    time: "9:00 AM - 6:00 PM PST",
  },
  {
    title: "Web3 Developer Conference",
    image: "/images/event5.png",
    slug: "web3-conf-2026",
    location: "Miami, FL",
    date: "October 5-7, 2026",
    time: "10:00 AM - 7:00 PM EST",
  },
  {
    title: "Mobile Dev Meetup",
    image: "/images/event6.png",
    slug: "mobile-dev-meetup",
    location: "Los Angeles, CA",
    date: "November 14-16, 2026",
    time: "9:30 AM - 5:00 PM PST",
  },
  {
    title: "Python Developer Conference",
    image: "/images/event-full.png",
    slug: "python-conf-2026",
    location: "Boston, MA",
    date: "December 1-3, 2026",
    time: "10:00 AM - 6:00 PM EST",
  },
];
