
export interface Person {
  id: string;
  name: string;
  visionTitle: string;
  visionDescription: string;
  videoUrl: string;
  color: string; // Kept for fallback/accents, but we'll override with gold/wood styles
}

export const PEOPLE: Person[] = [
  {
    id: '1',
    name: 'MS VIJAYA MADHAVI SHARMA & MR RAM GOPAL KRISHNA',
    visionTitle: 'Empowering Education & Sustainable Future',
    visionDescription: 'To create a world where knowledge flows freely and build a legacy of environmental stewardship.',
    videoUrl: `${import.meta.env.BASE_URL}videos/video1.mp4`, // Place your video in /public/videos/video1.mp4
    color: 'bg-rose-500'
  },
  {
    id: '2',
    name: 'MR KADIRI KALYAN & MR VENKATESHWARLU',
    visionTitle: 'Innovation and Growth',
    visionDescription: 'Pioneering new frontiers in technology and fostering a community of continuous development.',
    videoUrl: `${import.meta.env.BASE_URL}videos/video2.mp4`, // Place your video in /public/videos/video2.mp4
    color: 'bg-indigo-500'
  }
];
