export interface SoundEffect {
  id: string;
  label: string;
  url: string;
}

// You can add more sounds here. 
// Place your recorded audio files (e.g., .m4a, .mp3, .wav) in the /public/audios/ folder.
export const SOUNDS: SoundEffect[] = [
  { id: '1', label: 'Recording 1', url: `${import.meta.env.BASE_URL}audios/recording1.m4a` },
  { id: '2', label: 'Recording 2', url: `${import.meta.env.BASE_URL}audios/recording2.m4a` },
  { id: '3', label: 'Recording 3', url: `${import.meta.env.BASE_URL}audios/recording3.m4a` },
  { id: '4', label: 'Recording 4', url: `${import.meta.env.BASE_URL}audios/recording4.m4a` },
  { id: '5', label: 'Recording 5', url: `${import.meta.env.BASE_URL}audios/recording5.m4a` },
  { id: '6', label: 'Recording 6', url: `${import.meta.env.BASE_URL}audios/recording6.m4a` },
  { id: '7', label: 'Recording 7', url: `${import.meta.env.BASE_URL}audios/recording7.m4a` },
  { id: '8', label: 'Recording 8', url: `${import.meta.env.BASE_URL}audios/recording8.m4a` },
  { id: '9', label: 'Recording 9', url: `${import.meta.env.BASE_URL}audios/recording9.m4a` },
  { id: '10', label: 'Recording 10', url: `${import.meta.env.BASE_URL}audios/recording10.m4a` }
];
